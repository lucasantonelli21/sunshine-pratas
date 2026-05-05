import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { EntityApiService } from '../../core/entities/entity-api.service';
import { ENTITY_DEFINITIONS, entityByPath } from '../../core/entities/entity.definitions';
import { EntityAction, EntityDefinition, EntityField } from '../../core/entities/entity.models';

@Component({
  selector: 'app-entity-list-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './entity-list.page.html',
  styleUrl: './entity-list.page.scss',
})
export class EntityListPage {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly entityApiService = inject(EntityApiService);
  private readonly authService = inject(AuthService);

  readonly entities = ENTITY_DEFINITIONS;
  readonly definition = signal<EntityDefinition>(ENTITY_DEFINITIONS[0]);
  readonly records = signal<Record<string, unknown>[]>([]);
  readonly editingRecord = signal<Record<string, unknown> | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly visibleFields = computed(() => {
    const editing = Boolean(this.editingRecord());

    return this.definition().fields.filter((field) => !(editing && field.hideOnEdit));
  });

  readonly form: FormGroup = this.formBuilder.group({});

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const entityPath = params.get('entity') ?? ENTITY_DEFINITIONS[0].path;
      const definition = entityByPath.get(entityPath) ?? ENTITY_DEFINITIONS[0];

      this.definition.set(definition);
      this.resetForm();
      this.loadRecords();
    });
  }

  loadRecords(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.entityApiService.list(this.definition()).subscribe({
      next: (records) => {
        this.records.set(records);
        this.loading.set(false);
      },
      error: () => {
        this.records.set([]);
        this.loading.set(false);
        this.errorMessage.set(`Nao foi possivel carregar ${this.definition().title.toLowerCase()}.`);
      },
    });
  }

  startCreate(): void {
    this.editingRecord.set(null);
    this.resetForm();
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }

  startEdit(record: Record<string, unknown>): void {
    this.editingRecord.set(record);
    this.resetForm(record);
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }

  save(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const editing = this.editingRecord();
    const payload = this.buildPayload();
    this.saving.set(true);

    const request = editing
      ? this.entityApiService.update(this.definition(), String(editing['id']), payload)
      : this.entityApiService.create(this.definition(), payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.set(`${this.definition().singular} salvo com sucesso.`);
        this.startCreate();
        this.loadRecords();
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set(`Nao foi possivel salvar ${this.definition().singular.toLowerCase()}.`);
      },
    });
  }

  delete(record: Record<string, unknown>): void {
    const id = String(record['id']);

    if (!id || !confirm(`Confirmar exclusao/desativacao de ${this.definition().singular.toLowerCase()}?`)) {
      return;
    }

    this.entityApiService.delete(this.definition(), id).subscribe({
      next: () => {
        this.successMessage.set(`${this.definition().singular} removido ou desativado.`);
        this.loadRecords();
      },
      error: () => this.errorMessage.set(`Nao foi possivel remover ${this.definition().singular.toLowerCase()}.`),
    });
  }

  runAction(record: Record<string, unknown>, action: EntityAction): void {
    const id = String(record['id']);

    this.entityApiService.runAction(this.definition(), action, id).subscribe({
      next: () => {
        this.successMessage.set('Acao executada com sucesso.');
        this.loadRecords();
      },
      error: () => this.errorMessage.set('Nao foi possivel executar a acao.'),
    });
  }

  logout(): void {
    this.authService.logout();
  }

  fieldValue(record: Record<string, unknown>, key: string): unknown {
    return key.split('.').reduce<unknown>((value, part) => {
      if (!value || typeof value !== 'object') {
        return '';
      }

      return (value as Record<string, unknown>)[part];
    }, record);
  }

  formatValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    if (typeof value === 'boolean') {
      return value ? 'Sim' : 'Nao';
    }

    if (typeof value === 'number') {
      return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value);
    }

    return String(value);
  }

  controlName(field: EntityField): string {
    return field.key;
  }

  private resetForm(record?: Record<string, unknown>): void {
    for (const key of Object.keys(this.form.controls)) {
      this.form.removeControl(key);
    }

    for (const field of this.definition().fields) {
      if (this.editingRecord() && field.hideOnEdit) {
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

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    if (field.min !== undefined) {
      validators.push(Validators.min(field.min));
    }

    if (field.minLength !== undefined) {
      validators.push(Validators.minLength(field.minLength));
    }

    return validators;
  }

  private initialValue(field: EntityField, record?: Record<string, unknown>): string | number {
    if (!record) {
      return field.key === 'address.country' ? 'BR' : '';
    }

    const value = this.fieldValue(record, field.key);

    if (typeof value === 'number') {
      return value;
    }

    return value === null || value === undefined ? '' : String(value);
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
