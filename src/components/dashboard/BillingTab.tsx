import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Invoice {
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

interface InvoiceService {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Payment {
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
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
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

  const getStatusBadgeVariant = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'default';
      case 'sent': return 'secondary';
      case 'draft': return 'outline';
      case 'overdue': return 'destructive';
      case 'cancelled': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'Оплачен';
      case 'sent': return 'Отправлен';
      case 'draft': return 'Черновик';
      case 'overdue': return 'Просрочен';
      case 'cancelled': return 'Отменён';
      default: return status;
    }
  };

  const getMethodLabel = (method: Payment['method']) => {
    switch (method) {
      case 'card': return 'Карта';
      case 'transfer': return 'Перевод';
      case 'cash': return 'Наличные';
      case 'check': return 'Чек';
      default: return method;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency === 'RUB' ? 'RUB' : 'USD'
    }).format(amount);
  };

  const calculateTotals = () => {
    const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalOverdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalPending = invoices.filter(inv => inv.status === 'sent').reduce((sum, invoice) => sum + invoice.amount, 0);
    
    return { totalInvoiced, totalPaid, totalOverdue, totalPending };
  };

  const { totalInvoiced, totalPaid, totalOverdue, totalPending } = calculateTotals();

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
          <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
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
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="Выберите клиента"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Сумма *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newInvoice.amount || ''}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Срок оплаты</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newInvoice.dueDate || ''}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Описание *</Label>
                  <Textarea
                    id="description"
                    value={newInvoice.description || ''}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание услуг"
                  />
                </div>
                <Button onClick={handleAddInvoice} className="w-full">
                  Создать счёт
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
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
                    setNewPayment(prev => ({ 
                      ...prev, 
                      invoiceId: value,
                      clientName: invoice?.clientName,
                      amount: invoice?.amount
                    }));
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
                    onChange={(e) => setNewPayment(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="paymentDate">Дата платежа</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={newPayment.paymentDate || ''}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, paymentDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="method">Способ оплаты</Label>
                  <Select value={newPayment.method} onValueChange={(value) => setNewPayment(prev => ({ ...prev, method: value as Payment['method'] }))}>
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
                <Button onClick={handleAddPayment} className="w-full">
                  Добавить платёж
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Icon name="FileText" size={16} className="mr-2" />
              Всего выставлено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalInvoiced, 'RUB')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-green-600">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Оплачено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid, 'RUB')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-yellow-600">
              <Icon name="Clock" size={16} className="mr-2" />
              Ожидает оплаты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending, 'RUB')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-red-600">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Просрочено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue, 'RUB')}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Счета</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="FileText" size={20} />
                      {invoice.invoiceNumber}
                      <Badge variant={getStatusBadgeVariant(invoice.status)}>
                        {getStatusLabel(invoice.status)}
                      </Badge>
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">{invoice.clientName}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={14} className="mr-1" />
                      Скачать
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Send" size={14} className="mr-1" />
                      Отправить
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Изменить
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Ruble" size={14} />
                      <span className="font-semibold">{formatCurrency(invoice.amount, invoice.currency)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={14} />
                      <span className="text-muted-foreground">
                        Срок: {new Date(invoice.dueDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="CalendarDays" size={14} />
                      <span className="text-muted-foreground">
                        Создан: {new Date(invoice.createdDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    {invoice.paidDate && (
                      <div className="flex items-center gap-2">
                        <Icon name="CheckCircle" size={14} />
                        <span className="text-green-600">
                          Оплачен: {new Date(invoice.paidDate).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs line-clamp-2">
                      {invoice.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    Платёж #{payment.id}
                    <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                      {payment.status === 'completed' ? 'Завершён' : 'В обработке'}
                    </Badge>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Подробнее
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="User" size={14} />
                      <span className="font-semibold">{payment.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Ruble" size={14} />
                      <span className="font-semibold">{formatCurrency(payment.amount, payment.currency)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Calendar" size={14} />
                      <span className="text-muted-foreground">
                        {new Date(payment.paymentDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CreditCard" size={14} />
                      <span className="text-muted-foreground">
                        {getMethodLabel(payment.method)}
                      </span>
                    </div>
                  </div>
                  <div>
                    {payment.description && (
                      <p className="text-muted-foreground text-xs">
                        {payment.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingTab;