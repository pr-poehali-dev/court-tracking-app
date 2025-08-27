import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface SignaturePosition {
  id: string;
  type: 'signature' | 'stamp' | 'seal';
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  required: boolean;
}

interface SignatureTemplate {
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

interface SignatureTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignatureTemplates: React.FC<SignatureTemplatesProps> = ({ isOpen, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<SignatureTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    documentType: '',
    category: 'custom'
  });
  const [draggedItem, setDraggedItem] = useState<SignaturePosition | null>(null);
  const [editorPositions, setEditorPositions] = useState<SignaturePosition[]>([]);

  const mockTemplates: SignatureTemplate[] = [
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

  const handleCreateTemplate = () => {
    setIsCreating(true);
    setTemplateForm({
      name: '',
      description: '',
      documentType: '',
      category: 'custom'
    });
    setEditorPositions([]);
  };

  const handleSaveTemplate = () => {
    console.log('Saving template:', templateForm, editorPositions);
    setIsCreating(false);
  };

  const addSignaturePosition = (type: 'signature' | 'stamp' | 'seal') => {
    const newPosition: SignaturePosition = {
      id: `pos_${Date.now()}`,
      type,
      x: 50,
      y: 50,
      width: type === 'signature' ? 25 : 15,
      height: type === 'signature' ? 8 : 15,
      label: type === 'signature' ? 'Новая подпись' : 
             type === 'stamp' ? 'Новая печать' : 'Новая печать',
      required: false
    };
    setEditorPositions([...editorPositions, newPosition]);
  };

  const updatePosition = (id: string, updates: Partial<SignaturePosition>) => {
    setEditorPositions(prev => 
      prev.map(pos => pos.id === id ? { ...pos, ...updates } : pos)
    );
  };

  const removePosition = (id: string) => {
    setEditorPositions(prev => prev.filter(pos => pos.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'signature': return 'PenTool';
      case 'stamp': return 'Stamp';
      case 'seal': return 'Shield';
      default: return 'Circle';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'signature': return 'Подпись';
      case 'stamp': return 'Печать';
      case 'seal': return 'Печать';
      default: return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Layout" size={24} />
            Шаблоны расположения подписей
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Шаблоны</TabsTrigger>
            <TabsTrigger value="editor">Редактор</TabsTrigger>
          </TabsList>

          {/* Список шаблонов */}
          <TabsContent value="templates" className="space-y-4 max-h-[70vh] overflow-y-auto">
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
              
              <Button onClick={handleCreateTemplate}>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать шаблон
              </Button>
            </div>

            <div className="grid gap-4">
              {mockTemplates.map((template) => (
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
                          onClick={() => setSelectedTemplate(template)}
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
          </TabsContent>

          {/* Редактор шаблонов */}
          <TabsContent value="editor" className="space-y-4 max-h-[70vh] overflow-hidden">
            {isCreating ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Настройки шаблона */}
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
                      <Button onClick={handleSaveTemplate}>
                        <Icon name="Save" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreating(false)}>
                        Отмена
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Визуальный редактор */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Визуальный редактор</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-gray-50 rounded-lg h-96 border-2 border-dashed border-gray-200">
                      <div className="absolute inset-4 bg-white rounded border shadow-sm">
                        {editorPositions.map((pos) => (
                          <div
                            key={pos.id}
                            className="absolute border-2 border-blue-500 bg-blue-100/80 rounded cursor-move flex items-center justify-center text-xs font-medium hover:border-blue-600 hover:shadow-md transition-all"
                            style={{
                              left: `${pos.x}%`,
                              top: `${pos.y}%`,
                              width: `${pos.width}%`,
                              height: `${pos.height}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            onMouseDown={(e) => {
                              // Здесь можно добавить логику перетаскивания
                            }}
                          >
                            <Icon name={getTypeIcon(pos.type)} size={16} />
                          </div>
                        ))}
                        
                        {editorPositions.length === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <Icon name="MousePointer" size={48} className="mx-auto mb-2 opacity-50" />
                              <p>Добавьте элементы подписи из панели слева</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Линейка */}
                      <div className="absolute top-0 left-4 right-4 h-4 bg-gray-200 border-b">
                        {Array.from({ length: 11 }, (_, i) => (
                          <div
                            key={i}
                            className="absolute border-l border-gray-400 h-full text-xs text-gray-600"
                            style={{ left: `${i * 10}%` }}
                          >
                            <span className="ml-1">{i * 10}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="absolute top-4 bottom-4 left-0 w-4 bg-gray-200 border-r">
                        {Array.from({ length: 11 }, (_, i) => (
                          <div
                            key={i}
                            className="absolute border-t border-gray-400 w-full text-xs text-gray-600"
                            style={{ top: `${i * 10}%` }}
                          >
                            <span className="ml-1 writing-mode-vertical">{i * 10}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      Подсказка: Перетащите элементы на документ для позиционирования подписей и печатей
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Icon name="FileText" size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Создайте новый шаблон</h3>
                  <p className="text-muted-foreground mb-4">
                    Настройте расположение подписей и печатей для ваших документов
                  </p>
                  <Button onClick={handleCreateTemplate}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать шаблон
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Действия */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {isCreating ? 'Создание нового шаблона' : `${mockTemplates.length} шаблонов`}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Import" size={16} className="mr-2" />
              Импорт
            </Button>
            <Button onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureTemplates;