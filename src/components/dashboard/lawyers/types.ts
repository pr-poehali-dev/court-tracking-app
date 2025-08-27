export interface Lawyer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  position: string;
  department?: string;
  hireDate: string;
  specializations: string[];
  barNumber?: string;
  isAdmin: boolean;
  lastLogin?: string;
  invitedBy?: string;
  invitedAt?: string;
}

export interface CaseRole {
  id: string;
  caseId: string;
  caseName: string;
  lawyerId: string;
  role: 'coordinator' | 'litigator' | 'expert' | 'assistant';
  assignedBy: string;
  assignedAt: string;
  isActive: boolean;
  responsibilities?: string[];
  notes?: string;
}

export interface Invitation {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  department?: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  token: string;
}

export const lawyerRoles = [
  {
    value: 'coordinator',
    label: 'Координатор дела',
    description: 'Главный юрист по делу, координирует всю работу',
    icon: 'Crown'
  },
  {
    value: 'litigator',
    label: 'Литигатор',
    description: 'Юрист, выступающий в суде',
    icon: 'Scale'
  },
  {
    value: 'expert',
    label: 'Эксперт',
    description: 'Специалист с узкой экспертизой',
    icon: 'BookOpen'
  },
  {
    value: 'assistant',
    label: 'Ассистент',
    description: 'Помощник юриста',
    icon: 'UserPlus'
  }
];

export const specializations = [
  'Гражданское право',
  'Корпоративное право',
  'Налоговое право',
  'Трудовое право',
  'Семейное право',
  'Уголовное право',
  'Арбитражные споры',
  'Недвижимость',
  'Интеллектуальная собственность',
  'Банкротство',
  'Международное право',
  'Административное право'
];