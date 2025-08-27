import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { CaseTask, CaseSchedule } from './types';
import { calculateScheduleStatistics, getUpcomingTasks, formatTaskDuration } from './utils';
import TaskCard from './TaskCard';

interface ScheduleViewProps {
  schedule: CaseSchedule;
  tasks: CaseTask[];
  onTaskEdit: (task: CaseTask) => void;
  onTaskStatusChange: (task: CaseTask, status: CaseTask['status']) => void;
  onTaskView: (task: CaseTask) => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  tasks,
  onTaskEdit,
  onTaskStatusChange,
  onTaskView
}) => {
  const stats = calculateScheduleStatistics(schedule, tasks);
  const upcomingTasks = getUpcomingTasks(tasks, 7);
  const caseTasks = tasks.filter(task => task.caseId === schedule.caseId);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-blue-600';
    if (progress >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysUntilDeadline = (dateString: string) => {
    const deadline = new Date(dateString);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const groupTasksByStatus = () => {
    const grouped = {
      pending: caseTasks.filter(t => t.status === 'pending'),
      in_progress: caseTasks.filter(t => t.status === 'in_progress'),
      completed: caseTasks.filter(t => t.status === 'completed'),
      overdue: caseTasks.filter(t => t.status === 'overdue')
    };
    return grouped;
  };

  const groupedTasks = groupTasksByStatus();
  const daysUntilEnd = getDaysUntilDeadline(schedule.expectedEndDate);

  return (
    <div className="space-y-6">
      {/* Общая информация о графике */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={20} />
              График работ по делу
            </div>
            <Badge variant={schedule.status === 'active' ? 'default' : 'secondary'}>
              {schedule.status === 'active' ? 'Активен' :
               schedule.status === 'paused' ? 'Приостановлен' :
               schedule.status === 'completed' ? 'Завершён' : 'Отменён'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getProgressColor(stats.progress)}`}>
                {stats.progress}%
              </div>
              <p className="text-sm text-muted-foreground">Готовность</p>
              <Progress value={stats.progress} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{stats.completedTasks}/{stats.totalTasks}</div>
              <p className="text-sm text-muted-foreground">Задач выполнено</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-orange-600">{stats.inProgressTasks}</div>
              <p className="text-sm text-muted-foreground">В работе</p>
            </div>
            <div className="text-center">
              <div className={`text-xl font-semibold ${stats.overdueTasks > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {stats.overdueTasks}
              </div>
              <p className="text-sm text-muted-foreground">Просрочено</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {schedule.coordinatorName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Координатор: {schedule.coordinatorName}</span>
              </div>
            </div>
            <div>
              <div className="text-sm">
                <span className="text-muted-foreground">Срок завершения: </span>
                <span className={daysUntilEnd < 30 ? 'text-orange-600 font-medium' : 'font-medium'}>
                  {formatDate(schedule.expectedEndDate)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {daysUntilEnd > 0 ? `${daysUntilEnd} дней до окончания` : `Просрочено на ${Math.abs(daysUntilEnd)} дней`}
              </div>
            </div>
            <div>
              <div className="text-sm">
                <span className="text-muted-foreground">Плановое время: </span>
                <span className="font-medium">{formatTaskDuration(stats.estimatedHours)}</span>
              </div>
              {stats.actualHours > 0 && (
                <div className="text-xs text-muted-foreground mt-1">
                  Фактически: {formatTaskDuration(stats.actualHours)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ближайшие задачи */}
      {upcomingTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Clock" size={20} />
              Ближайшие задачи (7 дней)
              <Badge variant="secondary">{upcomingTasks.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.slice(0, 3).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onTaskEdit}
                  onStatusChange={onTaskStatusChange}
                  onViewDetails={onTaskView}
                  compact
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Задачи по статусам */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* В работе */}
        {groupedTasks.in_progress.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Icon name="Play" size={20} />
                Выполняются сейчас
                <Badge variant="secondary">{groupedTasks.in_progress.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {groupedTasks.in_progress.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onTaskEdit}
                    onStatusChange={onTaskStatusChange}
                    onViewDetails={onTaskView}
                    compact
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ожидают */}
        {groupedTasks.pending.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-600">
                <Icon name="Clock" size={20} />
                Ожидают начала
                <Badge variant="outline">{groupedTasks.pending.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {groupedTasks.pending.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onTaskEdit}
                    onStatusChange={onTaskStatusChange}
                    onViewDetails={onTaskView}
                    compact
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Просроченные */}
        {groupedTasks.overdue.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Icon name="AlertTriangle" size={20} />
                Просроченные
                <Badge variant="destructive">{groupedTasks.overdue.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {groupedTasks.overdue.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onTaskEdit}
                    onStatusChange={onTaskStatusChange}
                    onViewDetails={onTaskView}
                    compact
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Выполненные (последние 3) */}
        {groupedTasks.completed.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Icon name="CheckCircle" size={20} />
                Недавно выполнены
                <Badge variant="secondary">{groupedTasks.completed.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {groupedTasks.completed
                  .sort((a, b) => new Date(b.completedAt || '').getTime() - new Date(a.completedAt || '').getTime())
                  .slice(0, 3)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={onTaskEdit}
                      onStatusChange={onTaskStatusChange}
                      onViewDetails={onTaskView}
                      compact
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Распределение по ролям */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={20} />
            Распределение задач по ролям
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.roleDistribution).map(([role, count]) => {
              const roleLabels = {
                coordinator: 'Координатор',
                litigator: 'Литигатор',
                expert: 'Эксперт',
                assistant: 'Ассистент',
                any: 'Любая роль'
              };
              
              return (
                <div key={role} className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xl font-bold">{count}</div>
                  <p className="text-sm text-muted-foreground">
                    {roleLabels[role as keyof typeof roleLabels] || role}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleView;