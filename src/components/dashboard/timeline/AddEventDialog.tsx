import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { CaseEvent, eventTypes, eventStatuses, priorities } from './types';

interface AddEventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newEvent: Partial<CaseEvent>;
  onEventChange: (event: Partial<CaseEvent>) => void;
  onAddEvent: () => void;
  availableCases: Array<{ id: string; name: string; client: string }>;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onOpenChange,
  newEvent,
  onEventChange,
  onAddEvent,
  availableCases
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить событие
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Новое событие по делу</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <Label htmlFor="caseSelect">Дело *</Label>
            <Select value={newEvent.caseId} onValueChange={(value) => {
              const selectedCase = availableCases.find(c => c.id === value);
              onEventChange({ 
                ...newEvent, 
                caseId: value,
                caseName: selectedCase?.name,
                clientName: selectedCase?.client
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите дело" />
              </SelectTrigger>
              <SelectContent>
                {availableCases.map(caseItem => (
                  <SelectItem key={caseItem.id} value={caseItem.id}>
                    {caseItem.name} - {caseItem.client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Тип события *</Label>
            <Select value={newEvent.type} onValueChange={(value) => onEventChange({ ...newEvent, type: value as CaseEvent['type'] })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип события" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <Icon name={type.icon as any} size={16} className="mr-2" />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Название события *</Label>
            <Input
              id="title"
              value={newEvent.title || ''}
              onChange={(e) => onEventChange({ ...newEvent, title: e.target.value })}
              placeholder="Краткое описание события"
            />
          </div>

          <div>
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={newEvent.description || ''}
              onChange={(e) => onEventChange({ ...newEvent, description: e.target.value })}
              placeholder="Подробное описание события и его результатов"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select value={newEvent.status} onValueChange={(value) => onEventChange({ ...newEvent, status: value as CaseEvent['status'] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventStatuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Приоритет</Label>
              <Select value={newEvent.priority} onValueChange={(value) => onEventChange({ ...newEvent, priority: value as CaseEvent['priority'] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="timestamp">Дата и время события *</Label>
            <Input
              id="timestamp"
              type="datetime-local"
              value={newEvent.timestamp ? new Date(newEvent.timestamp).toISOString().slice(0, 16) : ''}
              onChange={(e) => onEventChange({ ...newEvent, timestamp: new Date(e.target.value).toISOString() })}
            />
          </div>

          <div>
            <Label htmlFor="locationName">Место проведения</Label>
            <Input
              id="locationName"
              value={newEvent.location?.name || ''}
              onChange={(e) => onEventChange({ 
                ...newEvent, 
                location: { 
                  ...newEvent.location, 
                  type: 'other',
                  name: e.target.value 
                } 
              })}
              placeholder="Например: Арбитражный суд г. Москвы, каб. 15"
            />
          </div>

          <div>
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input
              id="tags"
              value={newEvent.tags?.join(', ') || ''}
              onChange={(e) => onEventChange({ 
                ...newEvent, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
              })}
              placeholder="важно, срочно, клиент"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={16} />
              <span className="font-medium text-sm">Автоматические уведомления</span>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Отправить push-уведомление клиенту</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Уведомить команду юристов</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Отправить SMS-уведомление</span>
              </div>
            </div>
          </div>

          <Button onClick={onAddEvent} className="w-full">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить событие
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;