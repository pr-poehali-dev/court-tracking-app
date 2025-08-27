export interface CaseExpense {
  id: string;
  caseId: string;
  caseName: string;
  clientName: string;
  category: 'paper' | 'copying' | 'phone' | 'transport' | 'notary' | 'evidence' | 'court' | 'other';
  subcategory?: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  receipt?: boolean;
  receiptNumber?: string;
  reimbursable: boolean;
  status: 'pending' | 'approved' | 'reimbursed' | 'rejected';
  notes?: string;
}

export interface CaseSummary {
  caseId: string;
  caseName: string;
  clientName: string;
  totalExpenses: number;
  reimbursableExpenses: number;
  nonReimbursableExpenses: number;
  expenseCount: number;
  lastExpenseDate: string;
}

export const categories = [
  { value: 'paper', label: 'Бумага и канцтовары', icon: 'FileText' },
  { value: 'copying', label: 'Копирование', icon: 'Copy' },
  { value: 'phone', label: 'Телефония', icon: 'Phone' },
  { value: 'transport', label: 'Проезд', icon: 'Car' },
  { value: 'notary', label: 'Нотариальные действия', icon: 'Stamp' },
  { value: 'evidence', label: 'Сбор доказательств', icon: 'Search' },
  { value: 'court', label: 'Судебные расходы', icon: 'Scale' },
  { value: 'other', label: 'Прочие расходы', icon: 'MoreHorizontal' }
];

export const subcategories: { [key: string]: string[] } = {
  paper: ['Бумага А4', 'Папки', 'Ручки', 'Скрепки', 'Степлеры'],
  copying: ['Ксерокопирование', 'Сканирование', 'Печать документов', 'Переплёт'],
  phone: ['Местные звонки', 'Междугородние звонки', 'Международные звонки', 'Мобильная связь'],
  transport: ['Поездки к клиенту', 'Поездки в суд', 'Командировочные', 'Парковка'],
  notary: ['Заверение документов', 'Доверенности', 'Переводы', 'Удостоверение сделок'],
  evidence: ['Сбор справок', 'Экспертизы', 'Фото/видеофиксация', 'Свидетельские показания'],
  court: ['Госпошлина', 'Экспертизы', 'Вызов свидетелей', 'Переводчики'],
  other: ['Почтовые расходы', 'Банковские комиссии', 'Представительские']
};