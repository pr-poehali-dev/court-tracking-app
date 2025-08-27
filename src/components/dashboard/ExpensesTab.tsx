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

interface CaseExpense {
  id: string;
  caseId: string;
  caseName: string;
  clientName: string;
  category: 'paper' | 'copying' | 'phone' | 'transport' | 'notary' | 'evidence' | 'court' | 'other';
  subcategory?: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  receipt?: boolean;
  receiptNumber?: string;
  reimbursable: boolean;
  status: 'pending' | 'approved' | 'reimbursed' | 'rejected';
  notes?: string;
}

interface CaseSummary {
  caseId: string;
  caseName: string;
  clientName: string;
  totalExpenses: number;
  reimbursableExpenses: number;
  nonReimbursableExpenses: number;
  expenseCount: number;
  lastExpenseDate: string;
}

const ExpensesTab = () => {
  const [expenses, setExpenses] = useState<CaseExpense[]>([
    {
      id: '1',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      category: 'notary',
      subcategory: 'Заверение документов',
      description: 'Нотариальное заверение договора купли-продажи',
      amount: 3500,
      currency: 'RUB',
      date: '2024-08-15',
      receipt: true,
      receiptNumber: 'НТ-2024-08-15-001',
      reimbursable: true,
      status: 'approved',
      notes: 'Заверение у нотариуса Ивановой М.П.'
    },
    {
      id: '2',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      category: 'copying',
      subcategory: 'Ксерокопирование',
      description: 'Копирование документов для регистрации',
      amount: 450,
      currency: 'RUB',
      date: '2024-08-16',
      receipt: true,
      receiptNumber: 'КС-001',
      reimbursable: true,
      status: 'reimbursed'
    },
    {
      id: '3',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      clientName: 'Мария Сидорова',
      category: 'transport',
      subcategory: 'Поездки к клиенту',
      description: 'Проезд до офиса клиента для подписания документов',
      amount: 800,
      currency: 'RUB',
      date: '2024-08-20',
      receipt: false,
      reimbursable: true,
      status: 'pending'
    },
    {
      id: '4',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      clientName: 'Мария Сидорова',
      category: 'phone',
      subcategory: 'Междугородние звонки',
      description: 'Звонки в налоговую для уточнения статуса документов',
      amount: 250,
      currency: 'RUB',
      date: '2024-08-21',
      receipt: false,
      reimbursable: false,
      status: 'approved'
    },
    {
      id: '5',
      caseId: '3',
      caseName: 'Семейный спор Коваленко',
      clientName: 'Алексей Коваленко',
      category: 'evidence',
      subcategory: 'Сбор справок',
      description: 'Получение справок из ЗАГСа и медучреждений',
      amount: 1200,
      currency: 'RUB',
      date: '2024-08-22',
      receipt: true,
      receiptNumber: 'СП-2024-001',
      reimbursable: true,
      status: 'pending'
    },
    {
      id: '6',
      caseId: '3',
      caseName: 'Семейный спор Коваленко',
      clientName: 'Алексей Коваленко',
      category: 'court',
      subcategory: 'Госпошлина',
      description: 'Оплата госпошлины за подачу иска',
      amount: 2000,
      currency: 'RUB',
      date: '2024-08-25',
      receipt: true,
      receiptNumber: 'ГП-001-2024',
      reimbursable: true,
      status: 'approved'
    }
  ]);

  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const [newExpense, setNewExpense] = useState<Partial<CaseExpense>>({
    currency: 'RUB',
    reimbursable: true,
    status: 'pending',
    receipt: false
  });

  const categories = [
    { value: 'paper', label: 'Бумага и канцтовары', icon: 'FileText' },
    { value: 'copying', label: 'Копирование', icon: 'Copy' },
    { value: 'phone', label: 'Телефония', icon: 'Phone' },
    { value: 'transport', label: 'Проезд', icon: 'Car' },
    { value: 'notary', label: 'Нотариальные действия', icon: 'Stamp' },
    { value: 'evidence', label: 'Сбор доказательств', icon: 'Search' },
    { value: 'court', label: 'Судебные расходы', icon: 'Scale' },
    { value: 'other', label: 'Прочие расходы', icon: 'MoreHorizontal' }
  ];

  const subcategories: { [key: string]: string[] } = {
    paper: ['Бумага А4', 'Папки', 'Ручки', 'Скрепки', 'Степлеры'],
    copying: ['Ксерокопирование', 'Сканирование', 'Печать документов', 'Переплёт'],
    phone: ['Местные звонки', 'Междугородние звонки', 'Международные звонки', 'Мобильная связь'],
    transport: ['Поездки к клиенту', 'Поездки в суд', 'Командировочные', 'Парковка'],
    notary: ['Заверение документов', 'Доверенности', 'Переводы', 'Удостоверение сделок'],
    evidence: ['Сбор справок', 'Экспертизы', 'Фото/видеофиксация', 'Свидетельские показания'],
    court: ['Госпошлина', 'Экспертизы', 'Вызов свидетелей', 'Переводчики'],
    other: ['Почтовые расходы', 'Банковские комиссии', 'Представительские']
  };

  const getStatusBadgeVariant = (status: CaseExpense['status']) => {
    switch (status) {
      case 'approved': return 'default';
      case 'reimbursed': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: CaseExpense['status']) => {
    switch (status) {
      case 'approved': return 'Одобрено';
      case 'reimbursed': return 'Возмещено';
      case 'pending': return 'На рассмотрении';
      case 'rejected': return 'Отклонено';
      default: return status;
    }
  };

  const getCategoryInfo = (category: string) => {
    return categories.find(cat => cat.value === category) || { label: category, icon: 'Circle' };
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency === 'RUB' ? 'RUB' : 'USD'
    }).format(amount);
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesCase = selectedCase === 'all' || expense.caseId === selectedCase;
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || expense.status === selectedStatus;
    
    return matchesCase && matchesCategory && matchesStatus;
  });

  const generateCaseSummaries = (): CaseSummary[] => {
    const summaries: { [key: string]: CaseSummary } = {};
    
    expenses.forEach(expense => {
      if (!summaries[expense.caseId]) {
        summaries[expense.caseId] = {
          caseId: expense.caseId,
          caseName: expense.caseName,
          clientName: expense.clientName,
          totalExpenses: 0,
          reimbursableExpenses: 0,
          nonReimbursableExpenses: 0,
          expenseCount: 0,
          lastExpenseDate: expense.date
        };
      }
      
      const summary = summaries[expense.caseId];
      summary.totalExpenses += expense.amount;
      summary.expenseCount++;
      
      if (expense.reimbursable) {
        summary.reimbursableExpenses += expense.amount;
      } else {
        summary.nonReimbursableExpenses += expense.amount;
      }
      
      if (new Date(expense.date) > new Date(summary.lastExpenseDate)) {
        summary.lastExpenseDate = expense.date;
      }
    });
    
    return Object.values(summaries);
  };

  const caseSummaries = generateCaseSummaries();

  const calculateTotals = () => {
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const reimbursableExpenses = filteredExpenses.filter(exp => exp.reimbursable).reduce((sum, expense) => sum + expense.amount, 0);
    const pendingExpenses = filteredExpenses.filter(exp => exp.status === 'pending').reduce((sum, expense) => sum + expense.amount, 0);
    const withReceipts = filteredExpenses.filter(exp => exp.receipt).reduce((sum, expense) => sum + expense.amount, 0);
    
    return { totalExpenses, reimbursableExpenses, pendingExpenses, withReceipts };
  };

  const { totalExpenses, reimbursableExpenses, pendingExpenses, withReceipts } = calculateTotals();

  const handleAddExpense = () => {
    if (newExpense.caseId && newExpense.category && newExpense.amount && newExpense.description) {
      const expense: CaseExpense = {
        id: Date.now().toString(),
        caseId: newExpense.caseId,
        caseName: newExpense.caseName || '',
        clientName: newExpense.clientName || '',
        category: newExpense.category as CaseExpense['category'],
        subcategory: newExpense.subcategory,
        description: newExpense.description,
        amount: newExpense.amount,
        currency: newExpense.currency || 'RUB',
        date: newExpense.date || new Date().toISOString().split('T')[0],
        receipt: newExpense.receipt || false,
        receiptNumber: newExpense.receiptNumber,
        reimbursable: newExpense.reimbursable || true,
        status: newExpense.status as CaseExpense['status'] || 'pending',
        notes: newExpense.notes
      };
      
      setExpenses(prev => [...prev, expense]);
      setNewExpense({ currency: 'RUB', reimbursable: true, status: 'pending', receipt: false });
      setIsExpenseDialogOpen(false);
    }
  };

  const uniqueCases = Array.from(new Set(expenses.map(exp => exp.caseId)))
    .map(caseId => {
      const expense = expenses.find(exp => exp.caseId === caseId);
      return { id: caseId, name: expense?.caseName || '', client: expense?.clientName || '' };
    });

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Расходы по делам</h2>
        <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить расход
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Новый расход</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label htmlFor="caseSelect">Дело *</Label>
                <Select value={newExpense.caseId} onValueChange={(value) => {
                  const caseData = uniqueCases.find(c => c.id === value);
                  setNewExpense(prev => ({ 
                    ...prev, 
                    caseId: value,
                    caseName: caseData?.name,
                    clientName: caseData?.client
                  }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите дело" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueCases.map(caseData => (
                      <SelectItem key={caseData.id} value={caseData.id}>
                        {caseData.name} - {caseData.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Категория расходов *</Label>
                <Select value={newExpense.category} onValueChange={(value) => {
                  setNewExpense(prev => ({ ...prev, category: value as CaseExpense['category'], subcategory: '' }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center">
                          <Icon name={cat.icon as any} size={14} className="mr-2" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newExpense.category && subcategories[newExpense.category] && (
                <div>
                  <Label htmlFor="subcategory">Подкатегория</Label>
                  <Select value={newExpense.subcategory} onValueChange={(value) => setNewExpense(prev => ({ ...prev, subcategory: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите подкатегорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories[newExpense.category].map(subcat => (
                        <SelectItem key={subcat} value={subcat}>
                          {subcat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="amount">Сумма *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount || ''}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="date">Дата расхода</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date || ''}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  value={newExpense.description || ''}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Подробное описание расхода"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="receipt"
                  checked={newExpense.receipt || false}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, receipt: e.target.checked }))}
                />
                <Label htmlFor="receipt">Есть чек/документ</Label>
              </div>

              {newExpense.receipt && (
                <div>
                  <Label htmlFor="receiptNumber">Номер чека/документа</Label>
                  <Input
                    id="receiptNumber"
                    value={newExpense.receiptNumber || ''}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, receiptNumber: e.target.value }))}
                    placeholder="Номер документа"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reimbursable"
                  checked={newExpense.reimbursable || false}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, reimbursable: e.target.checked }))}
                />
                <Label htmlFor="reimbursable">Подлежит возмещению</Label>
              </div>

              <div>
                <Label htmlFor="notes">Заметки</Label>
                <Textarea
                  id="notes"
                  value={newExpense.notes || ''}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Дополнительные заметки"
                />
              </div>

              <Button onClick={handleAddExpense} className="w-full">
                Добавить расход
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Всего расходов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalExpenses, 'RUB')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-green-600">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              К возмещению
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(reimbursableExpenses, 'RUB')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-yellow-600">
              <Icon name="Clock" size={16} className="mr-2" />
              На рассмотрении
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingExpenses, 'RUB')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-blue-600">
              <Icon name="Receipt" size={16} className="mr-2" />
              С документами
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(withReceipts, 'RUB')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={selectedCase} onValueChange={setSelectedCase}>
          <SelectTrigger>
            <SelectValue placeholder="Все дела" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все дела</SelectItem>
            {uniqueCases.map(caseData => (
              <SelectItem key={caseData.id} value={caseData.id}>
                {caseData.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Все категории" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Все статусы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="pending">На рассмотрении</SelectItem>
            <SelectItem value="approved">Одобрено</SelectItem>
            <SelectItem value="reimbursed">Возмещено</SelectItem>
            <SelectItem value="rejected">Отклонено</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Все расходы</TabsTrigger>
          <TabsTrigger value="summary">Сводка по делам</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          {filteredExpenses.map((expense) => {
            const categoryInfo = getCategoryInfo(expense.category);
            return (
              <Card key={expense.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name={categoryInfo.icon as any} size={20} />
                        {categoryInfo.label}
                        {expense.subcategory && (
                          <Badge variant="outline">{expense.subcategory}</Badge>
                        )}
                        <Badge variant={getStatusBadgeVariant(expense.status)}>
                          {getStatusLabel(expense.status)}
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">
                        {expense.caseName} • {expense.clientName}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      {expense.receipt && (
                        <Badge variant="secondary">
                          <Icon name="Receipt" size={12} className="mr-1" />
                          Чек
                        </Badge>
                      )}
                      {expense.reimbursable && (
                        <Badge variant="outline" className="text-green-600">
                          Возмещается
                        </Badge>
                      )}
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
                        <span className="font-semibold text-lg">{formatCurrency(expense.amount, expense.currency)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        <span className="text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">{expense.description}</p>
                      {expense.receiptNumber && (
                        <div className="flex items-center gap-2">
                          <Icon name="Hash" size={14} />
                          <span className="text-muted-foreground text-xs">
                            {expense.receiptNumber}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      {expense.notes && (
                        <p className="text-muted-foreground text-xs">{expense.notes}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredExpenses.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Icon name="DollarSign" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Расходы не найдены</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить фильтры или добавьте первый расход
                </p>
                <Button onClick={() => setIsExpenseDialogOpen(true)}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить расход
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          {caseSummaries.map((summary) => (
            <Card key={summary.caseId} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Briefcase" size={20} />
                    {summary.caseName}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setSelectedCase(summary.caseId)}>
                    <Icon name="Eye" size={14} className="mr-1" />
                    Подробнее
                  </Button>
                </div>
                <p className="text-muted-foreground">{summary.clientName}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{formatCurrency(summary.totalExpenses, 'RUB')}</p>
                    <p className="text-muted-foreground text-sm">Общие расходы</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold text-green-600">{formatCurrency(summary.reimbursableExpenses, 'RUB')}</p>
                    <p className="text-muted-foreground text-sm">К возмещению</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold">{summary.expenseCount}</p>
                    <p className="text-muted-foreground text-sm">Позиций</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{new Date(summary.lastExpenseDate).toLocaleDateString('ru-RU')}</p>
                    <p className="text-muted-foreground text-sm">Последний расход</p>
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

export default ExpensesTab;