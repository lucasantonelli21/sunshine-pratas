export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  cpf: string | null;
  createdAt: string;
}

export interface CreateCustomerPayload {
  name: string;
  email?: string | null;
  phone?: string | null;
  cpf?: string | null;
}

export type UpdateCustomerPayload = Partial<CreateCustomerPayload>;
