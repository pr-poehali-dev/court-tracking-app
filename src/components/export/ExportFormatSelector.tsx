import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ExportFormatSelectorProps {
  exportFormat: 'pdf' | 'docx';
  setExportFormat: (format: 'pdf' | 'docx') => void;
}

const ExportFormatSelector: React.FC<ExportFormatSelectorProps> = ({
  exportFormat,
  setExportFormat
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Формат экспорта</h3>
      <div className="grid grid-cols-2 gap-3">
        <Card 
          className={`cursor-pointer transition-all ${exportFormat === 'pdf' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
          onClick={() => setExportFormat('pdf')}
        >
          <CardContent className="p-4 text-center">
            <Icon name="FileText" size={32} className="mx-auto mb-2 text-red-600" />
            <div className="font-semibold">PDF</div>
            <div className="text-xs text-muted-foreground">Готов к печати</div>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all ${exportFormat === 'docx' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
          onClick={() => setExportFormat('docx')}
        >
          <CardContent className="p-4 text-center">
            <Icon name="FileEdit" size={32} className="mx-auto mb-2 text-blue-600" />
            <div className="font-semibold">Word</div>
            <div className="text-xs text-muted-foreground">Можно редактировать</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportFormatSelector;