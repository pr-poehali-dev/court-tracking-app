import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

interface ExportConfig {
  documentStyle: string;
  paperSize: string;
  template: any;
}

export const exportToPDF = async (
  content: string, 
  config: ExportConfig,
  setIsExporting: (loading: boolean) => void
) => {
  setIsExporting(true);
  
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: config.paperSize.toLowerCase()
    });

    const lines = content.split('\n');
    
    // Настройки стилей
    let fontSize = 12;
    let lineHeight = 6;
    
    switch (config.documentStyle) {
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

    lines.forEach((line) => {
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
    const fileName = `${config.template.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Ошибка при экспорте в PDF:', error);
  }
  
  setIsExporting(false);
};

export const exportToWord = async (
  content: string,
  config: ExportConfig,
  setIsExporting: (loading: boolean) => void
) => {
  setIsExporting(true);
  
  try {
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
    const fileName = `${config.template.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
    saveAs(buffer, fileName);
    
  } catch (error) {
    console.error('Ошибка при экспорте в Word:', error);
  }
  
  setIsExporting(false);
};