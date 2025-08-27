import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const DocumentsTab: React.FC = () => {
  const documents = [
    { name: 'Исковое заявление.pdf', case: 'Дело № 2-1234/2024', date: '15.08.2024', size: '2.1 MB' },
    { name: 'Возражение ответчика.docx', case: 'Дело № 2-1234/2024', date: '20.08.2024', size: '1.8 MB' },
    { name: 'Определение суда.pdf', case: 'Дело № 2-5678/2024', date: '25.08.2024', size: '856 KB' },
    { name: 'Протокол заседания.pdf', case: 'Дело № 2-9012/2024', date: '30.08.2024', size: '3.2 MB' }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Документы</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Upload" size={16} className="mr-2" />
          Загрузить документ
        </Button>
      </div>

      <div className="grid gap-4">
        {documents.map((doc, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{doc.name}</h4>
                  <p className="text-sm text-muted-foreground">{doc.case} • {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{doc.size}</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={14} className="mr-1" />
                    Скачать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Просмотр
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTab;