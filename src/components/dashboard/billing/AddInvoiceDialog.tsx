import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Invoice } from './types';

interface AddInvoiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newInvoice: Partial<Invoice>;
  onInvoiceChange: (invoice: Partial<Invoice>) => void;
  onAddInvoice: () => void;
}

const AddInvoiceDialog: React.FC<AddInvoiceDialogProps> = ({
  isOpen,
  onOpenChange,
  newInvoice,
  onInvoiceChange,
  onAddInvoice
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Создать счёт
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Новый счёт</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName">Клиент *</Label>
            <Input
              id="clientName"
              value={newInvoice.clientName || ''}
              onChange={(e) => onInvoiceChange({ ...newInvoice, clientName: e.target.value })}
              placeholder="Выберите клиента"
            />
          </div>
          <div>
            <Label htmlFor="amount">Сумма *</Label>
            <Input
              id="amount"
              type="number"
              value={newInvoice.amount || ''}
              onChange={(e) => onInvoiceChange({ ...newInvoice, amount: Number(e.target.value) })}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Срок оплаты</Label>
            <Input
              id="dueDate"
              type="date"
              value={newInvoice.dueDate || ''}
              onChange={(e) => onInvoiceChange({ ...newInvoice, dueDate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={newInvoice.description || ''}
              onChange={(e) => onInvoiceChange({ ...newInvoice, description: e.target.value })}
              placeholder="Описание услуг"
            />
          </div>
          <Button onClick={onAddInvoice} className="w-full">
            Создать счёт
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvoiceDialog;