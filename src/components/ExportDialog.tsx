import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import SignatureLibrary from '@/components/SignatureLibrary';
import ExportFormatSelector from '@/components/export/ExportFormatSelector';
import DocumentStyleSelector from '@/components/export/DocumentStyleSelector';
import SignatureSettings from '@/components/export/SignatureSettings';
import DocumentPreview from '@/components/export/DocumentPreview';
import { generateDocumentContent } from '@/components/export/DocumentGenerator';
import { exportToPDF, exportToWord } from '@/components/export/ExportHandlers';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  formData: Record<string, string>;
}

const ExportDialog = ({ isOpen, onClose, template, formData }: ExportDialogProps) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx'>('pdf');
  const [documentStyle, setDocumentStyle] = useState('standard');
  const [paperSize, setPaperSize] = useState('A4');
  const [isExporting, setIsExporting] = useState(false);
  const [includeSignature, setIncludeSignature] = useState(false);
  const [includeSeal, setIncludeSeal] = useState(false);
  const [selectedSignatureTemplate, setSelectedSignatureTemplate] = useState<string>('');
  const [selectedSignature, setSelectedSignature] = useState<any>(null);
  const [selectedSeal, setSelectedSeal] = useState<any>(null);
  const [isSignatureLibraryOpen, setIsSignatureLibraryOpen] = useState(false);

  const documentContent = generateDocumentContent({
    template,
    formData,
    includeSignature,
    includeSeal,
    selectedSignature,
    selectedSeal
  });

  const exportConfig = {
    documentStyle,
    paperSize,
    template
  };

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      exportToPDF(documentContent, exportConfig, setIsExporting);
    } else {
      exportToWord(documentContent, exportConfig, setIsExporting);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="Download" size={20} className="text-primary" />
            <span>Экспорт документа: {template?.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Настройки экспорта */}
          <div className="space-y-6">
            <ExportFormatSelector
              exportFormat={exportFormat}
              setExportFormat={setExportFormat}
            />

            <Separator />

            <DocumentStyleSelector
              documentStyle={documentStyle}
              setDocumentStyle={setDocumentStyle}
            />

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Размер страницы</h3>
              <Select value={paperSize} onValueChange={setPaperSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4 (210 × 297 мм)</SelectItem>
                  <SelectItem value="A3">A3 (297 × 420 мм)</SelectItem>
                  <SelectItem value="Letter">Letter (216 × 279 мм)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <SignatureSettings
              includeSignature={includeSignature}
              setIncludeSignature={setIncludeSignature}
              includeSeal={includeSeal}
              setIncludeSeal={setIncludeSeal}
              selectedSignatureTemplate={selectedSignatureTemplate}
              setSelectedSignatureTemplate={setSelectedSignatureTemplate}
              selectedSignature={selectedSignature}
              selectedSeal={selectedSeal}
              setIsSignatureLibraryOpen={setIsSignatureLibraryOpen}
            />
          </div>

          {/* Предварительный просмотр */}
          <DocumentPreview content={documentContent} />
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Отменить
          </Button>
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            className="bg-primary hover:bg-primary/90"
          >
            {isExporting ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Экспортируем...
              </>
            ) : (
              <>
                <Icon name="Download" size={16} className="mr-2" />
                Скачать {exportFormat === 'pdf' ? 'PDF' : 'Word'}
              </>
            )}
          </Button>
        </div>

        {/* Библиотека подписей и печатей */}
        <SignatureLibrary
          isOpen={isSignatureLibraryOpen}
          onClose={() => setIsSignatureLibraryOpen(false)}
          onSelectSignature={(signature) => {
            setSelectedSignature(signature);
            setIncludeSignature(true);
          }}
          onSelectSeal={(seal) => {
            setSelectedSeal(seal);
            setIncludeSeal(true);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;