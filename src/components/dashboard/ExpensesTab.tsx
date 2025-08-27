import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpenseStatsCards from './expenses/ExpenseStatsCards';
import ExpenseFilters from './expenses/ExpenseFilters';
import AddExpenseDialog from './expenses/AddExpenseDialog';
import ExpensesList from './expenses/ExpensesList';
import CaseSummaryList from './expenses/CaseSummaryList';
import { CaseExpense } from './expenses/types';
import { generateCaseSummaries, calculateTotals } from './expenses/utils';

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

  const filteredExpenses = expenses.filter(expense => {
    const matchesCase = selectedCase === 'all' || expense.caseId === selectedCase;
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || expense.status === selectedStatus;
    
    return matchesCase && matchesCategory && matchesStatus;
  });

  const caseSummaries = generateCaseSummaries(expenses);
  const { totalExpenses, reimbursableExpenses, pendingExpenses, withReceipts } = calculateTotals(filteredExpenses);

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
        <AddExpenseDialog
          isOpen={isExpenseDialogOpen}
          onOpenChange={setIsExpenseDialogOpen}
          newExpense={newExpense}
          onExpenseChange={setNewExpense}
          onAddExpense={handleAddExpense}
          uniqueCases={uniqueCases}
        />
      </div>

      <ExpenseStatsCards
        totalExpenses={totalExpenses}
        reimbursableExpenses={reimbursableExpenses}
        pendingExpenses={pendingExpenses}
        withReceipts={withReceipts}
      />

      <ExpenseFilters
        selectedCase={selectedCase}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onCaseChange={setSelectedCase}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
        uniqueCases={uniqueCases}
      />

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Все расходы</TabsTrigger>
          <TabsTrigger value="summary">Сводка по делам</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses">
          <ExpensesList 
            expenses={filteredExpenses}
            onAddExpense={() => setIsExpenseDialogOpen(true)}
          />
        </TabsContent>

        <TabsContent value="summary">
          <CaseSummaryList 
            summaries={caseSummaries}
            onSelectCase={setSelectedCase}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpensesTab;