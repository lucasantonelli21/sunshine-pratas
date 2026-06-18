export type DocumentType = 'CPF' | 'CNPJ';

export interface SupplierAddress {
  street: string | null;
  number: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
}

export interface Supplier {
  id: string;
  name: string;
  tradeName: string | null;
  email: string | null;
  phone: string | null;
  document: string;
  documentType: DocumentType;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  address: SupplierAddress;
  paymentTerms: string | null;
  notes: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSupplierPayload {
  name: string;
  trade_name?: string | null;
  email?: string | null;
  phone?: string | null;
  document: string;
  document_type: DocumentType;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  address_street?: string | null;
  address_number?: string | null;
  address_complement?: string | null;
  address_neighborhood?: string | null;
  address_city?: string | null;
  address_state?: string | null;
  address_zip_code?: string | null;
  address_country?: string | null;
  payment_terms?: string | null;
  notes?: string | null;
}

export type UpdateSupplierPayload = Partial<CreateSupplierPayload>;
