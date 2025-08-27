import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'potential';
  type: 'individual' | 'corporate';
  notes?: string;
  cases: number;
  lastContact: string;
}

const ClientsTab = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan.petrov@email.com',
      phone: '+7 (495) 123-45-67',
      status: 'active',
      type: 'individual',
      notes: 'Постоянный клиент, дела по недвижимости',
      cases: 3,
      lastContact: '2024-08-15'
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      email: 'maria.sidorova@company.ru',
      phone: '+7 (495) 987-65-43',
      company: 'ООО "Строй-Инвест"',
      status: 'active',
      type: 'corporate',
      notes: 'Корпоративный клиент, договоры аренды',
      cases: 7,
      lastContact: '2024-08-20'
    },
    {
      id: '3',
      name: 'Алексей Коваленко',
      email: 'alex.kovalenko@email.com',
      phone: '+7 (495) 555-11-22',
      status: 'potential',
      type: 'individual',
      notes: 'Потенциальный клиент, первичная консультация',
      cases: 0,
      lastContact: '2024-08-25'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    status: 'potential',
    type: 'individual'
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesType = filterType === 'all' || client.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeVariant = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'potential': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'inactive': return 'Неактивный';
      case 'potential': return 'Потенциальный';
      default: return status;
    }
  };

  const getTypeLabel = (type: Client['type']) => {
    return type === 'individual' ? 'Физ. лицо' : 'Юр. лицо';
  };

  const handleAddClient = () => {
    if (newClient.name && newClient.email && newClient.phone) {
      const client: Client = {
        id: Date.now().toString(),
        name: newClient.name,
        email: newClient.email,
        phone: newClient.phone,
        company: newClient.company,
        status: newClient.status as Client['status'] || 'potential',
        type: newClient.type as Client['type'] || 'individual',
        notes: newClient.notes,
        cases: 0,
        lastContact: new Date().toISOString().split('T')[0]
      };
      
      setClients(prev => [...prev, client]);
      setNewClient({ status: 'potential', type: 'individual' });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Клиенты</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить клиента
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Новый клиент</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  value={newClient.name || ''}
                  onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Введите имя клиента"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email || ''}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={newClient.phone || ''}
                  onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (495) 123-45-67"
                />
              </div>
              <div>
                <Label htmlFor="company">Компания</Label>
                <Input
                  id="company"
                  value={newClient.company || ''}
                  onChange={(e) => setNewClient(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Название компании (для юр. лиц)"
                />
              </div>
              <div>
                <Label htmlFor="type">Тип клиента</Label>
                <Select value={newClient.type} onValueChange={(value) => setNewClient(prev => ({ ...prev, type: value as Client['type'] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Физическое лицо</SelectItem>
                    <SelectItem value="corporate">Юридическое лицо</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Статус</Label>
                <Select value={newClient.status} onValueChange={(value) => setNewClient(prev => ({ ...prev, status: value as Client['status'] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="potential">Потенциальный</SelectItem>
                    <SelectItem value="active">Активный</SelectItem>
                    <SelectItem value="inactive">Неактивный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Заметки</Label>
                <Textarea
                  id="notes"
                  value={newClient.notes || ''}
                  onChange={(e) => setNewClient(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Дополнительная информация о клиенте"
                />
              </div>
              <Button onClick={handleAddClient} className="w-full">
                Добавить клиента
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Поиск по имени, email или компании..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="inactive">Неактивные</SelectItem>
            <SelectItem value="potential">Потенциальные</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue placeholder="Тип" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="individual">Физ. лица</SelectItem>
            <SelectItem value="corporate">Юр. лица</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={20} />
                    {client.name}
                    <Badge variant={getStatusBadgeVariant(client.status)}>
                      {getStatusLabel(client.status)}
                    </Badge>
                    <Badge variant="outline">
                      {getTypeLabel(client.type)}
                    </Badge>
                  </CardTitle>
                  {client.company && (
                    <p className="text-muted-foreground mt-1">{client.company}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={14} className="mr-1" />
                    Изменить
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="FileText" size={14} className="mr-1" />
                    Дела ({client.cases})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Mail" size={14} />
                    <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={14} />
                    <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">
                      {client.phone}
                    </a>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Calendar" size={14} />
                    <span className="text-muted-foreground">
                      Последний контакт: {new Date(client.lastContact).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={14} />
                    <span className="text-muted-foreground">
                      Активных дел: {client.cases}
                    </span>
                  </div>
                </div>
                <div>
                  {client.notes && (
                    <div className="flex items-start gap-2">
                      <Icon name="FileText" size={14} className="mt-0.5" />
                      <p className="text-muted-foreground text-xs line-clamp-3">
                        {client.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Клиенты не найдены</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                ? 'Попробуйте изменить параметры поиска'
                : 'Добавьте первого клиента, чтобы начать работу'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && filterType === 'all' && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить клиента
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientsTab;