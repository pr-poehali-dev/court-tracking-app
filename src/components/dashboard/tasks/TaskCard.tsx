import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { CaseTask, targetRoles } from './types';
import { 
  getTaskStatusInfo, 
  getTaskPriorityInfo, 
  formatTaskDuration, 
  isTaskOverdue,
  calculateTaskProgress 
} from './utils';

interface TaskCardProps {
  task: CaseTask;
  onEdit: (task: CaseTask) => void;
  onStatusChange: (task: CaseTask, newStatus: CaseTask['status']) => void;
  onViewDetails: (task: CaseTask) => void;
  compact?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onStatusChange,
  onViewDetails,
  compact = false
}) => {
  const statusInfo = getTaskStatusInfo(task.status);
  const priorityInfo = getTaskPriorityInfo(task.priority);
  const roleInfo = targetRoles.find(role => role.value === task.targetRole);
  const isOverdue = isTaskOverdue(task);
  const progress = calculateTaskProgress(task);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-700',
      in_progress: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-gray-100 text-gray-500',
      overdue: 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getPriorityBorderColor = (priority: string) => {
    const colors = {
      low: 'border-l-gray-400',
      medium: 'border-l-blue-400',
      high: 'border-l-orange-400',
      critical: 'border-l-red-500'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const canChangeStatus = (currentStatus: string, newStatus: string) => {
    const statusFlow = {
      pending: ['in_progress', 'cancelled'],
      in_progress: ['completed', 'pending', 'cancelled'],
      completed: ['in_progress'],
      cancelled: ['pending'],
      overdue: ['in_progress', 'completed', 'cancelled']
    };
    return statusFlow[currentStatus as keyof typeof statusFlow]?.includes(newStatus) || false;
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${getPriorityBorderColor(task.priority)} border-l-4 ${isOverdue && task.status !== 'completed' ? 'border-red-200' : ''}`}>
      <CardHeader className={compact ? 'pb-2' : 'pb-3'}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getStatusColor(task.status)}>
                <Icon name={statusInfo.icon as any} size={12} className="mr-1" />
                {statusInfo.label}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {roleInfo?.label}
              </Badge>
              {task.priority !== 'low' && (
                <Badge variant="outline" className={`text-xs ${
                  task.priority === 'critical' ? 'text-red-600' : 
                  task.priority === 'high' ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {priorityInfo.label}
                </Badge>
              )}
              {isOverdue && task.status !== 'completed' && (
                <Badge variant="destructive" className="text-xs">
                  <Icon name="AlertTriangle" size={10} className="mr-1" />
                  Просрочено
                </Badge>
              )}
            </div>
            
            <h3 className="font-semibold mb-1">{task.title}</h3>
            {!compact && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{task.description}</p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Scale" size={12} />
                <span>{task.caseName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={12} />
                <span>До {formatDate(task.dueDate)}</span>
              </div>
              {task.estimatedHours && (
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  <span>{formatTaskDuration(task.estimatedHours)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(task)}>
              <Icon name="Eye" size={14} />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
              <Icon name="Edit" size={14} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={compact ? 'pt-0' : 'pt-0'}>
        {!compact && (
          <>
            {/* Прогресс выполнения */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium">Прогресс</span>
                <span className="text-xs text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Исполнитель */}
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">
                  {task.assignedTo.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">Исполнитель</span>
            </div>

            {/* Зависимости */}
            {task.dependencies && task.dependencies.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <Icon name="Link" size={12} />
                  <span className="text-xs text-muted-foreground">
                    Зависит от {task.dependencies.length} задач
                  </span>
                </div>
              </div>
            )}

            {/* Теги */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap mb-3">
                {task.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {task.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{task.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Быстрые действия */}
            <div className="flex gap-2">
              {canChangeStatus(task.status, 'in_progress') && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onStatusChange(task, 'in_progress')}
                  className="flex-1"
                >
                  <Icon name="Play" size={12} className="mr-1" />
                  Начать
                </Button>
              )}
              {canChangeStatus(task.status, 'completed') && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onStatusChange(task, 'completed')}
                  className="flex-1"
                >
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Завершить
                </Button>
              )}
              {task.timelineEventId && (
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="GitBranch" size={12} className="mr-1" />
                  События
                </Button>
              )}
            </div>
          </>
        )}

        {compact && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="w-20 h-1" />
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(task.dueDate)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;