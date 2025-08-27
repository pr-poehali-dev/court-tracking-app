export interface SignaturePosition {
  id: string;
  type: 'signature' | 'stamp' | 'seal';
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  required: boolean;
}

export interface SignatureTemplate {
  id: string;
  name: string;
  description: string;
  documentType: string;
  category: string;
  positions: SignaturePosition[];
  isDefault: boolean;
  createdAt: string;
  usageCount: number;
}

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'signature': return 'PenTool';
    case 'stamp': return 'Stamp';
    case 'seal': return 'Shield';
    default: return 'Circle';
  }
};

export const getTypeLabel = (type: string) => {
  switch (type) {
    case 'signature': return 'Подпись';
    case 'stamp': return 'Печать';
    case 'seal': return 'Печать';
    default: return type;
  }
};

export const mockTemplates: SignatureTemplate[] = [
  {
    id: '1',
    name: 'Стандартный договор',
    description: 'Подпись в конце документа справа, печать организации слева',
    documentType: 'Договор',
    category: 'default',
    positions: [
      {
        id: 'pos1',
        type: 'signature',
        x: 70,
        y: 85,
        width: 25,
        height: 8,
        label: 'Подпись представителя',
        required: true
      },
      {
        id: 'pos2',
        type: 'seal',
        x: 10,
        y: 80,
        width: 20,
        height: 20,
        label: 'Печать организации',
        required: true
      }
    ],
    isDefault: true,
    createdAt: '2024-08-15',
    usageCount: 45
  },
  {
    id: '2',
    name: 'Исковое заявление',
    description: 'Подпись заявителя внизу справа',
    documentType: 'Исковое заявление',
    category: 'default',
    positions: [
      {
        id: 'pos1',
        type: 'signature',
        x: 65,
        y: 90,
        width: 30,
        height: 6,
        label: 'Подпись заявителя',
        required: true
      }
    ],
    isDefault: true,
    createdAt: '2024-08-10',
    usageCount: 28
  },
  {
    id: '3',
    name: 'Трудовой договор',
    description: 'Подписи работника и работодателя, печать HR',
    documentType: 'Трудовой договор',
    category: 'default',
    positions: [
      {
        id: 'pos1',
        type: 'signature',
        x: 15,
        y: 85,
        width: 25,
        height: 8,
        label: 'Работник',
        required: true
      },
      {
        id: 'pos2',
        type: 'signature',
        x: 65,
        y: 85,
        width: 25,
        height: 8,
        label: 'Работодатель',
        required: true
      },
      {
        id: 'pos3',
        type: 'stamp',
        x: 45,
        y: 75,
        width: 15,
        height: 15,
        label: 'Печать HR',
        required: false
      }
    ],
    isDefault: true,
    createdAt: '2024-08-12',
    usageCount: 33
  }
];