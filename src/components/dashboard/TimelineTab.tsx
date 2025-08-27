import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import TimelineItem from './timeline/TimelineItem';
import AddEventDialog from './timeline/AddEventDialog';
import TimelineFilters from './timeline/TimelineFilters';
import { CaseEvent } from './timeline/types';
import { groupEventsByDate, generateNotificationContent } from './timeline/utils';

const TimelineTab = () => {
  const [events, setEvents] = useState<CaseEvent[]>([
    {
      id: '1',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      type: 'document',
      title: 'Исковое заявление подготовлено',
      description: 'Подготовлен пакет документов для подачи иска о признании права собственности. Проведена проверка всех правоустанавливающих документов.',
      status: 'completed',
      priority: 'high',
      timestamp: '2024-08-27T10:30:00',
      participants: [
        { id: '1', name: 'Анна Петрова', role: 'lawyer', isRequired: true, participation: 'confirmed', email: 'anna@law.com' },
        { id: '2', name: 'Иван Петров', role: 'client', isRequired: true, participation: 'confirmed' }
      ],
      location: {
        type: 'office',
        name: 'Юридическая компания "Правовед"',
        address: 'г. Москва, ул. Тверская, д. 15, оф. 201'
      },
      result: {
        outcome: 'positive',
        summary: 'Документы подготовлены в полном объёме, готовы к подаче в суд',
        nextActions: [
          { id: '1', title: 'Подать документы в суд', assignedTo: 'Анна Петрова', deadline: '2024-08-28T17:00:00', priority: 'high', status: 'pending', description: 'Подача искового заявления в Арбитражный суд' }
        ],
        duration: 120
      },
      notifications: [
        { id: '1', type: 'push', recipient: 'client', recipientType: 'client', template: 'document_ready', status: 'delivered', sentAt: '2024-08-27T10:35:00' },
        { id: '2', type: 'email', recipient: 'team', recipientType: 'all_team', template: 'team_notification', status: 'sent', sentAt: '2024-08-27T10:35:00' }
      ],
      tags: ['документы', 'готово', 'срочно'],
      createdBy: 'Анна Петрова'
    },
    {
      id: '2',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      type: 'filing',
      title: 'Дело загружено в суд',
      description: 'Исковое заявление и пакет документов поданы в Арбитражный суд города Москвы. Получен входящий номер дела А40-123456/24.',
      status: 'completed',
      priority: 'high',
      timestamp: '2024-08-26T14:15:00',
      participants: [
        { id: '1', name: 'Анна Петрова', role: 'lawyer', isRequired: true, participation: 'attended' },
        { id: '3', name: 'Иванова М.С.', role: 'clerk', isRequired: false, participation: 'attended' }
      ],
      location: {
        type: 'court',
        name: 'Арбитражный суд города Москвы',
        address: 'г. Москва, ул. Большая Тульская, д. 17',
        room: 'Канцелярия, окно №3'
      },
      result: {
        outcome: 'positive',
        summary: 'Документы приняты к рассмотрению, присвоен номер дела А40-123456/24',
        decisions: ['Назначено предварительное судебное заседание на 15.09.2024'],
        nextActions: [
          { id: '1', title: 'Подготовиться к предварительному заседанию', assignedTo: 'Анна Петрова', deadline: '2024-09-10T12:00:00', priority: 'medium', status: 'pending', description: 'Подготовка к предварительному судебному заседанию' }
        ],
        costs: 3000,
        duration: 45
      },
      notifications: [
        { id: '1', type: 'push', recipient: 'client', recipientType: 'client', template: 'court_notification', status: 'delivered', sentAt: '2024-08-26T14:20:00' },
        { id: '2', type: 'sms', recipient: 'client', recipientType: 'client', template: 'court_notification', status: 'delivered', sentAt: '2024-08-26T14:20:00' }
      ],
      tags: ['суд', 'подача', 'дело'],
      createdBy: 'Анна Петрова'
    },
    {
      id: '3',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      clientName: 'Мария Сидорова',
      type: 'call',
      title: 'Звонок в налоговую состоялся',
      description: 'Проведены телефонные переговоры с налоговой инспекцией по вопросу уточнения статуса документов ООО "Строй-Инвест".',
      status: 'completed',
      priority: 'medium',
      timestamp: '2024-08-25T16:45:00',
      participants: [
        { id: '2', name: 'Михаил Соколов', role: 'lawyer', isRequired: true, participation: 'attended' },
        { id: '4', name: 'Степанова Н.И.', role: 'other', isRequired: false, participation: 'attended', notes: 'Инспектор налоговой службы' }
      ],
      location: {
        type: 'online',
        name: 'Телефонная консультация',
        url: 'tel:+74951234567'
      },
      result: {
        outcome: 'positive',
        summary: 'Получены разъяснения по документообороту, статус документов подтверждён',
        decisions: ['Документы соответствуют требованиям', 'Дополнительных справок не требуется'],
        duration: 25
      },
      notifications: [
        { id: '1', type: 'email', recipient: 'client', recipientType: 'client', template: 'client_update', status: 'delivered', sentAt: '2024-08-25T17:00:00' }
      ],
      tags: ['звонок', 'налоговая', 'консультация'],
      createdBy: 'Михаил Соколов'
    },
    {
      id: '4',
      caseId: '3',
      caseName: 'Семейный спор Коваленко',
      clientName: 'Алексей Коваленко',
      type: 'review',
      title: 'Ознакомление с материалами дела выполнено',
      description: 'Проведено детальное изучение материалов семейного дела, анализ документов и доказательной базы.',
      status: 'completed',
      priority: 'medium',
      timestamp: '2024-08-24T11:20:00',
      participants: [
        { id: '3', name: 'Елена Краснова', role: 'lawyer', isRequired: true, participation: 'attended' }
      ],
      location: {
        type: 'office',
        name: 'Рабочий кабинет',
        address: 'г. Москва, ул. Тверская, д. 15, оф. 205'
      },
      result: {
        outcome: 'neutral',
        summary: 'Выявлены ключевые моменты дела, определена стратегия защиты',
        nextActions: [
          { id: '1', title: 'Подготовить отзыв на иск', assignedTo: 'Елена Краснова', deadline: '2024-08-30T18:00:00', priority: 'high', status: 'in_progress', description: 'Составление отзыва на исковое заявление' }
        ],
        duration: 180
      },
      notifications: [
        { id: '1', type: 'push', recipient: 'client', recipientType: 'client', template: 'client_update', status: 'delivered', sentAt: '2024-08-24T11:30:00' }
      ],
      tags: ['изучение', 'материалы', 'анализ'],
      createdBy: 'Елена Краснова'
    },
    {
      id: '5',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      clientName: 'Мария Сидорова',
      type: 'court',
      title: 'Судебное заседание состоялось',
      description: 'Проведено судебное заседание по делу №А40-234567/24 в Арбитражном суде города Москвы по спору о взыскании задолженности.',
      status: 'completed',
      priority: 'critical',
      timestamp: '2024-08-23T10:00:00',
      participants: [
        { id: '2', name: 'Михаил Соколов', role: 'lawyer', isRequired: true, participation: 'attended' },
        { id: '5', name: 'Мария Сидорова', role: 'client', isRequired: true, participation: 'attended' },
        { id: '6', name: 'Судья Петров А.В.', role: 'judge', isRequired: true, participation: 'attended' },
        { id: '7', name: 'Представитель ответчика', role: 'opponent', isRequired: false, participation: 'attended' }
      ],
      location: {
        type: 'court',
        name: 'Арбитражный суд города Москвы',
        address: 'г. Москва, ул. Большая Тульская, д. 17',
        room: 'Зал судебных заседаний №15'
      },
      result: {
        outcome: 'positive',
        summary: 'Суд принял решение в пользу истца, взыскать задолженность в размере 850 000 рублей',
        decisions: [
          'Взыскать с ответчика основной долг 800 000 руб.',
          'Взыскать проценты за пользование чужими денежными средствами 35 000 руб.',
          'Взыскать судебные расходы 15 000 руб.'
        ],
        nextActions: [
          { id: '1', title: 'Получить исполнительный лист', assignedTo: 'Михаил Соколов', deadline: '2024-09-05T17:00:00', priority: 'high', status: 'pending', description: 'Получение исполнительного листа после вступления решения в силу' }
        ],
        costs: 15000,
        duration: 120
      },
      notifications: [
        { id: '1', type: 'push', recipient: 'client', recipientType: 'client', template: 'court_notification', status: 'delivered', sentAt: '2024-08-23T12:30:00' },
        { id: '2', type: 'email', recipient: 'client', recipientType: 'client', template: 'court_notification', status: 'delivered', sentAt: '2024-08-23T12:30:00' },
        { id: '3', type: 'sms', recipient: 'client', recipientType: 'client', template: 'court_notification', status: 'delivered', sentAt: '2024-08-23T12:30:00' }
      ],
      tags: ['суд', 'заседание', 'решение', 'победа'],
      createdBy: 'Михаил Соколов'
    }
  ]);

  // Фильтры
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Диалоги
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CaseEvent | null>(null);

  const [newEvent, setNewEvent] = useState<Partial<CaseEvent>>({
    status: 'completed',
    priority: 'medium',
    type: 'other'
  });

  const availableCases = [
    { id: '1', name: 'Покупка квартиры на Арбате', client: 'Иван Петров' },
    { id: '2', name: 'Корпоративные договоры ООО "Строй-Инвест"', client: 'Мария Сидорова' },
    { id: '3', name: 'Семейный спор Коваленко', client: 'Алексей Коваленко' }
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.caseName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCase = selectedCase === 'all' || event.caseId === selectedCase;
      const matchesType = selectedType === 'all' || event.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || event.priority === selectedPriority;
      
      let matchesDate = true;
      if (dateRange !== 'all') {
        const eventDate = new Date(event.timestamp);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch (dateRange) {
          case 'today':
            matchesDate = eventDate >= today;
            break;
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            matchesDate = eventDate >= yesterday && eventDate < today;
            break;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            matchesDate = eventDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            matchesDate = eventDate >= monthAgo;
            break;
        }
      }
      
      return matchesSearch && matchesCase && matchesType && matchesStatus && matchesPriority && matchesDate;
    });
  }, [events, searchTerm, selectedCase, selectedType, selectedStatus, selectedPriority, dateRange]);

  const groupedEvents = useMemo(() => {
    return groupEventsByDate(filteredEvents);
  }, [filteredEvents]);

  const activeFiltersCount = [selectedCase, selectedType, selectedStatus, selectedPriority, dateRange]
    .filter(filter => filter !== 'all').length + (searchTerm ? 1 : 0);

  const handleAddEvent = () => {
    if (newEvent.caseId && newEvent.type && newEvent.title && newEvent.description) {
      const event: CaseEvent = {
        id: Date.now().toString(),
        caseId: newEvent.caseId,
        caseName: newEvent.caseName || '',
        clientName: newEvent.clientName || '',
        type: newEvent.type,
        title: newEvent.title,
        description: newEvent.description,
        status: newEvent.status as CaseEvent['status'] || 'completed',
        priority: newEvent.priority as CaseEvent['priority'] || 'medium',
        timestamp: newEvent.timestamp || new Date().toISOString(),
        participants: [],
        location: newEvent.location,
        tags: newEvent.tags || [],
        createdBy: 'Текущий пользователь'
      };
      
      setEvents(prev => [event, ...prev]);
      setNewEvent({ status: 'completed', priority: 'medium', type: 'other' });
      setIsAddEventDialogOpen(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCase('all');
    setSelectedType('all');
    setSelectedStatus('all');
    setSelectedPriority('all');
    setDateRange('all');
  };

  const handleViewDetails = (event: CaseEvent) => {
    setSelectedEvent(event);
    // Открыть модальное окно с деталями
    console.log('Просмотр деталей события:', event);
  };

  const handleEditEvent = (event: CaseEvent) => {
    // Открыть форму редактирования
    console.log('Редактирование события:', event);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Хронология событий</h2>
          <p className="text-muted-foreground">
            Временная шкала всех событий по делам с уведомлениями клиентов
          </p>
        </div>
        <AddEventDialog
          isOpen={isAddEventDialogOpen}
          onOpenChange={setIsAddEventDialogOpen}
          newEvent={newEvent}
          onEventChange={setNewEvent}
          onAddEvent={handleAddEvent}
          availableCases={availableCases}
        />
      </div>

      <TimelineFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCase={selectedCase}
        onCaseChange={setSelectedCase}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        availableCases={availableCases}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={handleClearFilters}
      />

      <div className="relative">
        {groupedEvents.length > 0 ? (
          <div className="space-y-8">
            {groupedEvents.map(({ date, events: dayEvents }) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-lg font-semibold">
                    {new Date(date).toLocaleDateString('ru-RU', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                  <div className="text-sm text-muted-foreground">
                    {dayEvents.length} {dayEvents.length === 1 ? 'событие' : 'события'}
                  </div>
                </div>
                
                <div className="space-y-0">
                  {dayEvents.map((event, index) => (
                    <TimelineItem
                      key={event.id}
                      event={event}
                      isFirst={index === 0}
                      isLast={index === dayEvents.length - 1}
                      onViewDetails={handleViewDetails}
                      onEditEvent={handleEditEvent}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Icon name="GitBranch" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">События не найдены</h3>
              <p className="text-muted-foreground mb-4">
                {activeFiltersCount > 0 
                  ? 'Попробуйте изменить параметры фильтров'
                  : 'Добавьте первое событие, чтобы начать отслеживание'
                }
              </p>
              {activeFiltersCount > 0 ? (
                <button 
                  onClick={handleClearFilters}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Очистить фильтры
                </button>
              ) : (
                <AddEventDialog
                  isOpen={isAddEventDialogOpen}
                  onOpenChange={setIsAddEventDialogOpen}
                  newEvent={newEvent}
                  onEventChange={setNewEvent}
                  onAddEvent={handleAddEvent}
                  availableCases={availableCases}
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TimelineTab;