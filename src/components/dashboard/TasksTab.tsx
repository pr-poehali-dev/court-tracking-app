import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateTaskDialog from './tasks/CreateTaskDialog';
import ScheduleView from './tasks/ScheduleView';
import TasksFilters from './tasks/TasksFilters';
import TasksList from './tasks/TasksList';
import ScheduleSelector from './tasks/ScheduleSelector';
import { useTasksData } from './tasks/hooks/useTasksData';
import { useTasksLogic } from './tasks/hooks/useTasksLogic';
import { CaseTask } from './tasks/types';

const TasksTab = () => {
  const { tasks, setTasks, schedules, setSchedules, timelineEvents, setTimelineEvents } = useTasksData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(schedules[0] || null);
  const [currentUserRole] = useState('coordinator');

  const [newTask, setNewTask] = useState<Partial<CaseTask>>({
    status: 'pending',
    priority: 'medium',
    targetRole: 'any',
    autoCreateEvent: true,
    progress: 0
  });

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

  const {
    sortedTasks,
    updatedSchedules,
    handleCreateTask,
    handleTaskStatusChange,
    handleTaskEdit,
    handleTaskView
  } = useTasksLogic({
    tasks,
    schedules,
    setTasks,
    setTimelineEvents,
    searchTerm,
    selectedCase,
    selectedStatus,
    selectedRole,
    selectedPriority,
    selectedAssignee,
    newTask,
    setNewTask,
    setIsCreateDialogOpen
  });

  const activeFiltersCount = [selectedCase, selectedStatus, selectedRole, selectedPriority, selectedAssignee]
    .filter(filter => filter !== 'all').length + (searchTerm ? 1 : 0);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCase('all');
    setSelectedStatus('all');
    setSelectedRole('all');
    setSelectedPriority('all');
    setSelectedAssignee('all');
  };

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
          <TasksFilters
            searchTerm={searchTerm}
            selectedCase={selectedCase}
            selectedStatus={selectedStatus}
            selectedRole={selectedRole}
            selectedPriority={selectedPriority}
            selectedAssignee={selectedAssignee}
            onSearchChange={setSearchTerm}
            onCaseChange={setSelectedCase}
            onStatusChange={setSelectedStatus}
            onRoleChange={setSelectedRole}
            onPriorityChange={setSelectedPriority}
            onAssigneeChange={setSelectedAssignee}
            availableCases={availableCases}
            availableLawyers={availableLawyers}
            onClearFilters={handleClearFilters}
          />

          <TasksList
            tasks={sortedTasks}
            onTaskEdit={handleTaskEdit}
            onTaskStatusChange={handleTaskStatusChange}
            onTaskView={handleTaskView}
            activeFiltersCount={activeFiltersCount}
          />
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <ScheduleSelector
            schedules={updatedSchedules}
            selectedSchedule={selectedSchedule}
            onScheduleChange={setSelectedSchedule}
          />

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