import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { mockTemplates } from './types';

interface TemplatesTabProps {
  onOpenSignatureTemplates: () => void;
}

const TemplatesTab: React.FC<TemplatesTabProps> = ({ onOpenSignatureTemplates }) => {
  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Шаблоны расположения подписей</h3>
          <p className="text-sm text-muted-foreground">Управление позиционированием в документах</p>
        </div>
        <Button onClick={onOpenSignatureTemplates}>
          <Icon name="Layout" size={16} className="mr-2" />
          Управление шаблонами
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  {template.name}
                  {template.isDefault && (
                    <Badge variant="secondary" className="text-xs">По умолчанию</Badge>
                  )}
                </CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="relative bg-gray-50 rounded h-16 border">
                <div className="absolute inset-1 bg-white rounded border">
                  {template.id === '1' && (
                    <>
                      <div className="absolute bottom-1 right-1 w-4 h-2 bg-blue-200 border border-blue-400 rounded text-xs"></div>
                      <div className="absolute bottom-1 left-1 w-3 h-3 bg-green-200 border border-green-400 rounded-full"></div>
                    </>
                  )}
                  {template.id === '2' && (
                    <div className="absolute bottom-1 right-2 w-5 h-1 bg-blue-200 border border-blue-400 rounded"></div>
                  )}
                  {template.id === '3' && (
                    <>
                      <div className="absolute bottom-1 left-1 w-3 h-1 bg-blue-200 border border-blue-400 rounded"></div>
                      <div className="absolute bottom-1 right-1 w-3 h-1 bg-blue-200 border border-blue-400 rounded"></div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-200 border border-green-400 rounded-full"></div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{template.documentType}</span>
                <span>{template.positions} позиций</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Eye" size={12} className="mr-1" />
                  Применить
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Copy" size={12} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Icon name="Plus" size={20} />
              <div className="text-center">
                <div className="font-medium">Создать новый шаблон</div>
                <div className="text-xs text-muted-foreground">Настройте расположение подписей</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Icon name="Import" size={20} />
              <div className="text-center">
                <div className="font-medium">Импорт шаблона</div>
                <div className="text-xs text-muted-foreground">Загрузить из файла</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesTab;