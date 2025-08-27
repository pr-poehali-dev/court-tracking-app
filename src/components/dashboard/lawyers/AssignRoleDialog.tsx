import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Lawyer, CaseRole, lawyerRoles } from './types';
import { formatFullName, getRoleInfo } from './utils';

interface AssignRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLawyer: Lawyer | null;
  newRole: Partial<CaseRole>;
  onRoleChange: (role: Partial<CaseRole>) => void;
  onAssignRole: () => void;
  availableCases: Array<{ id: string; name: string; client: string }>;
}

const AssignRoleDialog: React.FC<AssignRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedLawyer,
  newRole,
  onRoleChange,
  onAssignRole,
  availableCases
}) => {
  if (!selectedLawyer) return null;

  const selectedRoleInfo = newRole.role ? getRoleInfo(newRole.role) : null;

  const responsibilities = {
    coordinator: [
      'Общая координация работы по делу',
      'Контроль соблюдения сроков',
      'Распределение задач между участниками команды',
      'Коммуникация с клиентом',
      'Принятие стратегических решений'
    ],
    litigator: [
      'Представительство в судебных заседаниях',
      'Подготовка процессуальных документов',
      'Ведение судебных прений',
      'Подача апелляций и кассаций',
      'Исполнение судебных решений'
    ],
    expert: [
      'Консультации по специализированным вопросам',
      'Подготовка экспертных заключений',
      'Анализ сложных правовых вопросов',
      'Разработка правовых позиций',
      'Методическая поддержка команды'
    ],
    assistant: [
      'Подготовка документов и справок',
      'Сбор и систематизация материалов',
      'Ведение досье дела',
      'Техническая поддержка процессов',
      'Контроль документооборота'
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Назначение роли юриста</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="User" size={16} />
              <span className="font-medium">{formatFullName(selectedLawyer)}</span>
            </div>
            <p className="text-sm text-muted-foreground">{selectedLawyer.position}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedLawyer.specializations.map(spec => (
                <Badge key={spec} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="caseSelect">Дело *</Label>
            <Select value={newRole.caseId} onValueChange={(value) => {
              const selectedCase = availableCases.find(c => c.id === value);
              onRoleChange({ 
                ...newRole, 
                caseId: value,
                caseName: selectedCase?.name
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
            <Label htmlFor="roleSelect">Роль в деле *</Label>
            <Select value={newRole.role} onValueChange={(value) => onRoleChange({ ...newRole, role: value as CaseRole['role'] })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                {lawyerRoles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex items-center">
                      <Icon name={role.icon as any} size={16} className="mr-2" />
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-xs text-muted-foreground">{role.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRoleInfo && newRole.role && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={selectedRoleInfo.icon as any} size={16} />
                <span className="font-medium text-sm">Обязанности: {selectedRoleInfo.label}</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {responsibilities[newRole.role].map((resp, index) => (
                  <li key={index}>• {resp}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Дополнительные заметки</Label>
            <Textarea
              id="notes"
              value={newRole.notes || ''}
              onChange={(e) => onRoleChange({ ...newRole, notes: e.target.value })}
              placeholder="Особые указания, комментарии по назначению..."
              rows={3}
            />
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="AlertTriangle" size={16} />
              <span className="font-medium text-sm">Важная информация</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Юрист получит уведомление о назначении</li>
              <li>• У юриста появится доступ к материалам дела</li>
              <li>• Роль можно изменить или отозвать в любое время</li>
              <li>• Координатор дела может назначать других участников</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Отмена
            </Button>
            <Button onClick={onAssignRole} className="flex-1">
              <Icon name="UserCheck" size={16} className="mr-2" />
              Назначить роль
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignRoleDialog;