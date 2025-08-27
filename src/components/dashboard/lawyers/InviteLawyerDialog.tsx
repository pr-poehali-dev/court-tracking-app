import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Invitation, specializations } from './types';

interface InviteLawyerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newInvitation: Partial<Invitation & { specializations: string[]; message?: string }>;
  onInvitationChange: (invitation: Partial<Invitation & { specializations: string[]; message?: string }>) => void;
  onSendInvitation: () => void;
}

const InviteLawyerDialog: React.FC<InviteLawyerDialogProps> = ({
  isOpen,
  onOpenChange,
  newInvitation,
  onInvitationChange,
  onSendInvitation
}) => {
  const handleSpecializationChange = (specialization: string) => {
    const current = newInvitation.specializations || [];
    const updated = current.includes(specialization)
      ? current.filter(s => s !== specialization)
      : [...current, specialization];
    
    onInvitationChange({ ...newInvitation, specializations: updated });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="UserPlus" size={16} className="mr-2" />
          Пригласить юриста
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Приглашение юриста</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Имя *</Label>
              <Input
                id="firstName"
                value={newInvitation.firstName || ''}
                onChange={(e) => onInvitationChange({ ...newInvitation, firstName: e.target.value })}
                placeholder="Имя"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Фамилия *</Label>
              <Input
                id="lastName"
                value={newInvitation.lastName || ''}
                onChange={(e) => onInvitationChange({ ...newInvitation, lastName: e.target.value })}
                placeholder="Фамилия"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={newInvitation.email || ''}
              onChange={(e) => onInvitationChange({ ...newInvitation, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="position">Должность *</Label>
            <Select value={newInvitation.position} onValueChange={(value) => onInvitationChange({ ...newInvitation, position: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите должность" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior-lawyer">Младший юрист</SelectItem>
                <SelectItem value="lawyer">Юрист</SelectItem>
                <SelectItem value="senior-lawyer">Ведущий юрист</SelectItem>
                <SelectItem value="partner">Партнёр</SelectItem>
                <SelectItem value="paralegal">Помощник юриста</SelectItem>
                <SelectItem value="legal-consultant">Юрист-консультант</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department">Отдел</Label>
            <Select value={newInvitation.department} onValueChange={(value) => onInvitationChange({ ...newInvitation, department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите отдел" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="litigation">Судебная практика</SelectItem>
                <SelectItem value="corporate">Корпоративное право</SelectItem>
                <SelectItem value="tax">Налоговое консультирование</SelectItem>
                <SelectItem value="real-estate">Недвижимость</SelectItem>
                <SelectItem value="ip">Интеллектуальная собственность</SelectItem>
                <SelectItem value="family">Семейное право</SelectItem>
                <SelectItem value="criminal">Уголовное право</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Специализации</Label>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto">
              {specializations.map(spec => (
                <div key={spec} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`spec-${spec}`}
                    checked={newInvitation.specializations?.includes(spec) || false}
                    onChange={() => handleSpecializationChange(spec)}
                    className="rounded"
                  />
                  <Label htmlFor={`spec-${spec}`} className="text-xs">
                    {spec}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="message">Сообщение в приглашении</Label>
            <Textarea
              id="message"
              value={newInvitation.message || ''}
              onChange={(e) => onInvitationChange({ ...newInvitation, message: e.target.value })}
              placeholder="Добро пожаловать в нашу команду! Мы рады пригласить вас..."
              rows={3}
            />
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={16} />
              <span className="font-medium text-sm">Информация о приглашении</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Приглашение будет действительно 7 дней</li>
              <li>• На указанный email будет отправлена ссылка для регистрации</li>
              <li>• После регистрации юрист получит доступ к системе</li>
            </ul>
          </div>

          <Button onClick={onSendInvitation} className="w-full">
            <Icon name="Send" size={16} className="mr-2" />
            Отправить приглашение
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteLawyerDialog;