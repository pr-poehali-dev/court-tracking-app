import { CaseEvent, eventTypes, eventStatuses, priorities } from './types';

export const getEventTypeInfo = (type: string) => {
  return eventTypes.find(et => et.value === type) || eventTypes[eventTypes.length - 1];
};

export const getEventStatusInfo = (status: string) => {
  return eventStatuses.find(es => es.value === status) || eventStatuses[0];
};

export const getPriorityInfo = (priority: string) => {
  return priorities.find(p => p.value === priority) || priorities[0];
};

export const formatEventTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return `Сегодня, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffInDays === 1) {
    return `Вчера, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffInDays < 7) {
    return `${diffInDays} дн. назад, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

export const getTimelinePosition = (events: CaseEvent[], currentEvent: CaseEvent) => {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  const index = sortedEvents.findIndex(e => e.id === currentEvent.id);
  const total = sortedEvents.length;
  
  return {
    index,
    total,
    isFirst: index === 0,
    isLast: index === total - 1,
    position: total > 1 ? (index / (total - 1)) * 100 : 50
  };
};

export const groupEventsByDate = (events: CaseEvent[]) => {
  const grouped = events.reduce((acc, event) => {
    const date = new Date(event.timestamp).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as { [key: string]: CaseEvent[] });

  return Object.entries(grouped)
    .map(([date, events]) => ({
      date,
      events: events.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getEventProgress = (event: CaseEvent) => {
  switch (event.status) {
    case 'completed': return 100;
    case 'in_progress': return 60;
    case 'scheduled': return 20;
    case 'cancelled': return 0;
    case 'overdue': return 0;
    default: return 0;
  }
};

export const generateNotificationContent = (event: CaseEvent, template: string) => {
  const templates = {
    client_update: `Уведомление по делу "${event.caseName}": ${event.title}. ${event.description}`,
    team_notification: `Событие по делу "${event.caseName}": ${event.title}`,
    deadline_reminder: `Напоминание о дедлайне по делу "${event.caseName}": ${event.title}`,
    court_notification: `Судебное заседание по делу "${event.caseName}": ${event.title}`,
    document_ready: `Документы готовы по делу "${event.caseName}": ${event.title}`
  };
  
  return templates[template as keyof typeof templates] || `Событие по делу: ${event.title}`;
};

export const calculateEventDuration = (startTime: string, endTime?: string) => {
  if (!endTime) return null;
  
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffInMinutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} мин`;
  } else {
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return minutes > 0 ? `${hours}ч ${minutes}мин` : `${hours}ч`;
  }
};

export const getLocationIcon = (type: string) => {
  const icons = {
    court: 'Scale',
    office: 'Building',
    client_office: 'Building2',
    government: 'Landmark',
    online: 'Monitor',
    other: 'MapPin'
  };
  
  return icons[type as keyof typeof icons] || 'MapPin';
};

export const sortEventsByImportance = (events: CaseEvent[]) => {
  const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
  const statusWeight = { overdue: 5, in_progress: 4, scheduled: 3, completed: 2, cancelled: 1 };
  
  return events.sort((a, b) => {
    const aWeight = (priorityWeight[a.priority] || 1) + (statusWeight[a.status] || 1);
    const bWeight = (priorityWeight[b.priority] || 1) + (statusWeight[b.status] || 1);
    
    if (aWeight !== bWeight) {
      return bWeight - aWeight;
    }
    
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};