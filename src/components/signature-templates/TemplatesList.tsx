import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { SignatureTemplate, getTypeIcon } from './types';

interface TemplatesListProps {
  templates: SignatureTemplate[];
  onCreateTemplate: () => void;
  onSelectTemplate: (template: SignatureTemplate) => void;
}

const TemplatesList: React.FC<TemplatesListProps> = ({ 
  templates, 
  onCreateTemplate, 
  onSelectTemplate 
}) => {
  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Тип документа" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="Договор">Договоры</SelectItem>
              <SelectItem value="Исковое заявление">Исковые заявления</SelectItem>
              <SelectItem value="Трудовой договор">Трудовые договоры</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={onCreateTemplate}>
          <Icon name="Plus" size={16} className="mr-2" />
          Создать шаблон
        </Button>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {template.name}
                    {template.isDefault && (
                      <Badge variant="secondary">По умолчанию</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Использован: {template.usageCount} раз</div>
                  <div>{template.createdAt}</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline">{template.documentType}</Badge>
                  <span className="text-muted-foreground">
                    {template.positions.length} позиций подписей
                  </span>
                </div>

                {/* Превью позиций */}
                <div className="relative bg-gray-50 rounded-lg h-32 border-2 border-dashed border-gray-200">
                  <div className="absolute inset-2 bg-white rounded border">
                    {template.positions.map((pos) => (
                      <div
                        key={pos.id}
                        className="absolute border-2 border-blue-400 bg-blue-100/50 rounded flex items-center justify-center text-xs font-medium"
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                          width: `${pos.width}%`,
                          height: `${pos.height}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <Icon name={getTypeIcon(pos.type)} size={12} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Список позиций */}
                <div className="space-y-2">
                  {template.positions.map((pos) => (
                    <div key={pos.id} className="flex items-center gap-2 text-sm">
                      <Icon name={getTypeIcon(pos.type)} size={14} />
                      <span>{pos.label}</span>
                      {pos.required && (
                        <Badge variant="destructive" className="text-xs">
                          Обязательно
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSelectTemplate(template)}
                  >
                    <Icon name="Eye" size={14} className="mr-2" />
                    Просмотр
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Copy" size={14} className="mr-2" />
                    Копировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={14} className="mr-2" />
                    Редактировать
                  </Button>
                  {!template.isDefault && (
                    <Button variant="outline" size="sm">
                      <Icon name="Trash2" size={14} className="mr-2" />
                      Удалить
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesList;