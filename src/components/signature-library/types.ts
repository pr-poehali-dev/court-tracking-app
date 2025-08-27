export interface SignatureData {
  id: number;
  name: string;
  position: string;
  style: string;
  color: string;
  preview: string;
  createdAt: string;
  isActive: boolean;
}

export interface SealData {
  id: number;
  name: string;
  type: string;
  text: string;
  size: string;
  preview: string;
  createdAt: string;
  isActive: boolean;
}

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  documentType: string;
  positions: number;
  isDefault: boolean;
}

export interface SignatureFormData {
  name: string;
  position: string;
  style: string;
  color: string;
}

export interface SignatureStyle {
  id: string;
  name: string;
  description: string;
}

export interface SignatureLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSignature?: (signature: SignatureData) => void;
  onSelectSeal?: (seal: SealData) => void;
}

export const mockSignatures: SignatureData[] = [
  {
    id: 1,
    name: 'Иванов И.И.',
    position: 'Генеральный директор',
    style: 'handwritten',
    color: '#000000',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgMzBRMzAgMTAgNTAgMzBUOTAgMzBRMTEwIDUwIDEzMCAzMFQxNzAgMzAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjEwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwIj5JdmFub3YgSS5JLjwvdGV4dD4KPHN2Zz4=',
    createdAt: '2024-08-15',
    isActive: true
  },
  {
    id: 2,
    name: 'Петров П.П.',
    position: 'Юрист',
    style: 'typed',
    color: '#1e40af',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJUaW1lcyBOZXcgUm9tYW4iIGZvbnQtc2l6ZT0iMTgiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZmlsbD0iIzFlNDBhZiI+UGV0cm92IFAuUC48L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2Ij7QrtGA0LjRgdGCPC90ZXh0Pgo8L3N2Zz4=',
    createdAt: '2024-08-20',
    isActive: true
  },
  {
    id: 3,
    name: 'Сидоров С.С.',
    position: 'Старший партнер',
    style: 'calligraphy',
    color: '#059669',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgMjVRMjAgMTUgMzAgMjVRNDAgMzUgNTAgMjVRNjAgMTUgNzAgMjVRODAgMzUgOTAgMjVRMTAwIDE1IDExMCAyNVExMjAgMzUgMTMwIDI1UTE0MCAzNSAxNTAgMjVRMTYwIDE1IDE3MCAyNSIgc3Ryb2tlPSIjMDU5NjY5IiBzdHJva2Utd2lkdGg9IjIuNSIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIxMCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzA1OTY2OSI+U2lkb3JvdiBTLlMuPC90ZXh0Pgo8L3N2Zz4=',
    createdAt: '2024-08-22',
    isActive: false
  }
];

export const mockSeals: SealData[] = [
  {
    id: 1,
    name: 'Печать организации',
    type: 'round',
    text: 'ООО "ЮРИДИЧЕСКАЯ КОМПАНИЯ"',
    size: 'large',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzNSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPHN2Zz4=',
    createdAt: '2024-07-10',
    isActive: true
  },
  {
    id: 2,
    name: 'Печать для договоров',
    type: 'rectangular',
    text: 'УТВЕРЖДАЮ',
    size: 'medium',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMTEwIiBoZWlnaHQ9IjcwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSI2MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+0KPQotCS0JXQoNCW0JTQkNCu0KY8L3RleHQ+Cjwvc3ZnPg==',
    createdAt: '2024-07-15',
    isActive: true
  },
  {
    id: 3,
    name: 'Личная печать',
    type: 'round',
    text: 'ИВАНОВ И.И. АДВОКАТ',
    size: 'small',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjgiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz4KPHN2Zz4=',
    createdAt: '2024-08-01',
    isActive: true
  }
];

export const signatureStyles: SignatureStyle[] = [
  { id: 'handwritten', name: 'Рукописная', description: 'Имитация рукописной подписи' },
  { id: 'typed', name: 'Печатная', description: 'Стилизованный текст' },
  { id: 'calligraphy', name: 'Каллиграфическая', description: 'Художественный стиль' },
  { id: 'minimalist', name: 'Минималистская', description: 'Простые линии' }
];

export const mockTemplates: TemplateData[] = [
  {
    id: '1',
    name: 'Стандартный договор',
    description: 'Подпись справа, печать слева',
    documentType: 'Договор',
    positions: 2,
    isDefault: true
  },
  {
    id: '2',
    name: 'Исковое заявление',
    description: 'Подпись заявителя внизу',
    documentType: 'Исковое заявление',
    positions: 1,
    isDefault: true
  },
  {
    id: '3',
    name: 'Трудовой договор',
    description: 'Две подписи + печать HR',
    documentType: 'Трудовой договор',
    positions: 3,
    isDefault: true
  }
];