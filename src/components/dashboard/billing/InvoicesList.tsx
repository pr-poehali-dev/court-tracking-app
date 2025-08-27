import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Invoice } from './types';
import { getStatusBadgeVariant, getStatusLabel, formatCurrency } from './utils';

interface InvoicesListProps {
  invoices: Invoice[];
}

const InvoicesList: React.FC<InvoicesListProps> = ({ invoices }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default InvoicesList;