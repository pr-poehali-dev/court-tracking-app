import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface DocumentStyleSelectorProps {
  documentStyle: string;
  setDocumentStyle: (style: string) => void;
}

const DocumentStyleSelector: React.FC<DocumentStyleSelectorProps> = ({
  documentStyle,
  setDocumentStyle
}) => {
  const documentStyles = [
    {
      id: 'standard',
      name: 'Стандартный',
      description: 'Классическое оформление для официальных документов',
      preview: 'Times New Roman, 12pt, одинарный интервал'
    },
    {
      id: 'modern',
      name: 'Современный',
      description: 'Современное оформление с чистым дизайном',
      preview: 'Arial, 11pt, 1.15 интервал'
    },
    {
      id: 'compact',
      name: 'Компактный',
      description: 'Сжатый формат для экономии места',
      preview: 'Calibri, 10pt, одинарный интервал'
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Стиль оформления</h3>
      <RadioGroup value={documentStyle} onValueChange={setDocumentStyle}>
        {documentStyles.map((style) => (
          <div key={style.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
            <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={style.id} className="font-medium cursor-pointer">
                {style.name}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {style.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {style.preview}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default DocumentStyleSelector;