import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import TaskCard from './TaskCard';
import { CaseTask } from './types';

interface TasksListProps {
  tasks: CaseTask[];
  onTaskEdit: (task: CaseTask) => void;
  onTaskStatusChange: (task: CaseTask, newStatus: CaseTask['status']) => void;
  onTaskView: (task: CaseTask) => void;
  activeFiltersCount: number;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  onTaskEdit,
  onTaskStatusChange,
  onTaskView,
  activeFiltersCount
}) => {
  if (tasks.length > 0) {
    return (
      <div className="grid gap-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onTaskEdit}
            onStatusChange={onTaskStatusChange}
            onViewDetails={onTaskView}
          />
        ))}
      </div>
    );
  }

  return (
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
  );
};

export default TasksList;