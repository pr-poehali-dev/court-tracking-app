import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from './types';

interface ExpenseFiltersProps {
  selectedCase: string;
  selectedCategory: string;
  selectedStatus: string;
  onCaseChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  uniqueCases: Array<{ id: string; name: string; client: string }>;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  selectedCase,
  selectedCategory,
  selectedStatus,
  onCaseChange,
  onCategoryChange,
  onStatusChange,
  uniqueCases
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Select value={selectedCase} onValueChange={onCaseChange}>
        <SelectTrigger>
          <SelectValue placeholder="Все дела" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все дела</SelectItem>
          {uniqueCases.map(caseData => (
            <SelectItem key={caseData.id} value={caseData.id}>
              {caseData.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Все категории" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все категории</SelectItem>
          {categories.map(cat => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Все статусы" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          <SelectItem value="pending">На рассмотрении</SelectItem>
          <SelectItem value="approved">Одобрено</SelectItem>
          <SelectItem value="reimbursed">Возмещено</SelectItem>
          <SelectItem value="rejected">Отклонено</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExpenseFilters;