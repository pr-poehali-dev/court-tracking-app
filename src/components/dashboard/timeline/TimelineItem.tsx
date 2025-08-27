import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { CaseEvent } from './types';
import { 
  getEventTypeInfo, 
  getEventStatusInfo, 
  getPriorityInfo, 
  formatEventTime, 
  getLocationIcon,
  calculateEventDuration
} from './utils';

interface TimelineItemProps {
  event: CaseEvent;
  isFirst?: boolean;
  isLast?: boolean;
  onViewDetails: (event: CaseEvent) => void;
  onEditEvent: (event: CaseEvent) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  isFirst = false,
  isLast = false,
  onViewDetails,
  onEditEvent
}) => {
  const typeInfo = getEventTypeInfo(event.type);
  const statusInfo = getEventStatusInfo(event.status);
  const priorityInfo = getPriorityInfo(event.priority);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'scheduled': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500';
      case 'high': return 'border-orange-500';
      case 'medium': return 'border-blue-500';
      case 'low': return 'border-gray-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="relative">
      {/* Временная линия */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-blue-400">
        {!isLast && <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-200 opacity-60" />}
      </div>

      {/* Иконка события */}
      <div className={`absolute left-3 top-4 w-6 h-6 rounded-full flex items-center justify-center text-xs ${getStatusColor(event.status)} border-2 border-white shadow-md z-10`}>
        <Icon name={typeInfo.icon as any} size={12} />
      </div>

      {/* Карточка события */}
      <div className={`ml-12 mb-6 ${getPriorityColor(event.priority)} border-l-4`}>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {typeInfo.label}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {statusInfo.label}
                  </Badge>
                  {event.priority !== 'low' && (
                    <Badge variant="outline" className={`text-xs ${priorityInfo.color === 'red' ? 'text-red-600' : priorityInfo.color === 'orange' ? 'text-orange-600' : 'text-blue-600'}`}>
                      {priorityInfo.label} приоритет
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Scale" size={12} />
                    <span>{event.caseName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="User" size={12} />
                    <span>{event.clientName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatEventTime(event.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => onViewDetails(event)}>
                  <Icon name="Eye" size={14} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEditEvent(event)}>
                  <Icon name="Edit" size={14} />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Участники */}
              {event.participants && event.participants.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name="Users" size={14} />
                    <span className="text-xs font-medium text-muted-foreground">Участники:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {event.participants.slice(0, 3).map((participant) => (
                      <div key={participant.id} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                        <Avatar className="w-4 h-4">
                          <AvatarFallback className="text-xs">
                            {participant.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{participant.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {participant.role === 'lawyer' ? 'Юрист' : 
                           participant.role === 'client' ? 'Клиент' :
                           participant.role === 'judge' ? 'Судья' :
                           participant.role === 'expert' ? 'Эксперт' :
                           participant.role === 'witness' ? 'Свидетель' : 'Другое'}
                        </Badge>
                      </div>
                    ))}
                    {event.participants.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{event.participants.length - 3} еще
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Местоположение */}
              {event.location && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name={getLocationIcon(event.location.type) as any} size={14} />
                    <span className="text-xs font-medium text-muted-foreground">Место:</span>
                  </div>
                  <div className="text-sm bg-muted p-2 rounded">
                    <div className="font-medium">{event.location.name}</div>
                    {event.location.address && (
                      <div className="text-xs text-muted-foreground mt-1">{event.location.address}</div>
                    )}
                    {event.location.room && (
                      <div className="text-xs text-muted-foreground">Кабинет/зал: {event.location.room}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Результат */}
              {event.result && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name="CheckCircle" size={14} />
                    <span className="text-xs font-medium text-muted-foreground">Результат:</span>
                  </div>
                  <div className="text-sm bg-muted p-2 rounded">
                    <div className={`inline-flex items-center gap-1 mb-1 ${
                      event.result.outcome === 'positive' ? 'text-green-600' :
                      event.result.outcome === 'negative' ? 'text-red-600' :
                      event.result.outcome === 'neutral' ? 'text-gray-600' : 'text-yellow-600'
                    }`}>
                      <Icon name={
                        event.result.outcome === 'positive' ? 'CheckCircle' :
                        event.result.outcome === 'negative' ? 'XCircle' :
                        event.result.outcome === 'neutral' ? 'Minus' : 'Clock'
                      } size={12} />
                      <span className="text-xs font-medium">
                        {event.result.outcome === 'positive' ? 'Положительный' :
                         event.result.outcome === 'negative' ? 'Отрицательный' :
                         event.result.outcome === 'neutral' ? 'Нейтральный' :
                         event.result.outcome === 'postponed' ? 'Отложено' : 'Отменено'}
                      </span>
                    </div>
                    <div className="text-xs mt-1">{event.result.summary}</div>
                    {event.result.duration && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Длительность: {Math.floor(event.result.duration / 60)}ч {event.result.duration % 60}мин
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Уведомления */}
              {event.notifications && event.notifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name="Bell" size={14} />
                    <span className="text-xs font-medium text-muted-foreground">Уведомления:</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {event.notifications.map((notification) => (
                      <Badge key={notification.id} variant="outline" className="text-xs">
                        <Icon name={
                          notification.type === 'email' ? 'Mail' :
                          notification.type === 'sms' ? 'MessageSquare' :
                          notification.type === 'push' ? 'Smartphone' : 'Phone'
                        } size={10} className="mr-1" />
                        {notification.recipientType === 'client' ? 'Клиент' : 'Команда'} - 
                        {notification.status === 'sent' ? ' Отправлено' :
                         notification.status === 'delivered' ? ' Доставлено' :
                         notification.status === 'failed' ? ' Ошибка' : ' Запланировано'}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Теги */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineItem;