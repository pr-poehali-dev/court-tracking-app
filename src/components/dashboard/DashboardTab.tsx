import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { mockCases, mockUpcomingEvents, getStatusColor, getPriorityColor } from './types';

interface DashboardTabProps {
  onOpenDocumentHistory: () => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ onOpenDocumentHistory }) => {
  return (
    <div className="space-y-6 fade-in">
      {/* Статистические карточки */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Активные дела</CardTitle>
            <Icon name="Scale" size={20} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 за месяц</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Заседания</CardTitle>
            <Icon name="Calendar" size={20} className="text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">На этой неделе</p>
          </CardContent>
        </Card>

        <Card className="card-hover cursor-pointer" onClick={onOpenDocumentHistory}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Документы</CardTitle>
            <Icon name="FileText" size={20} className="text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">Всего файлов</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Уведомления</CardTitle>
            <Icon name="Bell" size={20} className="text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Требуют внимания</p>
          </CardContent>
        </Card>
      </div>

      {/* Активные дела и календарь */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Активные дела */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Scale" size={20} className="mr-2 text-primary" />
              Активные дела
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCases.filter(c => c.status !== 'Завершено').map(case_ => (
              <div key={case_.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(case_.priority)}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{case_.title}</h4>
                    <p className="text-sm text-muted-foreground">{case_.number}</p>
                  </div>
                  <Badge className={`${getStatusColor(case_.status)} text-white`}>
                    {case_.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс</span>
                    <span>{case_.progress}%</span>
                  </div>
                  <Progress value={case_.progress} className="h-2" />
                  {case_.nextHearing && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      Следующее заседание: {new Date(case_.nextHearing).toLocaleDateString('ru-RU')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Предстоящие события */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Clock" size={20} className="mr-2 text-accent" />
              Предстоящие события
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUpcomingEvents.slice(0, 4).map((event, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-bold text-primary">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">{event.case}</p>
                  <p className="text-xs text-muted-foreground">{event.time} • {event.court}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardTab;