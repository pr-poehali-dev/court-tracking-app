import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { formatCurrency } from './utils';

interface BillingStatsCardsProps {
  totalInvoiced: number;
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
}

const BillingStatsCards: React.FC<BillingStatsCardsProps> = ({
  totalInvoiced,
  totalPaid,
  totalPending,
  totalOverdue
}) => {
  return (
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
  );
};

export default BillingStatsCards;