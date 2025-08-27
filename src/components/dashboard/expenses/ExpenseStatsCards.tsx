import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { formatCurrency } from './utils';

interface ExpenseStatsCardsProps {
  totalExpenses: number;
  reimbursableExpenses: number;
  pendingExpenses: number;
  withReceipts: number;
}

const ExpenseStatsCards: React.FC<ExpenseStatsCardsProps> = ({
  totalExpenses,
  reimbursableExpenses,
  pendingExpenses,
  withReceipts
}) => {
  return (
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
  );
};

export default ExpenseStatsCards;