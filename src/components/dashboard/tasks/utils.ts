import { CaseTask, CaseSchedule, taskStatuses, taskPriorities } from './types';
import { CaseEvent } from '../timeline/types';

export const getTaskStatusInfo = (status: string) => {
  return taskStatuses.find(s => s.value === status) || taskStatuses[0];
};

export const getTaskPriorityInfo = (priority: string) => {
  return taskPriorities.find(p => p.value === priority) || taskPriorities[0];
};

export const formatTaskDuration = (hours: number) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} мин`;
  } else if (hours < 8) {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}ч ${minutes}мин` : `${wholeHours}ч`;
  } else {
    const days = Math.floor(hours / 8);
    const remainingHours = Math.round(hours % 8);
    return remainingHours > 0 ? `${days}д ${remainingHours}ч` : `${days}д`;
  }
};

export const calculateTaskProgress = (task: CaseTask) => {
  if (task.status === 'completed') return 100;
  if (task.status === 'cancelled') return 0;
  return task.progress || 0;
};

export const isTaskOverdue = (task: CaseTask) => {
  if (task.status === 'completed' || task.status === 'cancelled') return false;
  return new Date(task.dueDate) < new Date();
};

export const calculateScheduleProgress = (tasks: CaseTask[]) => {
  if (tasks.length === 0) return 0;
  
  const totalProgress = tasks.reduce((sum, task) => sum + calculateTaskProgress(task), 0);
  return Math.round(totalProgress / tasks.length);
};

export const getTasksForRole = (tasks: CaseTask[], role: string, userId?: string) => {
  return tasks.filter(task => {
    const roleMatches = task.targetRole === role || task.targetRole === 'any';
    const userMatches = !userId || task.assignedTo === userId;
    return roleMatches && userMatches;
  });
};

export const sortTasksByPriority = (tasks: CaseTask[]) => {
  return [...tasks].sort((a, b) => {
    const priorityA = getTaskPriorityInfo(a.priority);
    const priorityB = getTaskPriorityInfo(b.priority);
    
    if (priorityA.urgency !== priorityB.urgency) {
      return priorityB.urgency - priorityA.urgency;
    }
    
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
};

export const groupTasksByStatus = (tasks: CaseTask[]) => {
  return tasks.reduce((groups, task) => {
    const status = task.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(task);
    return groups;
  }, {} as { [key: string]: CaseTask[] });
};

export const getUpcomingTasks = (tasks: CaseTask[], days = 7) => {
  const now = new Date();
  const future = new Date(now);
  future.setDate(future.getDate() + days);
  
  return tasks.filter(task => {
    if (task.status === 'completed' || task.status === 'cancelled') return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= now && dueDate <= future;
  });
};

export const getDependencyChain = (tasks: CaseTask[], taskId: string): string[] => {
  const task = tasks.find(t => t.id === taskId);
  if (!task || !task.dependencies) return [];
  
  const chain: string[] = [...task.dependencies];
  
  task.dependencies.forEach(depId => {
    const subChain = getDependencyChain(tasks, depId);
    chain.push(...subChain);
  });
  
  return Array.from(new Set(chain));
};

export const canStartTask = (tasks: CaseTask[], taskId: string): boolean => {
  const task = tasks.find(t => t.id === taskId);
  if (!task || !task.dependencies) return true;
  
  return task.dependencies.every(depId => {
    const depTask = tasks.find(t => t.id === depId);
    return depTask?.status === 'completed';
  });
};

export const generateTaskEvent = (task: CaseTask, eventType: 'created' | 'completed' | 'updated'): Partial<CaseEvent> => {
  const eventTitles = {
    created: `Создана задача: ${task.title}`,
    completed: `Завершена задача: ${task.title}`,
    updated: `Обновлена задача: ${task.title}`
  };
  
  const eventDescriptions = {
    created: `Координатор назначил новую задачу "${task.title}" для ${task.targetRole}. Срок выполнения: ${new Date(task.dueDate).toLocaleDateString('ru-RU')}.`,
    completed: `Задача "${task.title}" успешно завершена. ${task.result?.summary || 'Результат зафиксирован.'}`,
    updated: `Внесены изменения в задачу "${task.title}". Текущий статус: ${getTaskStatusInfo(task.status).label}.`
  };
  
  return {
    caseId: task.caseId,
    caseName: task.caseName,
    clientName: task.clientName,
    type: 'other',
    title: eventTitles[eventType],
    description: eventDescriptions[eventType],
    status: 'completed',
    priority: task.priority,
    timestamp: new Date().toISOString(),
    participants: [
      {
        id: task.assignedTo,
        name: 'Исполнитель',
        role: 'lawyer',
        isRequired: true,
        participation: 'confirmed'
      }
    ],
    tags: ['задача', task.targetRole, task.status],
    notifications: task.autoCreateEvent ? [
      {
        id: Date.now().toString(),
        type: 'push',
        recipient: 'client',
        recipientType: 'client',
        template: 'task_update',
        status: 'scheduled'
      }
    ] : []
  };
};

export const calculateScheduleStatistics = (schedule: CaseSchedule, tasks: CaseTask[]) => {
  const caseTasks = tasks.filter(task => task.caseId === schedule.caseId);
  
  const stats = {
    totalTasks: caseTasks.length,
    completedTasks: caseTasks.filter(task => task.status === 'completed').length,
    inProgressTasks: caseTasks.filter(task => task.status === 'in_progress').length,
    overdueTasks: caseTasks.filter(task => isTaskOverdue(task) && task.status !== 'completed').length,
    upcomingTasks: getUpcomingTasks(caseTasks, 7).length,
    
    // Временные показатели
    estimatedHours: caseTasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0),
    actualHours: caseTasks.reduce((sum, task) => sum + (task.actualHours || 0), 0),
    
    // Прогресс
    progress: calculateScheduleProgress(caseTasks),
    
    // Распределение по ролям
    roleDistribution: caseTasks.reduce((dist, task) => {
      const role = task.targetRole;
      dist[role] = (dist[role] || 0) + 1;
      return dist;
    }, {} as { [role: string]: number }),
    
    // Приоритеты
    priorityDistribution: caseTasks.reduce((dist, task) => {
      const priority = task.priority;
      dist[priority] = (dist[priority] || 0) + 1;
      return dist;
    }, {} as { [priority: string]: number })
  };
  
  return stats;
};

export const getTaskEfficiencyMetrics = (tasks: CaseTask[]) => {
  const completedTasks = tasks.filter(task => task.status === 'completed' && task.estimatedHours && task.actualHours);
  
  if (completedTasks.length === 0) {
    return {
      averageAccuracy: 0,
      onTimeCompletion: 0,
      totalVariance: 0
    };
  }
  
  const accuracyRates = completedTasks.map(task => {
    const estimated = task.estimatedHours || 1;
    const actual = task.actualHours || 1;
    return Math.min(estimated / actual, actual / estimated);
  });
  
  const onTimeCount = completedTasks.filter(task => {
    if (!task.completedAt) return false;
    return new Date(task.completedAt) <= new Date(task.dueDate);
  }).length;
  
  const totalVariance = completedTasks.reduce((sum, task) => {
    const estimated = task.estimatedHours || 1;
    const actual = task.actualHours || 1;
    return sum + Math.abs(estimated - actual);
  }, 0);
  
  return {
    averageAccuracy: accuracyRates.reduce((sum, rate) => sum + rate, 0) / accuracyRates.length,
    onTimeCompletion: (onTimeCount / completedTasks.length) * 100,
    totalVariance: totalVariance / completedTasks.length
  };
};

export const suggestTaskOptimizations = (tasks: CaseTask[]) => {
  const suggestions: string[] = [];
  
  const overdueTasks = tasks.filter(task => isTaskOverdue(task) && task.status !== 'completed');
  if (overdueTasks.length > 0) {
    suggestions.push(`У вас ${overdueTasks.length} просроченных задач. Пересмотрите приоритеты.`);
  }
  
  const blockedTasks = tasks.filter(task => task.dependencies && !canStartTask(tasks, task.id));
  if (blockedTasks.length > 0) {
    suggestions.push(`${blockedTasks.length} задач заблокированы зависимостями. Ускорьте выполнение предыдущих этапов.`);
  }
  
  const highPriorityPending = tasks.filter(task => 
    task.priority === 'critical' && task.status === 'pending'
  );
  if (highPriorityPending.length > 0) {
    suggestions.push(`${highPriorityPending.length} критических задач ожидают начала работы.`);
  }
  
  return suggestions;
};