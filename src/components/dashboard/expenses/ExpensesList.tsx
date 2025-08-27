import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { CaseExpense } from './types';
import { getCategoryInfo, getStatusBadgeVariant, getStatusLabel, formatCurrency } from './utils';

interface ExpensesListProps {
  expenses: CaseExpense[];
  onAddExpense: () => void;
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses, onAddExpense }) => {
  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Icon name="DollarSign" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Расходы не найдены</h3>
          <p className="text-muted-foreground mb-4">
            Попробуйте изменить фильтры или добавьте первый расход
          </p>
          <Button onClick={onAddExpense}>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить расход
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
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
    </div>
  );
};

export default ExpensesList;