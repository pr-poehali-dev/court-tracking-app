import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import CreateTaskDialog from './tasks/CreateTaskDialog';
import TaskCard from './tasks/TaskCard';
import ScheduleView from './tasks/ScheduleView';
import { CaseTask, CaseSchedule, taskStatuses, taskPriorities, targetRoles } from './tasks/types';
import { CaseEvent } from './timeline/types';
import { sortTasksByPriority, generateTaskEvent, calculateScheduleProgress } from './tasks/utils';

const TasksTab = () => {
  // Данные задач
  const [tasks, setTasks] = useState<CaseTask[]>([
    {
      id: '1',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      title: 'Подготовить исковое заявление',
      description: 'Составить исковое заявление о признании права собственности на квартиру. Включить все необходимые документы и обоснования.',
      status: 'completed',
      priority: 'high',
      assignedTo: 'anna_petrova',
      assignedBy: 'mikhail_sokolov',
      assignedAt: '2024-08-20T09:00:00Z',
      targetRole: 'coordinator',
      dueDate: '2024-08-27T17:00:00Z',
      completedAt: '2024-08-27T10:30:00Z',
      estimatedHours: 4,
      actualHours: 3.5,
      progress: 100,
      result: {
        status: 'success',
        summary: 'Исковое заявление подготовлено в полном объёме, все документы проверены',
        deliverables: ['Исковое заявление', 'Пакет документов', 'Обоснование позиции'],
        timeSpent: 210
      },
      autoCreateEvent: true,
      timelineEventId: '1',
      tags: ['документы', 'исковое', 'срочно'],
      createdBy: 'mikhail_sokolov'
    },
    {
      id: '2',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      title: 'Подать документы в суд',
      description: 'Подать исковое заявление и пакет документов в Арбитражный суд города Москвы. Получить входящий номер дела.',
      status: 'completed',
      priority: 'high',
      assignedTo: 'anna_petrova',
      assignedBy: 'mikhail_sokolov',
      assignedAt: '2024-08-27T11:00:00Z',
      targetRole: 'litigator',
      startDate: '2024-08-28T09:00:00Z',
      dueDate: '2024-08-28T17:00:00Z',
      completedAt: '2024-08-26T14:15:00Z',
      estimatedHours: 2,
      actualHours: 1.5,
      progress: 100,
      dependencies: ['1'],
      result: {
        status: 'success',
        summary: 'Документы поданы успешно, получен номер дела А40-123456/24',
        deliverables: ['Номер дела', 'Уведомление о принятии'],
        nextSteps: ['Подготовиться к предварительному заседанию'],
        timeSpent: 90
      },
      autoCreateEvent: true,
      timelineEventId: '2',
      tags: ['суд', 'подача', 'документы'],
      createdBy: 'mikhail_sokolov'
    },
    {
      id: '3',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      clientName: 'Мария Сидорова',
      title: 'Подготовиться к судебному заседанию',
      description: 'Изучить материалы дела, подготовить выступление, собрать дополнительные доказательства для арбитражного заседания.',
      status: 'completed',
      priority: 'critical',
      assignedTo: 'mikhail_sokolov',
      assignedBy: 'mikhail_sokolov',
      assignedAt: '2024-08-20T14:00:00Z',
      targetRole: 'litigator',
      startDate: '2024-08-21T09:00:00Z',
      dueDate: '2024-08-23T09:00:00Z',
      completedAt: '2024-08-22T18:00:00Z',
      estimatedHours: 6,
      actualHours: 8,
      progress: 100,
      result: {
        status: 'success',
        summary: 'Подготовка завершена, все материалы изучены, позиция сформирована',
        deliverables: ['План выступления', 'Дополнительные доказательства', 'Правовая позиция'],
        timeSpent: 480
      },
      autoCreateEvent: true,
      timelineEventId: '5',
      tags: ['суд', 'подготовка', 'критично'],
      createdBy: 'mikhail_sokolov'
    },
    {
      id: '4',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      clientName: 'Мария Сидорова',
      title: 'Получить исполнительный лист',
      description: 'После вступления решения суда в силу получить исполнительный лист для принудительного взыскания.',
      status: 'pending',
      priority: 'high',
      assignedTo: 'elena_krasnova',
      assignedBy: 'mikhail_sokolov',
      assignedAt: '2024-08-23T15:00:00Z',
      targetRole: 'assistant',
      startDate: '2024-09-05T09:00:00Z',
      dueDate: '2024-09-10T17:00:00Z',
      estimatedHours: 1,
      progress: 0,
      autoCreateEvent: true,
      tags: ['исполнительный', 'лист', 'взыскание'],
      createdBy: 'mikhail_sokolov'
    },
    {
      id: '5',
      caseId: '3',
      caseName: 'Семейный спор Коваленко',
      clientName: 'Алексей Коваленко',
      title: 'Подготовить отзыв на иск',
      description: 'Составить отзыв на исковое заявление супруги, подготовить возражения и встречные требования.',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'elena_krasnova',
      assignedBy: 'mikhail_sokolov',
      assignedAt: '2024-08-24T16:00:00Z',
      targetRole: 'coordinator',
      startDate: '2024-08-25T09:00:00Z',
      dueDate: '2024-08-30T17:00:00Z',
      estimatedHours: 5,
      actualHours: 3,
      progress: 60,
      autoCreateEvent: true,
      tags: ['отзыв', 'семейное', 'возражения'],
      createdBy: 'mikhail_sokolov'
    },
    {
      id: '6',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      title: 'Подготовить отчёт для клиента',
      description: 'Составить подробный отчёт о ходе дела для клиента, включить все достигнутые результаты и следующие шаги.',
      status: 'overdue',
      priority: 'medium',
      assignedTo: 'anna_petrova',
      assignedBy: 'mikhail_sokolov',
      assignedAt: '2024-08-25T10:00:00Z',
      targetRole: 'coordinator',
      dueDate: '2024-08-26T17:00:00Z',
      estimatedHours: 2,
      progress: 25,
      autoCreateEvent: false,
      tags: ['отчёт', 'клиент', 'информирование'],
      createdBy: 'mikhail_sokolov'
    }
  ]);

  // Графики дел
  const [schedules, setSchedules] = useState<CaseSchedule[]>([
    {
      id: '1',
      caseId: '1',
      caseName: 'Покупка квартиры на Арбате',
      clientName: 'Иван Петров',
      coordinatorId: 'mikhail_sokolov',
      coordinatorName: 'Михаил Соколов',
      status: 'active',
      startDate: '2024-08-20T00:00:00Z',
      expectedEndDate: '2024-09-30T23:59:59Z',
      totalTasks: 0,
      completedTasks: 0,
      overdueTasks: 0,
      progress: 0,
      createdAt: '2024-08-20T09:00:00Z',
      updatedAt: '2024-08-27T12:00:00Z'
    },
    {
      id: '2',
      caseId: '2',
      caseName: 'Корпоративные договоры ООО "Строй-Инвест"',
      clientName: 'Мария Сидорова',
      coordinatorId: 'mikhail_sokolov',
      coordinatorName: 'Михаил Соколов',
      status: 'active',
      startDate: '2024-08-15T00:00:00Z',
      expectedEndDate: '2024-10-15T23:59:59Z',
      totalTasks: 0,
      completedTasks: 0,
      overdueTasks: 0,
      progress: 0,
      createdAt: '2024-08-15T09:00:00Z',
      updatedAt: '2024-08-23T15:30:00Z'
    },
    {
      id: '3',
      caseId: '3',
      caseName: 'Семейный спор Коваленко',
      clientName: 'Алексей Коваленко',
      coordinatorId: 'mikhail_sokolov',
      coordinatorName: 'Михаил Соколов',
      status: 'active',
      startDate: '2024-08-24T00:00:00Z',
      expectedEndDate: '2024-11-30T23:59:59Z',
      totalTasks: 0,
      completedTasks: 0,
      overdueTasks: 0,
      progress: 0,
      createdAt: '2024-08-24T10:00:00Z',
      updatedAt: '2024-08-24T16:30:00Z'
    }
  ]);

  // События для интеграции с timeline
  const [timelineEvents, setTimelineEvents] = useState<CaseEvent[]>([]);

  // Фильтры и поиск
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');

  // Диалоги и состояние
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<CaseSchedule | null>(schedules[0] || null);
  const [currentUserRole] = useState('coordinator'); // Имитация текущего пользователя

  const [newTask, setNewTask] = useState<Partial<CaseTask>>({
    status: 'pending',
    priority: 'medium',
    targetRole: 'any',
    autoCreateEvent: true,
    progress: 0
  });

  // Доступные данные
  const availableCases = [
    { id: '1', name: 'Покупка квартиры на Арбате', client: 'Иван Петров' },
    { id: '2', name: 'Корпоративные договоры ООО "Строй-Инвест"', client: 'Мария Сидорова' },
    { id: '3', name: 'Семейный спор Коваленко', client: 'Алексей Коваленко' }
  ];

  const availableLawyers = [
    { id: 'mikhail_sokolov', name: 'Михаил Соколов', role: 'Партнёр' },
    { id: 'anna_petrova', name: 'Анна Петрова', role: 'Ведущий юрист' },
    { id: 'elena_krasnova', name: 'Елена Краснова', role: 'Младший юрист' }
  ];

  // Фильтрация задач
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCase = selectedCase === 'all' || task.caseId === selectedCase;
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      const matchesRole = selectedRole === 'all' || task.targetRole === selectedRole;
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      const matchesAssignee = selectedAssignee === 'all' || task.assignedTo === selectedAssignee;
      
      return matchesSearch && matchesCase && matchesStatus && matchesRole && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchTerm, selectedCase, selectedStatus, selectedRole, selectedPriority, selectedAssignee]);

  const sortedTasks = useMemo(() => {
    return sortTasksByPriority(filteredTasks);
  }, [filteredTasks]);

  // Обновление графиков при изменении задач
  const updatedSchedules = useMemo(() => {
    return schedules.map(schedule => {
      const caseTasks = tasks.filter(task => task.caseId === schedule.caseId);
      return {
        ...schedule,
        totalTasks: caseTasks.length,
        completedTasks: caseTasks.filter(task => task.status === 'completed').length,
        overdueTasks: caseTasks.filter(task => task.status === 'overdue').length,
        progress: calculateScheduleProgress(caseTasks)
      };
    });
  }, [schedules, tasks]);

  // Создание задачи
  const handleCreateTask = () => {
    if (newTask.title && newTask.description && newTask.caseId && newTask.dueDate) {
      const task: CaseTask = {
        id: Date.now().toString(),
        caseId: newTask.caseId,
        caseName: newTask.caseName || '',
        clientName: newTask.clientName || '',
        title: newTask.title,
        description: newTask.description,
        status: 'pending',
        priority: newTask.priority as CaseTask['priority'] || 'medium',
        assignedTo: newTask.assignedTo || 'unassigned',
        assignedBy: 'current_user',
        assignedAt: new Date().toISOString(),
        targetRole: newTask.targetRole as CaseTask['targetRole'] || 'any',
        dueDate: newTask.dueDate,
        startDate: newTask.startDate,
        estimatedHours: newTask.estimatedHours,
        progress: 0,
        autoCreateEvent: newTask.autoCreateEvent || true,
        tags: newTask.tags || [],
        createdBy: 'current_user'
      };
      
      setTasks(prev => [...prev, task]);
      
      // Создание события в timeline
      if (task.autoCreateEvent) {
        const event = generateTaskEvent(task, 'created');
        setTimelineEvents(prev => [...prev, { ...event, id: Date.now().toString() } as CaseEvent]);
      }
      
      setNewTask({
        status: 'pending',
        priority: 'medium',
        targetRole: 'any',
        autoCreateEvent: true,
        progress: 0
      });
      setIsCreateDialogOpen(false);
    }
  };

  // Изменение статуса задачи
  const handleTaskStatusChange = (task: CaseTask, newStatus: CaseTask['status']) => {
    setTasks(prev => prev.map(t => 
      t.id === task.id 
        ? { 
            ...t, 
            status: newStatus, 
            progress: newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 50 : t.progress,
            completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
          }
        : t
    ));
    
    // Создание события при завершении
    if (newStatus === 'completed' && task.autoCreateEvent) {
      const event = generateTaskEvent({ ...task, status: newStatus }, 'completed');
      setTimelineEvents(prev => [...prev, { ...event, id: Date.now().toString() } as CaseEvent]);
    }
  };

  const handleTaskEdit = (task: CaseTask) => {
    console.log('Редактирование задачи:', task);
  };

  const handleTaskView = (task: CaseTask) => {
    console.log('Просмотр задачи:', task);
  };

  const activeFiltersCount = [selectedCase, selectedStatus, selectedRole, selectedPriority, selectedAssignee]
    .filter(filter => filter !== 'all').length + (searchTerm ? 1 : 0);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Управление задачами</h2>
          <p className="text-muted-foreground">
            Создание графиков работ и назначение задач по ролям с интеграцией в хронологию
          </p>
        </div>
        <CreateTaskDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          newTask={newTask}
          onTaskChange={setNewTask}
          onCreateTask={handleCreateTask}
          availableCases={availableCases}
          availableLawyers={availableLawyers}
          currentUserRole={currentUserRole}
        />
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Все задачи</TabsTrigger>
          <TabsTrigger value="schedules">Графики дел</TabsTrigger>
          <TabsTrigger value="my-tasks">Мои задачи</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Input
              placeholder="Поиск задач..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedCase} onValueChange={setSelectedCase}>
              <SelectTrigger>
                <SelectValue placeholder="Дело" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все дела</SelectItem>
                {availableCases.map(caseItem => (
                  <SelectItem key={caseItem.id} value={caseItem.id}>
                    {caseItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                {taskStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                {targetRoles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Приоритет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все приоритеты</SelectItem>
                {taskPriorities.map(priority => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
              <SelectTrigger>
                <SelectValue placeholder="Исполнитель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все исполнители</SelectItem>
                {availableLawyers.map(lawyer => (
                  <SelectItem key={lawyer.id} value={lawyer.id}>
                    {lawyer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={14} />
              <span>Активных фильтров: {activeFiltersCount}</span>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCase('all');
                  setSelectedStatus('all');
                  setSelectedRole('all');
                  setSelectedPriority('all');
                  setSelectedAssignee('all');
                }}
                className="text-blue-600 hover:text-blue-800 ml-2"
              >
                Очистить все
              </button>
            </div>
          )}

          {/* Список задач */}
          {sortedTasks.length > 0 ? (
            <div className="grid gap-4">
              {sortedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleTaskEdit}
                  onStatusChange={handleTaskStatusChange}
                  onViewDetails={handleTaskView}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Icon name="CheckSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Задач не найдено</h3>
                <p className="text-muted-foreground mb-4">
                  {activeFiltersCount > 0 
                    ? 'Попробуйте изменить параметры фильтров'
                    : 'Создайте первую задачу для начала работы'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          {/* Выбор графика */}
          <div className="flex items-center gap-4">
            <Select 
              value={selectedSchedule?.id || ''} 
              onValueChange={(value) => setSelectedSchedule(updatedSchedules.find(s => s.id === value) || null)}
            >
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Выберите дело для просмотра графика" />
              </SelectTrigger>
              <SelectContent>
                {updatedSchedules.map(schedule => (
                  <SelectItem key={schedule.id} value={schedule.id}>
                    {schedule.caseName} - {schedule.clientName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* График дела */}
          {selectedSchedule && (
            <ScheduleView
              schedule={selectedSchedule}
              tasks={tasks}
              onTaskEdit={handleTaskEdit}
              onTaskStatusChange={handleTaskStatusChange}
              onTaskView={handleTaskView}
            />
          )}
        </TabsContent>

        <TabsContent value="my-tasks" className="space-y-4">
          <p className="text-muted-foreground">
            Здесь отображаются задачи, назначенные текущему пользователю
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksTab;