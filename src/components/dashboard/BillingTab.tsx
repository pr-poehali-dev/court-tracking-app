import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BillingStatsCards from './billing/BillingStatsCards';
import AddInvoiceDialog from './billing/AddInvoiceDialog';
import AddPaymentDialog from './billing/AddPaymentDialog';
import InvoicesList from './billing/InvoicesList';
import PaymentsList from './billing/PaymentsList';
import { Invoice, Payment } from './billing/types';
import { calculateTotals } from './billing/utils';

const BillingTab = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      clientName: 'Иван Петров',
      clientId: '1',
      invoiceNumber: 'INV-2024-001',
      amount: 45000,
      currency: 'RUB',
      status: 'paid',
      createdDate: '2024-08-01',
      dueDate: '2024-08-15',
      paidDate: '2024-08-14',
      description: 'Юридическое сопровождение сделки купли-продажи недвижимости',
      services: [
        { id: '1', description: 'Консультация по сделке', quantity: 2, rate: 5000, amount: 10000 },
        { id: '2', description: 'Подготовка документов', quantity: 1, rate: 15000, amount: 15000 },
        { id: '3', description: 'Сопровождение сделки', quantity: 1, rate: 20000, amount: 20000 }
      ]
    },
    {
      id: '2',
      clientName: 'Мария Сидорова',
      clientId: '2',
      invoiceNumber: 'INV-2024-002',
      amount: 85000,
      currency: 'RUB',
      status: 'sent',
      createdDate: '2024-08-15',
      dueDate: '2024-08-30',
      description: 'Корпоративное обслуживание ООО "Строй-Инвест"',
      services: [
        { id: '1', description: 'Абонентское обслуживание', quantity: 1, rate: 50000, amount: 50000 },
        { id: '2', description: 'Подготовка договоров аренды', quantity: 7, rate: 5000, amount: 35000 }
      ]
    },
    {
      id: '3',
      clientName: 'Алексей Коваленко',
      clientId: '3',
      invoiceNumber: 'INV-2024-003',
      amount: 15000,
      currency: 'RUB',
      status: 'overdue',
      createdDate: '2024-07-20',
      dueDate: '2024-08-05',
      description: 'Первичная консультация и анализ документов',
      services: [
        { id: '1', description: 'Консультация', quantity: 1, rate: 8000, amount: 8000 },
        { id: '2', description: 'Анализ документов', quantity: 1, rate: 7000, amount: 7000 }
      ]
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      invoiceId: '1',
      clientName: 'Иван Петров',
      amount: 45000,
      currency: 'RUB',
      paymentDate: '2024-08-14',
      method: 'transfer',
      status: 'completed',
      description: 'Оплата по счёту INV-2024-001'
    }
  ]);

  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    currency: 'RUB',
    status: 'draft',
    services: []
  });

  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    currency: 'RUB',
    method: 'transfer',
    status: 'completed'
  });

  const { totalInvoiced, totalPaid, totalOverdue, totalPending } = calculateTotals(invoices);

  const handleAddInvoice = () => {
    if (newInvoice.clientName && newInvoice.amount && newInvoice.description) {
      const invoice: Invoice = {
        id: Date.now().toString(),
        clientName: newInvoice.clientName,
        clientId: newInvoice.clientId || '',
        invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
        amount: newInvoice.amount,
        currency: newInvoice.currency || 'RUB',
        status: newInvoice.status as Invoice['status'] || 'draft',
        createdDate: new Date().toISOString().split('T')[0],
        dueDate: newInvoice.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: newInvoice.description,
        services: newInvoice.services || []
      };
      
      setInvoices(prev => [...prev, invoice]);
      setNewInvoice({ currency: 'RUB', status: 'draft', services: [] });
      setIsInvoiceDialogOpen(false);
    }
  };

  const handleAddPayment = () => {
    if (newPayment.invoiceId && newPayment.amount) {
      const payment: Payment = {
        id: Date.now().toString(),
        invoiceId: newPayment.invoiceId,
        clientName: newPayment.clientName || '',
        amount: newPayment.amount,
        currency: newPayment.currency || 'RUB',
        paymentDate: newPayment.paymentDate || new Date().toISOString().split('T')[0],
        method: newPayment.method as Payment['method'] || 'transfer',
        status: newPayment.status as Payment['status'] || 'completed',
        description: newPayment.description
      };
      
      setPayments(prev => [...prev, payment]);
      
      if (payment.status === 'completed') {
        setInvoices(prev => prev.map(invoice => 
          invoice.id === payment.invoiceId 
            ? { ...invoice, status: 'paid', paidDate: payment.paymentDate }
            : invoice
        ));
      }
      
      setNewPayment({ currency: 'RUB', method: 'transfer', status: 'completed' });
      setIsPaymentDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Биллинг</h2>
        <div className="flex gap-2">
          <AddInvoiceDialog
            isOpen={isInvoiceDialogOpen}
            onOpenChange={setIsInvoiceDialogOpen}
            newInvoice={newInvoice}
            onInvoiceChange={setNewInvoice}
            onAddInvoice={handleAddInvoice}
          />

          <AddPaymentDialog
            isOpen={isPaymentDialogOpen}
            onOpenChange={setIsPaymentDialogOpen}
            newPayment={newPayment}
            onPaymentChange={setNewPayment}
            onAddPayment={handleAddPayment}
            invoices={invoices}
          />
        </div>
      </div>

      <BillingStatsCards
        totalInvoiced={totalInvoiced}
        totalPaid={totalPaid}
        totalPending={totalPending}
        totalOverdue={totalOverdue}
      />

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Счета</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <InvoicesList invoices={invoices} />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentsList payments={payments} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingTab;