import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CaseSchedule } from './types';

interface ScheduleSelectorProps {
  schedules: CaseSchedule[];
  selectedSchedule: CaseSchedule | null;
  onScheduleChange: (schedule: CaseSchedule | null) => void;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  schedules,
  selectedSchedule,
  onScheduleChange
}) => {
  return (
    <div className="flex items-center gap-4">
      <Select 
        value={selectedSchedule?.id || ''} 
        onValueChange={(value) => onScheduleChange(schedules.find(s => s.id === value) || null)}
      >
        <SelectTrigger className="w-80">
          <SelectValue placeholder="Выберите дело для просмотра графика" />
        </SelectTrigger>
        <SelectContent>
          {schedules.map(schedule => (
            <SelectItem key={schedule.id} value={schedule.id}>
              {schedule.caseName} - {schedule.clientName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ScheduleSelector;