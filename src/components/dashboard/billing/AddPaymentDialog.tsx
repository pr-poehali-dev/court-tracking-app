import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Invoice, Payment } from './types';
import { formatCurrency } from './utils';

interface AddPaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newPayment: Partial<Payment>;
  onPaymentChange: (payment: Partial<Payment>) => void;
  onAddPayment: () => void;
  invoices: Invoice[];
}

const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({
  isOpen,
  onOpenChange,
  newPayment,
  onPaymentChange,
  onAddPayment,
  invoices
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icon name="CreditCard" size={16} className="mr-2" />
          Добавить платёж
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Новый платёж</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="invoiceSelect">Счёт *</Label>
            <Select value={newPayment.invoiceId} onValueChange={(value) => {
              const invoice = invoices.find(inv => inv.id === value);
              onPaymentChange({ 
                ...newPayment, 
                invoiceId: value,
                clientName: invoice?.clientName,
                amount: invoice?.amount
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите счёт" />
              </SelectTrigger>
              <SelectContent>
                {invoices.filter(inv => inv.status !== 'paid').map(invoice => (
                  <SelectItem key={invoice.id} value={invoice.id}>
                    {invoice.invoiceNumber} - {invoice.clientName} ({formatCurrency(invoice.amount, invoice.currency)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="paymentAmount">Сумма *</Label>
            <Input
              id="paymentAmount"
              type="number"
              value={newPayment.amount || ''}
              onChange={(e) => onPaymentChange({ ...newPayment, amount: Number(e.target.value) })}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="paymentDate">Дата платежа</Label>
            <Input
              id="paymentDate"
              type="date"
              value={newPayment.paymentDate || ''}
              onChange={(e) => onPaymentChange({ ...newPayment, paymentDate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="method">Способ оплаты</Label>
            <Select value={newPayment.method} onValueChange={(value) => onPaymentChange({ ...newPayment, method: value as Payment['method'] })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transfer">Банковский перевод</SelectItem>
                <SelectItem value="card">Банковская карта</SelectItem>
                <SelectItem value="cash">Наличные</SelectItem>
                <SelectItem value="check">Чек</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onAddPayment} className="w-full">
            Добавить платёж
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentDialog;