import { CaseExpense, CaseSummary, categories } from './types';

export const getStatusBadgeVariant = (status: CaseExpense['status']) => {
  switch (status) {
    case 'approved': return 'default';
    case 'reimbursed': return 'default';
    case 'pending': return 'secondary';
    case 'rejected': return 'destructive';
    default: return 'secondary';
  }
};

export const getStatusLabel = (status: CaseExpense['status']) => {
  switch (status) {
    case 'approved': return 'Одобрено';
    case 'reimbursed': return 'Возмещено';
    case 'pending': return 'На рассмотрении';
    case 'rejected': return 'Отклонено';
    default: return status;
  }
};

export const getCategoryInfo = (category: string) => {
  return categories.find(cat => cat.value === category) || { label: category, icon: 'Circle' };
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency === 'RUB' ? 'RUB' : 'USD'
  }).format(amount);
};

export const generateCaseSummaries = (expenses: CaseExpense[]): CaseSummary[] => {
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

export const calculateTotals = (filteredExpenses: CaseExpense[]) => {
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const reimbursableExpenses = filteredExpenses.filter(exp => exp.reimbursable).reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = filteredExpenses.filter(exp => exp.status === 'pending').reduce((sum, expense) => sum + expense.amount, 0);
  const withReceipts = filteredExpenses.filter(exp => exp.receipt).reduce((sum, expense) => sum + expense.amount, 0);
  
  return { totalExpenses, reimbursableExpenses, pendingExpenses, withReceipts };
};