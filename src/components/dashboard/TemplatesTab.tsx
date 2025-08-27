import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { DocumentTemplate } from './types';

const documentTemplates: DocumentTemplate[] = [
  {
    id: 1,
    title: 'Исковое заявление',
    category: 'Гражданское право',
    description: 'Стандартный шаблон искового заявления в суд общей юрисдикции',
    fields: [
      { name: 'courtName', label: 'Наименование суда', type: 'text', required: true },
      { name: 'plaintiffName', label: 'ФИО истца', type: 'text', required: true },
      { name: 'plaintiffAddress', label: 'Адрес истца', type: 'text', required: true },
      { name: 'defendantName', label: 'ФИО ответчика', type: 'text', required: true },
      { name: 'defendantAddress', label: 'Адрес ответчика', type: 'text', required: true },
      { name: 'claimSubject', label: 'Предмет иска', type: 'textarea', required: true },
      { name: 'claimAmount', label: 'Сумма иска', type: 'number', required: false },
      { name: 'circumstances', label: 'Обстоятельства дела', type: 'textarea', required: true },
      { name: 'requirements', label: 'Исковые требования', type: 'textarea', required: true }
    ],
    icon: 'FileText',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Возражение на иск',
    category: 'Гражданское право',
    description: 'Шаблон возражения ответчика на исковое заявление',
    fields: [
      { name: 'courtName', label: 'Наименование суда', type: 'text', required: true },
      { name: 'caseNumber', label: 'Номер дела', type: 'text', required: true },
      { name: 'defendantName', label: 'ФИО ответчика', type: 'text', required: true },
      { name: 'plaintiffName', label: 'ФИО истца', type: 'text', required: true },
      { name: 'objections', label: 'Возражения по существу', type: 'textarea', required: true },
      { name: 'evidence', label: 'Доказательства', type: 'textarea', required: false }
    ],
    icon: 'Shield',
    color: 'bg-orange-500'
  },
  {
    id: 3,
    title: 'Апелляционная жалоба',
    category: 'Процессуальное право',
    description: 'Шаблон апелляционной жалобы на решение суда первой инстанции',
    fields: [
      { name: 'appellateCourtName', label: 'Наименование апелляционного суда', type: 'text', required: true },
      { name: 'firstCourtName', label: 'Суд первой инстанции', type: 'text', required: true },
      { name: 'caseNumber', label: 'Номер дела', type: 'text', required: true },
      { name: 'decisionDate', label: 'Дата решения', type: 'date', required: true },
      { name: 'appellantName', label: 'ФИО заявителя', type: 'text', required: true },
      { name: 'grounds', label: 'Основания для отмены/изменения', type: 'textarea', required: true },
      { name: 'requirements', label: 'Требования заявителя', type: 'textarea', required: true }
    ],
    icon: 'ArrowUp',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Ходатайство',
    category: 'Процессуальное право',
    description: 'Универсальный шаблон ходатайства в суд',
    fields: [
      { name: 'courtName', label: 'Наименование суда', type: 'text', required: true },
      { name: 'caseNumber', label: 'Номер дела', type: 'text', required: false },
      { name: 'applicantName', label: 'ФИО заявителя', type: 'text', required: true },
      { name: 'participantStatus', label: 'Процессуальное положение', type: 'select', options: ['Истец', 'Ответчик', 'Третье лицо', 'Представитель'], required: true },
      { name: 'motionSubject', label: 'Предмет ходатайства', type: 'text', required: true },
      { name: 'grounds', label: 'Обоснование ходатайства', type: 'textarea', required: true }
    ],
    icon: 'FileCheck',
    color: 'bg-green-500'
  },
  {
    id: 5,
    title: 'Договор подряда',
    category: 'Договорное право',
    description: 'Стандартный договор подряда с основными условиями',
    fields: [
      { name: 'customerName', label: 'Наименование заказчика', type: 'text', required: true },
      { name: 'customerAddress', label: 'Адрес заказчика', type: 'text', required: true },
      { name: 'contractorName', label: 'Наименование подрядчика', type: 'text', required: true },
      { name: 'contractorAddress', label: 'Адрес подрядчика', type: 'text', required: true },
      { name: 'workDescription', label: 'Описание работ', type: 'textarea', required: true },
      { name: 'contractPrice', label: 'Цена договора', type: 'number', required: true },
      { name: 'deadline', label: 'Срок выполнения', type: 'date', required: true },
      { name: 'paymentTerms', label: 'Условия оплаты', type: 'textarea', required: true }
    ],
    icon: 'Handshake',
    color: 'bg-indigo-500'
  },
  {
    id: 6,
    title: 'Трудовой договор',
    category: 'Трудовое право',
    description: 'Типовой трудовой договор с работником',
    fields: [
      { name: 'employerName', label: 'Наименование работодателя', type: 'text', required: true },
      { name: 'employeeName', label: 'ФИО работника', type: 'text', required: true },
      { name: 'position', label: 'Должность', type: 'text', required: true },
      { name: 'department', label: 'Подразделение', type: 'text', required: false },
      { name: 'salary', label: 'Оклад', type: 'number', required: true },
      { name: 'startDate', label: 'Дата начала работы', type: 'date', required: true },
      { name: 'workSchedule', label: 'Режим работы', type: 'text', required: true },
      { name: 'duties', label: 'Трудовые обязанности', type: 'textarea', required: true }
    ],
    icon: 'Users',
    color: 'bg-teal-500'
  }
];

interface TemplatesTabProps {
  isTemplateDialogOpen: boolean;
  onTemplateDialogChange: (open: boolean) => void;
  selectedTemplate: DocumentTemplate | null;
  templateFormData: Record<string, string>;
  onTemplateSelect: (template: DocumentTemplate) => void;
  onFormFieldChange: (fieldName: string, value: string) => void;
  onGenerateDocument: () => void;
}

const TemplatesTab: React.FC<TemplatesTabProps> = ({
  isTemplateDialogOpen,
  onTemplateDialogChange,
  selectedTemplate,
  templateFormData,
  onTemplateSelect,
  onFormFieldChange,
  onGenerateDocument
}) => {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Шаблоны документов</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={16} className="mr-2" />
          Создать шаблон
        </Button>
      </div>

      {/* Фильтры по категориям */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
          Все категории
        </Button>
        <Button variant="outline" size="sm">
          Гражданское право
        </Button>
        <Button variant="outline" size="sm">
          Процессуальное право
        </Button>
        <Button variant="outline" size="sm">
          Договорное право
        </Button>
        <Button variant="outline" size="sm">
          Трудовое право
        </Button>
      </div>

      {/* Сетка шаблонов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTemplates.map(template => (
          <Card key={template.id} className="card-hover cursor-pointer" onClick={() => onTemplateSelect(template)}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={template.icon as any} size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="FileText" size={14} className="mr-1" />
                  {template.fields.length} полей
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Icon name="Edit" size={14} className="mr-1" />
                  Заполнить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Диалог заполнения шаблона */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={onTemplateDialogChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Icon name={selectedTemplate?.icon as any} size={20} className="text-primary" />
              <span>Заполнение шаблона: {selectedTemplate?.title}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTemplate.fields.map((field, index) => (
                  <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <Label htmlFor={field.name} className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    
                    {field.type === 'text' && (
                      <Input
                        id={field.name}
                        className="mt-1"
                        placeholder={`Введите ${field.label.toLowerCase()}`}
                        value={templateFormData[field.name] || ''}
                        onChange={(e) => onFormFieldChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'textarea' && (
                      <Textarea
                        id={field.name}
                        className="mt-1"
                        rows={3}
                        placeholder={`Введите ${field.label.toLowerCase()}`}
                        value={templateFormData[field.name] || ''}
                        onChange={(e) => onFormFieldChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'number' && (
                      <Input
                        id={field.name}
                        type="number"
                        className="mt-1"
                        placeholder={`Введите ${field.label.toLowerCase()}`}
                        value={templateFormData[field.name] || ''}
                        onChange={(e) => onFormFieldChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'date' && (
                      <Input
                        id={field.name}
                        type="date"
                        className="mt-1"
                        value={templateFormData[field.name] || ''}
                        onChange={(e) => onFormFieldChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'select' && (
                      <Select 
                        value={templateFormData[field.name] || ''} 
                        onValueChange={(value) => onFormFieldChange(field.name, value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={`Выберите ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option, optIndex) => (
                            <SelectItem key={optIndex} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => onTemplateDialogChange(false)}>
                  Отменить
                </Button>
                <Button variant="outline">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Предварительный просмотр
                </Button>
                <Button onClick={onGenerateDocument} className="bg-primary hover:bg-primary/90">
                  <Icon name="Download" size={16} className="mr-2" />
                  Сгенерировать документ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplatesTab;