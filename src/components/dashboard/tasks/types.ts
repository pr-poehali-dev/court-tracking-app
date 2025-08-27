export interface CaseTask {
  id: string;
  caseId: string;
  caseName: string;
  clientName: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  
  // Назначение и исполнители
  assignedTo: string; // ID юриста
  assignedBy: string; // ID координатора
  assignedAt: string;
  
  // Роль, для которой предназначена задача
  targetRole: 'coordinator' | 'litigator' | 'expert' | 'assistant' | 'any';
  
  // Временные рамки
  startDate?: string;
  dueDate: string;
  completedAt?: string;
  estimatedHours?: number;
  actualHours?: number;
  
  // Связи с другими задачами
  dependencies?: string[]; // ID задач, от которых зависит эта задача
  blockedBy?: string[]; // ID задач, которые блокируют эту задачу
  parentTaskId?: string; // Родительская задача
  subtasks?: string[]; // ID подзадач
  
  // Результаты и отслеживание
  progress: number; // 0-100
  result?: TaskResult;
  comments?: TaskComment[];
  attachments?: string[];
  tags?: string[];
  
  // Интеграция с временной шкалой
  timelineEventId?: string; // ID связанного события в TimelineTab
  autoCreateEvent: boolean; // Автоматически создавать событие при выполнении
  eventTemplate?: string; // Шаблон для создания события
  
  // Повторяющиеся задачи
  recurring?: TaskRecurrence;
  
  createdBy: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface TaskResult {
  status: 'success' | 'partial' | 'failed' | 'cancelled';
  summary: string;
  deliverables?: string[]; // Что было создано/получено
  issues?: string[]; // Возникшие проблемы
  nextSteps?: string[]; // Следующие шаги
  timeSpent: number; // Фактически потраченное время в минутах
}

export interface TaskComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  attachments?: string[];
  isStatusUpdate: boolean;
}

export interface TaskRecurrence {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // Каждые N дней/недель/месяцев
  endDate?: string;
  maxOccurrences?: number;
}

export interface CaseSchedule {
  id: string;
  caseId: string;
  caseName: string;
  clientName: string;
  coordinatorId: string;
  coordinatorName: string;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  
  // Временные рамки дела
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  
  // Прогресс
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  progress: number; // 0-100
  
  // Этапы дела
  phases?: CasePhase[];
  milestones?: CaseMilestone[];
  
  createdAt: string;
  updatedAt: string;
}

export interface CasePhase {
  id: string;
  name: string;
  description?: string;
  status: 'upcoming' | 'active' | 'completed' | 'skipped';
  startDate: string;
  endDate: string;
  tasks: string[]; // ID задач в этом этапе
  order: number;
}

export interface CaseMilestone {
  id: string;
  title: string;
  description?: string;
  targetDate: string;
  actualDate?: string;
  status: 'upcoming' | 'achieved' | 'missed' | 'cancelled';
  criteria: string[]; // Критерии достижения
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export const taskStatuses = [
  { value: 'pending', label: 'Ожидает', color: 'gray', icon: 'Clock' },
  { value: 'in_progress', label: 'Выполняется', color: 'blue', icon: 'Play' },
  { value: 'completed', label: 'Завершено', color: 'green', icon: 'CheckCircle' },
  { value: 'cancelled', label: 'Отменено', color: 'gray', icon: 'XCircle' },
  { value: 'overdue', label: 'Просрочено', color: 'red', icon: 'AlertTriangle' }
];

export const taskPriorities = [
  { value: 'low', label: 'Низкий', color: 'gray', urgency: 1 },
  { value: 'medium', label: 'Средний', color: 'blue', urgency: 2 },
  { value: 'high', label: 'Высокий', color: 'orange', urgency: 3 },
  { value: 'critical', label: 'Критический', color: 'red', urgency: 4 }
];

export const targetRoles = [
  { value: 'coordinator', label: 'Координатор', description: 'Главный юрист по делу' },
  { value: 'litigator', label: 'Литигатор', description: 'Юрист для судебных заседаний' },
  { value: 'expert', label: 'Эксперт', description: 'Специалист узкой направленности' },
  { value: 'assistant', label: 'Ассистент', description: 'Помощник юриста' },
  { value: 'any', label: 'Любая роль', description: 'Может выполнить любой участник' }
];

export const commonTaskTemplates = [
  {
    category: 'Подготовка документов',
    tasks: [
      { title: 'Подготовить исковое заявление', estimatedHours: 4, targetRole: 'coordinator' as const },
      { title: 'Собрать пакет документов', estimatedHours: 2, targetRole: 'assistant' as const },
      { title: 'Проверить документы на соответствие', estimatedHours: 1, targetRole: 'expert' as const },
      { title: 'Подготовить доверенности', estimatedHours: 1, targetRole: 'assistant' as const }
    ]
  },
  {
    category: 'Судебные процедуры',
    tasks: [
      { title: 'Подать документы в суд', estimatedHours: 1, targetRole: 'litigator' as const },
      { title: 'Подготовиться к судебному заседанию', estimatedHours: 3, targetRole: 'litigator' as const },
      { title: 'Участвовать в судебном заседании', estimatedHours: 2, targetRole: 'litigator' as const },
      { title: 'Получить решение суда', estimatedHours: 0.5, targetRole: 'assistant' as const }
    ]
  },
  {
    category: 'Клиентская работа',
    tasks: [
      { title: 'Провести консультацию с клиентом', estimatedHours: 1.5, targetRole: 'coordinator' as const },
      { title: 'Подготовить отчёт для клиента', estimatedHours: 2, targetRole: 'coordinator' as const },
      { title: 'Согласовать стратегию с клиентом', estimatedHours: 1, targetRole: 'coordinator' as const }
    ]
  },
  {
    category: 'Исследование и анализ',
    tasks: [
      { title: 'Провести правовой анализ', estimatedHours: 4, targetRole: 'expert' as const },
      { title: 'Изучить судебную практику', estimatedHours: 3, targetRole: 'expert' as const },
      { title: 'Подготовить экспертное заключение', estimatedHours: 6, targetRole: 'expert' as const }
    ]
  }
];