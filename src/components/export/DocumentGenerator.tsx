interface DocumentGeneratorProps {
  template: any;
  formData: Record<string, string>;
  includeSignature: boolean;
  includeSeal: boolean;
  selectedSignature: any;
  selectedSeal: any;
}

export const generateDocumentContent = ({ 
  template, 
  formData, 
  includeSignature, 
  includeSeal, 
  selectedSignature, 
  selectedSeal 
}: DocumentGeneratorProps): string => {
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