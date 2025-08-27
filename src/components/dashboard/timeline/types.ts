export interface CaseEvent {
  id: string;
  caseId: string;
  caseName: string;
  clientName: string;
  type: 'document' | 'court' | 'meeting' | 'call' | 'deadline' | 'filing' | 'review' | 'notification' | 'other';
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'scheduled' | 'cancelled' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  
  // Участники события
  participants: EventParticipant[];
  
  // Местоположение
  location?: EventLocation;
  
  // Результаты события
  result?: EventResult;
  
  // Уведомления
  notifications?: EventNotification[];
  
  // Дополнительные данные
  attachments?: string[];
  tags?: string[];
  createdBy: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface EventParticipant {
  id: string;
  name: string;
  role: 'lawyer' | 'client' | 'judge' | 'expert' | 'witness' | 'opponent' | 'clerk' | 'other';
  email?: string;
  phone?: string;
  isRequired: boolean;
  participation: 'confirmed' | 'pending' | 'declined' | 'attended' | 'missed';
  notes?: string;
}

export interface EventLocation {
  type: 'court' | 'office' | 'client_office' | 'government' | 'online' | 'other';
  name: string;
  address?: string;
  room?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  url?: string; // Для онлайн-встреч
}

export interface EventResult {
  outcome: 'positive' | 'negative' | 'neutral' | 'postponed' | 'cancelled';
  summary: string;
  decisions?: string[];
  nextActions?: EventNextAction[];
  documents?: string[];
  costs?: number;
  duration?: number; // в минутах
}

export interface EventNextAction {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
}

export interface EventNotification {
  id: string;
  type: 'email' | 'sms' | 'push' | 'whatsapp';
  recipient: string;
  recipientType: 'client' | 'lawyer' | 'all_team' | 'coordinator';
  template: string;
  status: 'scheduled' | 'sent' | 'delivered' | 'failed';
  scheduledAt?: string;
  sentAt?: string;
  content?: string;
}

export const eventTypes = [
  {
    value: 'document',
    label: 'Документооборот',
    icon: 'FileText',
    color: 'blue',
    description: 'Подготовка, проверка и отправка документов'
  },
  {
    value: 'court',
    label: 'Судебные действия',
    icon: 'Scale',
    color: 'purple',
    description: 'Судебные заседания и процедуры'
  },
  {
    value: 'meeting',
    label: 'Встречи',
    icon: 'Users',
    color: 'green',
    description: 'Встречи с клиентами и участниками'
  },
  {
    value: 'call',
    label: 'Звонки',
    icon: 'Phone',
    color: 'orange',
    description: 'Телефонные переговоры и консультации'
  },
  {
    value: 'deadline',
    label: 'Дедлайны',
    icon: 'Clock',
    color: 'red',
    description: 'Важные сроки и deadline\'ы'
  },
  {
    value: 'filing',
    label: 'Подача документов',
    icon: 'Send',
    color: 'indigo',
    description: 'Подача в суд и госорганы'
  },
  {
    value: 'review',
    label: 'Изучение материалов',
    icon: 'BookOpen',
    color: 'yellow',
    description: 'Ознакомление с документами и материалами'
  },
  {
    value: 'notification',
    label: 'Уведомления',
    icon: 'Bell',
    color: 'pink',
    description: 'Получение уведомлений и извещений'
  },
  {
    value: 'other',
    label: 'Прочее',
    icon: 'MoreHorizontal',
    color: 'gray',
    description: 'Другие события по делу'
  }
];

export const eventStatuses = [
  { value: 'completed', label: 'Завершено', color: 'green' },
  { value: 'in_progress', label: 'Выполняется', color: 'blue' },
  { value: 'scheduled', label: 'Запланировано', color: 'yellow' },
  { value: 'cancelled', label: 'Отменено', color: 'gray' },
  { value: 'overdue', label: 'Просрочено', color: 'red' }
];

export const priorities = [
  { value: 'low', label: 'Низкий', color: 'gray' },
  { value: 'medium', label: 'Средний', color: 'blue' },
  { value: 'high', label: 'Высокий', color: 'orange' },
  { value: 'critical', label: 'Критический', color: 'red' }
];