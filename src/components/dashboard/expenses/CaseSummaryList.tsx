import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CaseSummary } from './types';
import { formatCurrency } from './utils';

interface CaseSummaryListProps {
  summaries: CaseSummary[];
  onSelectCase: (caseId: string) => void;
}

const CaseSummaryList: React.FC<CaseSummaryListProps> = ({ summaries, onSelectCase }) => {
  return (
    <div className="space-y-4">
      {summaries.map((summary) => (
        <Card key={summary.caseId} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Briefcase" size={20} />
                {summary.caseName}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => onSelectCase(summary.caseId)}>
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
    </div>
  );
};

export default CaseSummaryList;