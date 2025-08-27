import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { CaseTask, targetRoles, taskPriorities, commonTaskTemplates } from './types';

interface CreateTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTask: Partial<CaseTask>;
  onTaskChange: (task: Partial<CaseTask>) => void;
  onCreateTask: () => void;
  availableCases: Array<{ id: string; name: string; client: string }>;
  availableLawyers: Array<{ id: string; name: string; role: string }>;
  currentUserRole: string;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onOpenChange,
  newTask,
  onTaskChange,
  onCreateTask,
  availableCases,
  availableLawyers,
  currentUserRole
}) => {
  const isCoordinator = currentUserRole === 'coordinator' || currentUserRole === 'admin';

  const handleTemplateSelect = (template: { title: string; estimatedHours: number; targetRole: string }) => {
    onTaskChange({
      ...newTask,
      title: template.title,
      estimatedHours: template.estimatedHours,
      targetRole: template.targetRole as CaseTask['targetRole']
    });
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    onTaskChange({ ...newTask, tags });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Создать задачу
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Создание новой задачи</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Ручное создание</TabsTrigger>
            <TabsTrigger value="templates">Из шаблона</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 max-h-96 overflow-y-auto">
            <div>
              <Label htmlFor="caseSelect">Дело *</Label>
              <Select value={newTask.caseId} onValueChange={(value) => {
                const selectedCase = availableCases.find(c => c.id === value);
                onTaskChange({ 
                  ...newTask, 
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
              <Label htmlFor="title">Название задачи *</Label>
              <Input
                id="title"
                value={newTask.title || ''}
                onChange={(e) => onTaskChange({ ...newTask, title: e.target.value })}
                placeholder="Краткое описание задачи"
              />
            </div>

            <div>
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                value={newTask.description || ''}
                onChange={(e) => onTaskChange({ ...newTask, description: e.target.value })}
                placeholder="Подробное описание задачи, требования, ожидаемый результат"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetRole">Роль исполнителя *</Label>
                <Select value={newTask.targetRole} onValueChange={(value) => onTaskChange({ ...newTask, targetRole: value as CaseTask['targetRole'] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetRoles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assignedTo">Конкретный исполнитель</Label>
                <Select value={newTask.assignedTo} onValueChange={(value) => onTaskChange({ ...newTask, assignedTo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите юриста" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLawyers.map(lawyer => (
                      <SelectItem key={lawyer.id} value={lawyer.id}>
                        {lawyer.name} ({lawyer.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Приоритет</Label>
                <Select value={newTask.priority} onValueChange={(value) => onTaskChange({ ...newTask, priority: value as CaseTask['priority'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taskPriorities.map(priority => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className={`flex items-center ${priority.color === 'red' ? 'text-red-600' : priority.color === 'orange' ? 'text-orange-600' : priority.color === 'blue' ? 'text-blue-600' : 'text-gray-600'}`}>
                          {priority.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estimatedHours">Плановое время (часы)</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  step="0.5"
                  min="0"
                  value={newTask.estimatedHours || ''}
                  onChange={(e) => onTaskChange({ ...newTask, estimatedHours: Number(e.target.value) })}
                  placeholder="2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Дата начала</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newTask.startDate ? new Date(newTask.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => onTaskChange({ ...newTask, startDate: new Date(e.target.value).toISOString() })}
                />
              </div>

              <div>
                <Label htmlFor="dueDate">Срок выполнения *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate ? new Date(newTask.dueDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => onTaskChange({ ...newTask, dueDate: new Date(e.target.value).toISOString() })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Теги (через запятую)</Label>
              <Input
                id="tags"
                value={newTask.tags?.join(', ') || ''}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="срочно, документы, суд"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoCreateEvent"
                  checked={newTask.autoCreateEvent || false}
                  onChange={(e) => onTaskChange({ ...newTask, autoCreateEvent: e.target.checked })}
                />
                <Label htmlFor="autoCreateEvent">Автоматически создавать события в хронологии</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 max-h-96 overflow-y-auto">
            <p className="text-sm text-muted-foreground">Выберите готовый шаблон задачи:</p>
            
            {commonTaskTemplates.map(category => (
              <div key={category.category}>
                <h4 className="font-medium mb-2">{category.category}</h4>
                <div className="grid gap-2">
                  {category.tasks.map((template, index) => (
                    <div 
                      key={index}
                      className="p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{template.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Роль: {targetRoles.find(r => r.value === template.targetRole)?.label}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ~{template.estimatedHours}ч
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {!isCoordinator && (
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Info" size={16} />
              <span className="font-medium text-sm">Ограничения роли</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Создавать задачи для других ролей может только координатор дела.
              Вы можете создать задачу только для себя.
            </p>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Lightbulb" size={16} />
            <span className="font-medium text-sm">Интеграция с хронологией</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            При выполнении задачи автоматически создается событие в временной шкале дела.
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Уведомление клиента о прогрессе</li>
            <li>• Фиксация результатов в хронологии</li>
            <li>• Связь с другими событиями дела</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Отмена
          </Button>
          <Button onClick={onCreateTask} className="flex-1">
            <Icon name="Plus" size={16} className="mr-2" />
            Создать задачу
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;