export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'pending' | 'settled';
export type PaymentMethod =
  | 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'pix' | 'check' | 'other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  typeLabel: string;
  status: TransactionStatus;
  statusLabel: string;
  paymentMethod: PaymentMethod | null;
  paymentMethodLabel: string | null;
  category: string | null;
  notes: string | null;
  createdAt: string;
}

export interface CreateTransactionPayload {
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  status?: TransactionStatus;
  payment_method?: PaymentMethod | null;
  category?: string | null;
  notes?: string | null;
}

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;
