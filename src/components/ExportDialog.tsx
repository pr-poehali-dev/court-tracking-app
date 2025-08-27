import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import SignatureLibrary from '@/components/SignatureLibrary';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

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

  // Генерация содержимого документа
  const generateDocumentContent = () => {
    if (!template) return '';

    let content = '';
    
    // Заголовок документа
    content += `${template.title.toUpperCase()}\n\n`;

    // Основные поля документа в зависимости от типа
    switch (template.id) {
      case 1: // Исковое заявление
        content += `В ${formData.courtName || '[НАИМЕНОВАНИЕ СУДА]'}\n\n`;
        content += `От: ${formData.plaintiffName || '[ФИО ИСТЦА]'}\n`;
        content += `Адрес: ${formData.plaintiffAddress || '[АДРЕС ИСТЦА]'}\n\n`;
        content += `К: ${formData.defendantName || '[ФИО ОТВЕТЧИКА]'}\n`;
        content += `Адрес: ${formData.defendantAddress || '[АДРЕС ОТВЕТЧИКА]'}\n\n`;
        content += `ИСКОВОЕ ЗАЯВЛЕНИЕ\n`;
        content += `о ${formData.claimSubject || '[ПРЕДМЕТ ИСКА]'}\n\n`;
        
        if (formData.claimAmount) {
          content += `Цена иска: ${formData.claimAmount} рублей\n\n`;
        }
        
        content += `ОБСТОЯТЕЛЬСТВА ДЕЛА:\n`;
        content += `${formData.circumstances || '[ОБСТОЯТЕЛЬСТВА ДЕЛА]'}\n\n`;
        content += `На основании изложенного, руководствуясь статьями 131-132 ГПК РФ,\n\n`;
        content += `ПРОШУ:\n`;
        content += `${formData.requirements || '[ИСКОВЫЕ ТРЕБОВАНИЯ]'}\n\n`;
        content += `Приложения:\n`;
        content += `1. Копия искового заявления\n`;
        content += `2. Документы, подтверждающие обстоятельства дела\n`;
        content += `3. Квитанция об уплате госпошлины\n\n`;
        content += `Дата: ${new Date().toLocaleDateString('ru-RU')}\n`;
        content += `Подпись: ________________`;
        break;

      case 2: // Возражение на иск
        content += `В ${formData.courtName || '[НАИМЕНОВАНИЕ СУДА]'}\n\n`;
        content += `По делу № ${formData.caseNumber || '[НОМЕР ДЕЛА]'}\n\n`;
        content += `От: ${formData.defendantName || '[ФИО ОТВЕТЧИКА]'}\n\n`;
        content += `ВОЗРАЖЕНИЕ НА ИСКОВОЕ ЗАЯВЛЕНИЕ\n`;
        content += `${formData.plaintiffName || '[ФИО ИСТЦА]'}\n\n`;
        content += `ВОЗРАЖЕНИЯ:\n`;
        content += `${formData.objections || '[ВОЗРАЖЕНИЯ ПО СУЩЕСТВУ]'}\n\n`;
        
        if (formData.evidence) {
          content += `ДОКАЗАТЕЛЬСТВА:\n`;
          content += `${formData.evidence}\n\n`;
        }
        
        content += `На основании изложенного прошу суд отказать в удовлетворении исковых требований полностью.\n\n`;
        content += `Дата: ${new Date().toLocaleDateString('ru-RU')}\n`;
        content += `Подпись: ________________`;
        break;

      case 5: // Договор подряда
        content += `ДОГОВОР ПОДРЯДА № ___\n\n`;
        content += `г. _______, ${new Date().toLocaleDateString('ru-RU')}\n\n`;
        content += `${formData.customerName || '[НАИМЕНОВАНИЕ ЗАКАЗЧИКА]'}, именуемое в дальнейшем "Заказчик", `;
        content += `в лице ________________, действующего на основании ________________, `;
        content += `с одной стороны, и ${formData.contractorName || '[НАИМЕНОВАНИЕ ПОДРЯДЧИКА]'}, `;
        content += `именуемое в дальнейшем "Подрядчик", в лице ________________, `;
        content += `действующего на основании ________________, с другой стороны, `;
        content += `заключили настоящий договор о нижеследующем:\n\n`;
        
        content += `1. ПРЕДМЕТ ДОГОВОРА\n`;
        content += `1.1. Подрядчик обязуется выполнить следующие работы:\n`;
        content += `${formData.workDescription || '[ОПИСАНИЕ РАБОТ]'}\n\n`;
        
        content += `2. ЦЕНА ДОГОВОРА И ПОРЯДОК РАСЧЕТОВ\n`;
        content += `2.1. Цена договора составляет ${formData.contractPrice || '[ЦЕНА ДОГОВОРА]'} рублей.\n`;
        content += `2.2. Порядок расчетов:\n${formData.paymentTerms || '[УСЛОВИЯ ОПЛАТЫ]'}\n\n`;
        
        content += `3. СРОКИ ВЫПОЛНЕНИЯ РАБОТ\n`;
        content += `3.1. Срок выполнения работ: до ${formData.deadline || '[СРОК ВЫПОЛНЕНИЯ]'}\n\n`;
        
        content += `4. ПРАВА И ОБЯЗАННОСТИ СТОРОН\n`;
        content += `4.1. Подрядчик обязан выполнить работы в соответствии с техническим заданием.\n`;
        content += `4.2. Заказчик обязан принять и оплатить выполненные работы.\n\n`;
        
        content += `5. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ\n`;
        content += `5.1. Настоящий договор вступает в силу с момента подписания.\n\n`;
        
        content += `РЕКВИЗИТЫ И ПОДПИСИ СТОРОН:\n\n`;
        content += `ЗАКАЗЧИК:\n`;
        content += `${formData.customerName || '[НАИМЕНОВАНИЕ ЗАКАЗЧИКА]'}\n`;
        content += `Адрес: ${formData.customerAddress || '[АДРЕС ЗАКАЗЧИКА]'}\n`;
        content += `Подпись: ________________\n\n`;
        content += `ПОДРЯДЧИК:\n`;
        content += `${formData.contractorName || '[НАИМЕНОВАНИЕ ПОДРЯДЧИКА]'}\n`;
        content += `Адрес: ${formData.contractorAddress || '[АДРЕС ПОДРЯДЧИКА]'}\n`;
        content += `Подпись: ________________`;
        break;

      default:
        // Универсальный формат для других документов
        content += `${template.description}\n\n`;
        template.fields.forEach((field: any) => {
          const value = formData[field.name] || `[${field.label.toUpperCase()}]`;
          content += `${field.label}: ${value}\n`;
        });
        content += `\nДата: ${new Date().toLocaleDateString('ru-RU')}\n`;
        
        // Добавляем место для подписи и печати
        if (includeSignature && selectedSignature) {
          content += `\n${selectedSignature.position}: ________________ ${selectedSignature.name}`;
        } else {
          content += `Подпись: ________________`;
        }
        
        if (includeSeal && selectedSeal) {
          content += `\n\nМ.П. (${selectedSeal.name})`;
        }
    }

    return content;
  };

  // Экспорт в PDF
  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: paperSize.toLowerCase()
      });

      const content = generateDocumentContent();
      const lines = content.split('\n');
      
      // Настройки стилей
      let fontSize = 12;
      let lineHeight = 6;
      
      switch (documentStyle) {
        case 'modern':
          fontSize = 11;
          lineHeight = 5.5;
          break;
        case 'compact':
          fontSize = 10;
          lineHeight = 5;
          break;
      }

      pdf.setFontSize(fontSize);
      
      let yPosition = 20;
      const pageHeight = pdf.internal.pageSize.height;
      const marginBottom = 20;

      lines.forEach((line, index) => {
        // Проверка на новую страницу
        if (yPosition > pageHeight - marginBottom) {
          pdf.addPage();
          yPosition = 20;
        }

        // Заголовки выделяем жирным
        if (line.includes('ЗАЯВЛЕНИЕ') || line.includes('ДОГОВОР') || line.includes('ВОЗРАЖЕНИЕ')) {
          pdf.setFont(undefined, 'bold');
          pdf.text(line, 20, yPosition);
          pdf.setFont(undefined, 'normal');
        } else {
          pdf.text(line, 20, yPosition);
        }
        
        yPosition += lineHeight;
      });

      // Сохранение файла
      const fileName = `${template.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Ошибка при экспорте в PDF:', error);
    }
    
    setIsExporting(false);
  };

  // Экспорт в Word
  const exportToWord = async () => {
    setIsExporting(true);
    
    try {
      const content = generateDocumentContent();
      const lines = content.split('\n');
      
      const paragraphs = lines.map(line => {
        if (line.includes('ЗАЯВЛЕНИЕ') || line.includes('ДОГОВОР') || line.includes('ВОЗРАЖЕНИЕ')) {
          return new Paragraph({
            children: [new TextRun({ text: line, bold: true })],
            heading: HeadingLevel.TITLE,
            spacing: { after: 200 }
          });
        } else if (line.trim() === '') {
          return new Paragraph({ children: [new TextRun('')] });
        } else {
          return new Paragraph({
            children: [new TextRun(line)],
            spacing: { after: 100 }
          });
        }
      });

      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs
        }]
      });

      const buffer = await Packer.toBlob(doc);
      const fileName = `${template.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
      saveAs(buffer, fileName);
      
    } catch (error) {
      console.error('Ошибка при экспорте в Word:', error);
    }
    
    setIsExporting(false);
  };

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      exportToPDF();
    } else {
      exportToWord();
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

            <Separator />

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
                          {selectedSignatureTemplate === 'standard-contract' && (
                            <div>
                              <div className="font-medium mb-1">Стандартный договор</div>
                              <div className="text-muted-foreground">Подпись в правом нижнем углу, печать слева от подписи</div>
                            </div>
                          )}
                          {selectedSignatureTemplate === 'legal-statement' && (
                            <div>
                              <div className="font-medium mb-1">Исковое заявление</div>
                              <div className="text-muted-foreground">Подпись заявителя в конце документа справа</div>
                            </div>
                          )}
                          {selectedSignatureTemplate === 'employment-contract' && (
                            <div>
                              <div className="font-medium mb-1">Трудовой договор</div>
                              <div className="text-muted-foreground">Подписи сторон и печать HR-отдела</div>
                            </div>
                          )}
                          {selectedSignatureTemplate === 'auto' && (
                            <div>
                              <div className="font-medium mb-1">Автоматическое размещение</div>
                              <div className="text-muted-foreground">Система автоматически определит оптимальное расположение</div>
                            </div>
                          )}
                          {selectedSignatureTemplate === 'custom' && (
                            <div>
                              <div className="font-medium mb-1">Пользовательское размещение</div>
                              <div className="text-muted-foreground">Вы сможете вручную указать позиции после экспорта</div>
                            </div>
                          )}
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
          </div>

          {/* Предварительный просмотр */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Предварительный просмотр</h3>
            <Card>
              <CardContent className="p-4">
                <div className="bg-white border rounded-lg shadow-sm p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {generateDocumentContent()}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
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