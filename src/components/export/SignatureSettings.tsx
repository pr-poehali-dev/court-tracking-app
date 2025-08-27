import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface SignatureSettingsProps {
  includeSignature: boolean;
  setIncludeSignature: (include: boolean) => void;
  includeSeal: boolean;
  setIncludeSeal: (include: boolean) => void;
  selectedSignatureTemplate: string;
  setSelectedSignatureTemplate: (template: string) => void;
  selectedSignature: any;
  selectedSeal: any;
  setIsSignatureLibraryOpen: (open: boolean) => void;
}

const SignatureSettings: React.FC<SignatureSettingsProps> = ({
  includeSignature,
  setIncludeSignature,
  includeSeal,
  setIncludeSeal,
  selectedSignatureTemplate,
  setSelectedSignatureTemplate,
  selectedSignature,
  selectedSeal,
  setIsSignatureLibraryOpen
}) => {
  const getTemplateDescription = (template: string) => {
    switch (template) {
      case 'standard-contract':
        return {
          title: 'Стандартный договор',
          description: 'Подпись в правом нижнем углу, печать слева от подписи'
        };
      case 'legal-statement':
        return {
          title: 'Исковое заявление',
          description: 'Подпись заявителя в конце документа справа'
        };
      case 'employment-contract':
        return {
          title: 'Трудовой договор',
          description: 'Подписи сторон и печать HR-отдела'
        };
      case 'auto':
        return {
          title: 'Автоматическое размещение',
          description: 'Система автоматически определит оптимальное расположение'
        };
      case 'custom':
        return {
          title: 'Пользовательское размещение',
          description: 'Вы сможете вручную указать позиции после экспорта'
        };
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Подписи и печати</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="include-signature"
            checked={includeSignature}
            onCheckedChange={setIncludeSignature}
          />
          <div className="flex-1">
            <Label htmlFor="include-signature" className="font-medium cursor-pointer">
              Добавить подпись
            </Label>
            <p className="text-sm text-muted-foreground">
              Автоматическая вставка электронной подписи
            </p>
            {includeSignature && (
              <div className="mt-2">
                {selectedSignature ? (
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{selectedSignature.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedSignature.position}</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setIsSignatureLibraryOpen(true)}>
                        Изменить
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Button variant="outline" onClick={() => setIsSignatureLibraryOpen(true)}>
                    <Icon name="PenTool" size={16} className="mr-2" />
                    Выбрать подпись
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Шаблон расположения подписей */}
        {(includeSignature || includeSeal) && (
          <div className="space-y-3 pt-3 border-t">
            <Label className="font-medium">Расположение в документе</Label>
            <Select value={selectedSignatureTemplate} onValueChange={setSelectedSignatureTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите шаблон расположения" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Автоматическое размещение</SelectItem>
                <SelectItem value="standard-contract">Стандартный договор</SelectItem>
                <SelectItem value="legal-statement">Исковое заявление</SelectItem>
                <SelectItem value="employment-contract">Трудовой договор</SelectItem>
                <SelectItem value="custom">Пользовательское размещение</SelectItem>
              </SelectContent>
            </Select>
            
            {selectedSignatureTemplate && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm">
                  {(() => {
                    const templateInfo = getTemplateDescription(selectedSignatureTemplate);
                    return templateInfo ? (
                      <div>
                        <div className="font-medium mb-1">{templateInfo.title}</div>
                        <div className="text-muted-foreground">{templateInfo.description}</div>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-start space-x-3">
          <Checkbox 
            id="include-seal"
            checked={includeSeal}
            onCheckedChange={setIncludeSeal}
          />
          <div className="flex-1">
            <Label htmlFor="include-seal" className="font-medium cursor-pointer">
              Добавить печать
            </Label>
            <p className="text-sm text-muted-foreground">
              Вставка официальной печати организации
            </p>
            {includeSeal && (
              <div className="mt-2">
                {selectedSeal ? (
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{selectedSeal.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedSeal.type === 'round' ? 'Круглая' : 'Прямоугольная'} • 
                          {selectedSeal.size === 'large' ? 'Большой' : selectedSeal.size === 'medium' ? 'Средний' : 'Малый'}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setIsSignatureLibraryOpen(true)}>
                        Изменить
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Button variant="outline" onClick={() => setIsSignatureLibraryOpen(true)}>
                    <Icon name="Stamp" size={16} className="mr-2" />
                    Выбрать печать
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureSettings;