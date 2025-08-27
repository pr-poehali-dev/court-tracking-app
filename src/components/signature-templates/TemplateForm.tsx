import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { SignaturePosition, getTypeIcon } from './types';

interface TemplateFormProps {
  templateForm: {
    name: string;
    description: string;
    documentType: string;
    category: string;
  };
  setTemplateForm: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    documentType: string;
    category: string;
  }>>;
  editorPositions: SignaturePosition[];
  addSignaturePosition: (type: 'signature' | 'stamp' | 'seal') => void;
  removePosition: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  templateForm,
  setTemplateForm,
  editorPositions,
  addSignaturePosition,
  removePosition,
  onSave,
  onCancel
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки шаблона</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="template-name">Название шаблона</Label>
          <Input
            id="template-name"
            value={templateForm.name}
            onChange={(e) => setTemplateForm(prev => ({
              ...prev,
              name: e.target.value
            }))}
            placeholder="Например: Договор поставки"
          />
        </div>

        <div>
          <Label htmlFor="template-description">Описание</Label>
          <Input
            id="template-description"
            value={templateForm.description}
            onChange={(e) => setTemplateForm(prev => ({
              ...prev,
              description: e.target.value
            }))}
            placeholder="Краткое описание"
          />
        </div>

        <div>
          <Label htmlFor="template-type">Тип документа</Label>
          <Select
            value={templateForm.documentType}
            onValueChange={(value) => setTemplateForm(prev => ({
              ...prev,
              documentType: value
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Договор">Договор</SelectItem>
              <SelectItem value="Исковое заявление">Исковое заявление</SelectItem>
              <SelectItem value="Трудовой договор">Трудовой договор</SelectItem>
              <SelectItem value="Устав">Устав</SelectItem>
              <SelectItem value="Другой">Другой</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Добавить элемент</Label>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addSignaturePosition('signature')}
            >
              <Icon name="PenTool" size={14} className="mr-2" />
              Подпись
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addSignaturePosition('stamp')}
            >
              <Icon name="Stamp" size={14} className="mr-2" />
              Печать
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Позиции ({editorPositions.length})</Label>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {editorPositions.map((pos) => (
              <div key={pos.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Icon name={getTypeIcon(pos.type)} size={14} />
                  <span className="text-sm">{pos.label}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePosition(pos.id)}
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onSave}>
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateForm;