import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Payment } from './types';
import { getMethodLabel, formatCurrency } from './utils';

interface PaymentsListProps {
  payments: Payment[];
}

const PaymentsList: React.FC<PaymentsListProps> = ({ payments }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default PaymentsList;