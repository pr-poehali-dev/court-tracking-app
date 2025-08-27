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
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Document {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'completed' | 'sent' | 'archived';
  createdAt: string;
  modifiedAt: string;
  size: string;
  version: number;
  tags: string[];
  client?: string;
  description?: string;
}

interface DocumentHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentHistory: React.FC<DocumentHistoryProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Договор аренды офисного помещения',
      type: 'Договор аренды',
      status: 'completed',
      createdAt: '2024-08-20',
      modifiedAt: '2024-08-25',
      size: '248 КБ',
      version: 3,
      tags: ['недвижимость', 'аренда'],
      client: 'ООО "Альфа"',
      description: 'Договор аренды офиса на Тверской, 120 кв.м'
    },
    {
      id: '2',
      title: 'Исковое заявление о взыскании долга',
      type: 'Исковое заявление',
      status: 'sent',
      createdAt: '2024-08-18',
      modifiedAt: '2024-08-22',
      size: '156 КБ',
      version: 2,
      tags: ['взыскание', 'долг'],
      client: 'Иванов И.И.',
      description: 'Взыскание задолженности 450,000 руб.'
    },
    {
      id: '3',
      title: 'Трудовой договор с менеджером',
      type: 'Трудовой договор',
      status: 'draft',
      createdAt: '2024-08-26',
      modifiedAt: '2024-08-26',
      size: '89 КБ',
      version: 1,
      tags: ['трудовое право', 'найм'],
      client: 'ИП Петров',
      description: 'Договор с менеджером по продажам'
    },
    {
      id: '4',
      title: 'Устав ООО "Новые технологии"',
      type: 'Учредительный документ',
      status: 'completed',
      createdAt: '2024-08-15',
      modifiedAt: '2024-08-20',
      size: '312 КБ',
      version: 4,
      tags: ['регистрация', 'устав'],
      client: 'ООО "Новые технологии"',
      description: 'Устав для регистрации в ЕГРЮЛ'
    },
    {
      id: '5',
      title: 'Договор поставки товаров',
      type: 'Договор поставки',
      status: 'archived',
      createdAt: '2024-07-10',
      modifiedAt: '2024-07-15',
      size: '198 КБ',
      version: 2,
      tags: ['поставка', 'товары'],
      client: 'ООО "Торговый дом"',
      description: 'Поставка канцтоваров на сумму 250,000 руб.'
    }
  ];

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'archived': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: Document['status']) => {
    switch (status) {
      case 'draft': return 'Черновик';
      case 'completed': return 'Готов';
      case 'sent': return 'Отправлен';
      case 'archived': return 'Архив';
      default: return status;
    }
  };

  const filteredDocuments = mockDocuments
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || doc.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'date':
          compareValue = new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime();
          break;
        case 'title':
          compareValue = a.title.localeCompare(b.title);
          break;
        case 'type':
          compareValue = a.type.localeCompare(b.type);
          break;
        case 'client':
          compareValue = (a.client || '').localeCompare(b.client || '');
          break;
        default:
          compareValue = 0;
      }
      
      return sortOrder === 'desc' ? -compareValue : compareValue;
    });

  const documentTypes = Array.from(new Set(mockDocuments.map(doc => doc.type)));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="History" size={24} />
            История документов
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Фильтры и поиск */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Поиск по названию, клиенту, описанию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Тип документа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                {documentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="draft">Черновик</SelectItem>
                <SelectItem value="completed">Готов</SelectItem>
                <SelectItem value="sent">Отправлен</SelectItem>
                <SelectItem value="archived">Архив</SelectItem>
              </SelectContent>
            </Select>

            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
              const [newSortBy, newSortOrder] = value.split('-');
              setSortBy(newSortBy);
              setSortOrder(newSortOrder as 'asc' | 'desc');
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Дата (новые)</SelectItem>
                <SelectItem value="date-asc">Дата (старые)</SelectItem>
                <SelectItem value="title-asc">Название (А-Я)</SelectItem>
                <SelectItem value="title-desc">Название (Я-А)</SelectItem>
                <SelectItem value="type-asc">Тип (А-Я)</SelectItem>
                <SelectItem value="client-asc">Клиент (А-Я)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Статистика */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Найдено документов: {filteredDocuments.length}</span>
            <div className="flex gap-4">
              <span>Черновиков: {mockDocuments.filter(d => d.status === 'draft').length}</span>
              <span>Готовых: {mockDocuments.filter(d => d.status === 'completed').length}</span>
              <span>Отправленных: {mockDocuments.filter(d => d.status === 'sent').length}</span>
            </div>
          </div>

          {/* Список документов */}
          <div className="max-h-[500px] overflow-y-auto space-y-3">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="FileX" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Документы не найдены</p>
                <p className="text-sm">Попробуйте изменить фильтры или поисковый запрос</p>
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-lg">{doc.title}</h4>
                          <Badge className={getStatusColor(doc.status)}>
                            {getStatusLabel(doc.status)}
                          </Badge>
                          <Badge variant="outline">v.{doc.version}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Тип:</span> {doc.type}
                          </div>
                          <div>
                            <span className="font-medium">Клиент:</span> {doc.client || 'Не указан'}
                          </div>
                          <div>
                            <span className="font-medium">Изменён:</span> {new Date(doc.modifiedAt).toLocaleDateString('ru-RU')}
                          </div>
                          <div>
                            <span className="font-medium">Размер:</span> {doc.size}
                          </div>
                        </div>

                        {doc.description && (
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        )}

                        {doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={16} className="mr-1" />
                          Открыть
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Download" size={16} className="mr-1" />
                          Скачать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Copy" size={16} className="mr-1" />
                          Копировать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Действия */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Archive" size={16} className="mr-2" />
                Архивировать выбранные
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить выбранные
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Upload" size={16} className="mr-2" />
                Экспорт списка
              </Button>
              <Button onClick={onClose}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentHistory;