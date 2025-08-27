import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { eventTypes, eventStatuses, priorities } from './types';

interface TimelineFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCase: string;
  onCaseChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedPriority: string;
  onPriorityChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  availableCases: Array<{ id: string; name: string; client: string }>;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const TimelineFilters: React.FC<TimelineFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCase,
  onCaseChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  dateRange,
  onDateRangeChange,
  availableCases,
  activeFiltersCount,
  onClearFilters
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={16} />
          <span className="font-medium">Фильтры</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount} активн.
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Очистить все
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Input
          placeholder="Поиск событий..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="md:col-span-2"
        />

        <Select value={selectedCase} onValueChange={onCaseChange}>
          <SelectTrigger>
            <SelectValue placeholder="Все дела" />
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

        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Тип события" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            {eventTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center">
                  <Icon name={type.icon as any} size={14} className="mr-2" />
                  {type.label}
                </div>
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
            {eventStatuses.map(status => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Весь период</SelectItem>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="yesterday">Вчера</SelectItem>
            <SelectItem value="week">Эта неделя</SelectItem>
            <SelectItem value="month">Этот месяц</SelectItem>
            <SelectItem value="quarter">Этот квартал</SelectItem>
            <SelectItem value="year">Этот год</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Select value={selectedPriority} onValueChange={onPriorityChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Приоритет" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все приоритеты</SelectItem>
            {priorities.map(priority => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Показывать события от самых новых к старым</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineFilters;