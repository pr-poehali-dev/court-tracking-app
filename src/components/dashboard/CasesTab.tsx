import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { mockCases, getStatusColor, getPriorityColor } from './types';

const CasesTab: React.FC = () => {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Все дела</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить дело
        </Button>
      </div>
      
      <div className="grid gap-6">
        {mockCases.map(case_ => (
          <Card key={case_.id} className={`card-hover border-l-4 ${getPriorityColor(case_.priority)}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{case_.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{case_.number} • {case_.court}</p>
                </div>
                <Badge className={`${getStatusColor(case_.status)} text-white`}>
                  {case_.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Прогресс дела</span>
                    <span>{case_.progress}%</span>
                  </div>
                  <Progress value={case_.progress} className="h-2" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Icon name="FileText" size={16} className="mr-1 text-muted-foreground" />
                    <span className="text-sm">{case_.documents} документов</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Bell" size={16} className="mr-1 text-muted-foreground" />
                    <span className="text-sm">{case_.notifications} уведомлений</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Просмотр
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={14} className="mr-1" />
                    Редактировать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CasesTab;