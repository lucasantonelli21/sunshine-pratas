import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EntityApiService } from '../../core/entities/entity-api.service';
import { ENTITY_DEFINITIONS, entityByPath } from '../../core/entities/entity.definitions';
import { EntityAction, EntityDefinition, EntityField } from '../../core/entities/entity.models';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-entity-list-page',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, EmptyStateComponent, IconComponent],
  templateUrl: './entity-list.page.html',
  styleUrl: './entity-list.page.scss',
})
export class EntityListPage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly entityApiService = inject(EntityApiService);
  private readonly routeSub: Subscription;

  readonly definition = signal<EntityDefinition>(ENTITY_DEFINITIONS[0]);
  readonly records = signal<Record<string, unknown>[]>([]);
  readonly editingRecord = signal<Record<string, unknown> | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly showModal = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly modalError = signal<string | null>(null);

  readonly visibleFields = computed(() => {
    const editing = Boolean(this.editingRecord());
    return this.definition().fields.filter((f) => !(editing && f.hideOnEdit));
  });

  readonly form: FormGroup = this.formBuilder.group({});

  constructor() {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const entityPath = params.get('entity') ?? ENTITY_DEFINITIONS[0].path;
      const definition = entityByPath.get(entityPath) ?? ENTITY_DEFINITIONS[0];
      this.definition.set(definition);
      this.showModal.set(false);
      this.loadRecords();
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  loadRecords(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.entityApiService.list(this.definition()).subscribe({
      next: (records) => {
        this.records.set(records);
        this.loading.set(false);
      },
      error: () => {
        this.records.set([]);
        this.loading.set(false);
        this.errorMessage.set(`Não foi possível carregar ${this.definition().title.toLowerCase()}.`);
      },
    });
  }

  openCreate(): void {
    this.editingRecord.set(null);
    this.rebuildForm();
    this.modalError.set(null);
    this.showModal.set(true);
  }

  openEdit(record: Record<string, unknown>): void {
    this.editingRecord.set(record);
    this.rebuildForm(record);
    this.modalError.set(null);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  save(): void {
    this.modalError.set(null);

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
        this.showModal.set(false);
        this.successMessage.set(`${this.definition().singular} salvo com sucesso.`);
        this.loadRecords();
      },
      error: (err: { error?: { errors?: Record<string, string[]> } }) => {
        this.saving.set(false);
        const errors = err?.error?.errors;
        if (errors) {
          const firstError = Object.values(errors).flat()[0];
          this.modalError.set(firstError ?? `Erro ao salvar ${this.definition().singular.toLowerCase()}.`);
        } else {
          this.modalError.set(`Não foi possível salvar ${this.definition().singular.toLowerCase()}.`);
        }
      },
    });
  }

  delete(record: Record<string, unknown>): void {
    const id = String(record['id']);

    if (!id || !confirm(`Confirmar exclusão de ${this.definition().singular.toLowerCase()}?`)) {
      return;
    }

    this.entityApiService.remove(this.definition(), id).subscribe({
      next: () => {
        this.successMessage.set(`${this.definition().singular} removido com sucesso.`);
        this.loadRecords();
      },
      error: () => this.errorMessage.set(`Não foi possível remover ${this.definition().singular.toLowerCase()}.`),
    });
  }

  runAction(record: Record<string, unknown>, action: EntityAction): void {
    this.entityApiService.runAction(this.definition(), action, String(record['id'])).subscribe({
      next: () => {
        this.successMessage.set('Ação executada com sucesso.');
        this.loadRecords();
      },
      error: () => this.errorMessage.set('Não foi possível executar a ação.'),
    });
  }

  controlName(field: EntityField): string {
    return field.key;
  }

  fieldLabel(key: string): string {
    return this.definition().fields.find((f) => f.key === key)?.label ?? key;
  }

  fieldValue(record: Record<string, unknown>, key: string): unknown {
    return key.split('.').reduce<unknown>((acc, part) => {
      if (!acc || typeof acc !== 'object') return '';
      return (acc as Record<string, unknown>)[part];
    }, record);
  }

  formatValue(value: unknown): string {
    if (value === null || value === undefined || value === '') return '-';
    if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
    if (typeof value === 'number') {
      return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value);
    }
    return String(value);
  }

  private rebuildForm(record?: Record<string, unknown>): void {
    for (const key of Object.keys(this.form.controls)) {
      this.form.removeControl(key);
    }

    for (const field of this.definition().fields) {
      if (record && field.hideOnEdit) continue;

      this.form.addControl(
        field.key,
        this.formBuilder.control(this.resolveInitialValue(field, record), this.buildValidators(field)),
      );
    }
  }

  private buildValidators(field: EntityField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (field.required) validators.push(Validators.required);
    if (field.type === 'email') validators.push(Validators.email);
    if (field.min !== undefined) validators.push(Validators.min(field.min));
    if (field.minLength !== undefined) validators.push(Validators.minLength(field.minLength));
    return validators;
  }

  private resolveInitialValue(field: EntityField, record?: Record<string, unknown>): string | number {
    if (!record) return '';

    const value = this.fieldValue(record, field.key) ?? this.resolveFromFlatRecord(record, field.key);
    if (typeof value === 'number') return value;
    return value === null || value === undefined ? '' : String(value);
  }

  private resolveFromFlatRecord(record: Record<string, unknown>, key: string): unknown {
    // For address.street → try addressStreet or address_street from nested address object
    const parts = key.split('.');
    if (parts.length === 2 && parts[0] === 'address') {
      const nested = record['address'] as Record<string, unknown> | undefined;
      return nested?.[parts[1]] ?? null;
    }
    return record[key] ?? null;
  }

  private buildPayload(): Record<string, unknown> {
    const payload: Record<string, unknown> = {};

    for (const field of this.visibleFields()) {
      const raw = this.form.controls[field.key].value;
      const value = field.type === 'number' && raw !== '' ? Number(raw) : (raw === '' ? null : raw);
      payload[field.key] = value;
    }

    return payload;
  }
}
