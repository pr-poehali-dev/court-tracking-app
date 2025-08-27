import { useMemo } from 'react';
import { CaseTask, CaseSchedule } from '../types';
import { CaseEvent } from '../../timeline/types';
import { sortTasksByPriority, generateTaskEvent, calculateScheduleProgress } from '../utils';

interface UseTasksLogicProps {
  tasks: CaseTask[];
  schedules: CaseSchedule[];
  setTasks: React.Dispatch<React.SetStateAction<CaseTask[]>>;
  setTimelineEvents: React.Dispatch<React.SetStateAction<CaseEvent[]>>;
  searchTerm: string;
  selectedCase: string;
  selectedStatus: string;
  selectedRole: string;
  selectedPriority: string;
  selectedAssignee: string;
  newTask: Partial<CaseTask>;
  setNewTask: React.Dispatch<React.SetStateAction<Partial<CaseTask>>>;
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTasksLogic = ({
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
}: UseTasksLogicProps) => {
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

  return {
    filteredTasks,
    sortedTasks,
    updatedSchedules,
    handleCreateTask,
    handleTaskStatusChange,
    handleTaskEdit,
    handleTaskView
  };
};