export interface Case {
  id: number;
  title: string;
  number: string;
  status: string;
  progress: number;
  nextHearing: string | null;
  priority: 'high' | 'medium' | 'low';
  court: string;
  documents: number;
  notifications: number;
}

export interface UpcomingEvent {
  date: string;
  time: string;
  title: string;
  case: string;
  court: string;
}

export interface Notification {
  id: number;
  type: 'deadline' | 'hearing' | 'document';
  title: string;
  message: string;
  time: string;
  urgent: boolean;
}

export interface DocumentTemplate {
  id: number;
  title: string;
  category: string;
  description: string;
  fields: TemplateField[];
  icon: string;
  color: string;
}

export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
}

export const mockCases: Case[] = [
  {
    id: 1,
    title: 'Дело о взыскании задолженности',
    number: '№ 2-1234/2024',
    status: 'В процессе',
    progress: 65,
    nextHearing: '2024-09-15',
    priority: 'high',
    court: 'Арбитражный суд г. Москвы',
    documents: 12,
    notifications: 3
  },
  {
    id: 2,
    title: 'Трудовой спор',
    number: '№ 2-5678/2024',
    status: 'Подготовка',
    progress: 30,
    nextHearing: '2024-09-20',
    priority: 'medium',
    court: 'Замоскворецкий районный суд',
    documents: 8,
    notifications: 1
  },
  {
    id: 3,
    title: 'Договорное право',
    number: '№ 2-9012/2024',
    status: 'Завершено',
    progress: 100,
    nextHearing: null,
    priority: 'low',
    court: 'Тверской районный суд',
    documents: 15,
    notifications: 0
  }
];

export const mockUpcomingEvents: UpcomingEvent[] = [
  {
    date: '2024-09-15',
    time: '10:00',
    title: 'Судебное заседание',
    case: 'Дело № 2-1234/2024',
    court: 'Арбитражный суд г. Москвы'
  },
  {
    date: '2024-09-18',
    time: '14:30',
    title: 'Подача документов',
    case: 'Дело № 2-5678/2024',
    court: 'Замоскворецкий районный суд'
  },
  {
    date: '2024-09-20',
    time: '11:15',
    title: 'Предварительное заседание',
    case: 'Дело № 2-5678/2024',
    court: 'Замоскворецкий районный суд'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'deadline',
    title: 'Приближается дедлайн',
    message: 'Подача возражения по делу № 2-1234/2024 до 16 сентября',
    time: '2 часа назад',
    urgent: true
  },
  {
    id: 2,
    type: 'hearing',
    title: 'Изменение даты заседания',
    message: 'Заседание по делу № 2-5678/2024 перенесено на 20 сентября',
    time: '5 часов назад',
    urgent: false
  },
  {
    id: 3,
    type: 'document',
    title: 'Новый документ',
    message: 'Получено определение суда по делу № 2-1234/2024',
    time: '1 день назад',
    urgent: false
  }
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'В процессе': return 'bg-blue-500';
    case 'Подготовка': return 'bg-yellow-500';
    case 'Завершено': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-red-500 bg-red-50';
    case 'medium': return 'border-yellow-500 bg-yellow-50';
    case 'low': return 'border-green-500 bg-green-50';
    default: return 'border-gray-500 bg-gray-50';
  }
};