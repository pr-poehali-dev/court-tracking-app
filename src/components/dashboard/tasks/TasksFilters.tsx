import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { taskStatuses, taskPriorities, targetRoles } from './types';

interface TasksFiltersProps {
  searchTerm: string;
  selectedCase: string;
  selectedStatus: string;
  selectedRole: string;
  selectedPriority: string;
  selectedAssignee: string;
  onSearchChange: (value: string) => void;
  onCaseChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onAssigneeChange: (value: string) => void;
  availableCases: Array<{ id: string; name: string; client: string }>;
  availableLawyers: Array<{ id: string; name: string; role: string }>;
  onClearFilters: () => void;
}

const TasksFilters: React.FC<TasksFiltersProps> = ({
  searchTerm,
  selectedCase,
  selectedStatus,
  selectedRole,
  selectedPriority,
  selectedAssignee,
  onSearchChange,
  onCaseChange,
  onStatusChange,
  onRoleChange,
  onPriorityChange,
  onAssigneeChange,
  availableCases,
  availableLawyers,
  onClearFilters
}) => {
  const activeFiltersCount = [selectedCase, selectedStatus, selectedRole, selectedPriority, selectedAssignee]
    .filter(filter => filter !== 'all').length + (searchTerm ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Input
          placeholder="Поиск задач..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Select value={selectedCase} onValueChange={onCaseChange}>
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
        <Select value={selectedStatus} onValueChange={onStatusChange}>
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
        <Select value={selectedRole} onValueChange={onRoleChange}>
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
        <Select value={selectedPriority} onValueChange={onPriorityChange}>
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
        <Select value={selectedAssignee} onValueChange={onAssigneeChange}>
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
            onClick={onClearFilters}
            className="text-blue-600 hover:text-blue-800 ml-2"
          >
            Очистить все
          </button>
        </div>
      )}
    </div>
  );
};

export default TasksFilters;