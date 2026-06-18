export type FieldType = 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'images';

export interface SelectOption {
  value: string;
  label: string;
}

export interface EntityField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  min?: number;
  minLength?: number;
  options?: SelectOption[];
  hideOnEdit?: boolean;
  table?: boolean;
  readonly?: boolean;
  wide?: boolean;
}

export interface EntityAction {
  label: string;
  endpointSuffix: string;
  method: 'PATCH';
  visibleWhen: (record: Record<string, unknown>) => boolean;
}

export interface EntityDefinition {
  id: string;
  icon: string;
  title: string;
  singular: string;
  path: string;
  listPath: string;
  createPath: string;
  updatePath: (id: string) => string;
  deletePath: (id: string) => string;
  tableFields: string[];
  fields: EntityField[];
  actions?: EntityAction[];
}
