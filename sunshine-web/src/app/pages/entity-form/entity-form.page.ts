import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { EntityApiService } from '../../core/entities/entity-api.service';
import { ENTITY_DEFINITIONS, entityByPath } from '../../core/entities/entity.definitions';
import { EntityDefinition, EntityField } from '../../core/entities/entity.models';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-entity-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SidebarComponent, IconComponent],
  templateUrl: './entity-form.page.html',
  styleUrl: './entity-form.page.scss',
})
export class EntityFormPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly entityApiService = inject(EntityApiService);

  readonly definition = signal<EntityDefinition>(ENTITY_DEFINITIONS[0]);
  readonly editingId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly isEditing = computed(() => Boolean(this.editingId()));
  readonly visibleFields = computed(() =>
    this.definition().fields.filter((f) => !(this.isEditing() && f.hideOnEdit)),
  );

  readonly form: FormGroup = this.formBuilder.group({});

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const entityPath = params.get('entity') ?? ENTITY_DEFINITIONS[0].path;
      const id = params.get('id') ?? null;
      const definition = entityByPath.get(entityPath) ?? ENTITY_DEFINITIONS[0];

      this.definition.set(definition);
      this.editingId.set(id);
      this.resetForm();
      this.errorMessage.set(null);

      if (id) {
        this.loadRecord(id);
      }
    });
  }

  save(): void {
    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.editingId();
    const payload = this.buildPayload();
    this.saving.set(true);

    const request = id
      ? this.entityApiService.update(this.definition(), id, payload)
      : this.entityApiService.create(this.definition(), payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/app', this.definition().path]);
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set(`Nao foi possivel salvar ${this.definition().singular.toLowerCase()}.`);
      },
    });
  }

  cancel(): void {
    void this.router.navigate(['/app', this.definition().path]);
  }

  controlName(field: EntityField): string {
    return field.key;
  }

  private loadRecord(id: string): void {
    this.loading.set(true);

    this.entityApiService.getById(this.definition(), id).subscribe({
      next: (record) => {
        this.resetForm(record);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Nao foi possivel carregar o registro.');
        this.loading.set(false);
      },
    });
  }

  private resetForm(record?: Record<string, unknown>): void {
    for (const key of Object.keys(this.form.controls)) {
      this.form.removeControl(key);
    }

    for (const field of this.definition().fields) {
      if (this.editingId() && field.hideOnEdit) {
        continue;
      }

      this.form.addControl(
        field.key,
        this.formBuilder.control(this.initialValue(field, record), this.validators(field)),
      );
    }
  }

  private validators(field: EntityField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.required) validators.push(Validators.required);
    if (field.type === 'email') validators.push(Validators.email);
    if (field.min !== undefined) validators.push(Validators.min(field.min));
    if (field.minLength !== undefined) validators.push(Validators.minLength(field.minLength));

    return validators;
  }

  private initialValue(field: EntityField, record?: Record<string, unknown>): string | number {
    if (!record) {
      return field.key === 'address.country' ? 'BR' : '';
    }

    const value = this.fieldValue(record, field.key);

    if (typeof value === 'number') return value;

    return value === null || value === undefined ? '' : String(value);
  }

  private fieldValue(record: Record<string, unknown>, key: string): unknown {
    return key.split('.').reduce<unknown>((v, part) => {
      if (!v || typeof v !== 'object') return '';
      return (v as Record<string, unknown>)[part];
    }, record);
  }

  private buildPayload(): Record<string, unknown> {
    const payload: Record<string, unknown> = {};

    for (const field of this.visibleFields()) {
      const rawValue = this.form.controls[field.key].value;
      const value = field.type === 'number' && rawValue !== '' ? Number(rawValue) : rawValue;

      this.assignPayloadValue(payload, field.key, value === '' ? null : value);
    }

    return this.removeEmptyObjects(payload);
  }

  private assignPayloadValue(target: Record<string, unknown>, key: string, value: unknown): void {
    const parts = key.split('.');
    let cursor = target;

    for (const part of parts.slice(0, -1)) {
      cursor[part] = cursor[part] && typeof cursor[part] === 'object' ? cursor[part] : {};
      cursor = cursor[part] as Record<string, unknown>;
    }

    cursor[parts.at(-1) ?? key] = value;
  }

  private removeEmptyObjects(value: Record<string, unknown>): Record<string, unknown> {
    for (const [key, child] of Object.entries(value)) {
      if (child && typeof child === 'object' && !Array.isArray(child)) {
        const cleaned = this.removeEmptyObjects(child as Record<string, unknown>);
        const hasValue = Object.values(cleaned).some((item) => item !== null && item !== '');

        if (!hasValue) {
          delete value[key];
        }
      }
    }

    return value;
  }
}
