import { Invoice, Payment } from './types';

export const getStatusBadgeVariant = (status: Invoice['status']) => {
  switch (status) {
    case 'paid': return 'default';
    case 'sent': return 'secondary';
    case 'draft': return 'outline';
    case 'overdue': return 'destructive';
    case 'cancelled': return 'secondary';
    default: return 'secondary';
  }
};

export const getStatusLabel = (status: Invoice['status']) => {
  switch (status) {
    case 'paid': return 'Оплачен';
    case 'sent': return 'Отправлен';
    case 'draft': return 'Черновик';
    case 'overdue': return 'Просрочен';
    case 'cancelled': return 'Отменён';
    default: return status;
  }
};

export const getMethodLabel = (method: Payment['method']) => {
  switch (method) {
    case 'card': return 'Карта';
    case 'transfer': return 'Перевод';
    case 'cash': return 'Наличные';
    case 'check': return 'Чек';
    default: return method;
  }
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency === 'RUB' ? 'RUB' : 'USD'
  }).format(amount);
};

export const calculateTotals = (invoices: Invoice[]) => {
  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalOverdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPending = invoices.filter(inv => inv.status === 'sent').reduce((sum, invoice) => sum + invoice.amount, 0);
  
  return { totalInvoiced, totalPaid, totalOverdue, totalPending };
};