export interface Invoice {
  id: string;
  clientName: string;
  clientId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  createdDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  services: InvoiceService[];
}

export interface InvoiceService {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  clientName: string;
  amount: number;
  currency: string;
  paymentDate: string;
  method: 'card' | 'transfer' | 'cash' | 'check';
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}