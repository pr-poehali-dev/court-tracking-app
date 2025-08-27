import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { CaseExpense, categories, subcategories } from './types';

interface AddExpenseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newExpense: Partial<CaseExpense>;
  onExpenseChange: (expense: Partial<CaseExpense>) => void;
  onAddExpense: () => void;
  uniqueCases: Array<{ id: string; name: string; client: string }>;
}

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({
  isOpen,
  onOpenChange,
  newExpense,
  onExpenseChange,
  onAddExpense,
  uniqueCases
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить расход
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Новый расход</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <Label htmlFor="caseSelect">Дело *</Label>
            <Select value={newExpense.caseId} onValueChange={(value) => {
              const caseData = uniqueCases.find(c => c.id === value);
              onExpenseChange({ 
                ...newExpense, 
                caseId: value,
                caseName: caseData?.name,
                clientName: caseData?.client
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите дело" />
              </SelectTrigger>
              <SelectContent>
                {uniqueCases.map(caseData => (
                  <SelectItem key={caseData.id} value={caseData.id}>
                    {caseData.name} - {caseData.client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Категория расходов *</Label>
            <Select value={newExpense.category} onValueChange={(value) => {
              onExpenseChange({ ...newExpense, category: value as CaseExpense['category'], subcategory: '' });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center">
                      <Icon name={cat.icon as any} size={14} className="mr-2" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {newExpense.category && subcategories[newExpense.category] && (
            <div>
              <Label htmlFor="subcategory">Подкатегория</Label>
              <Select value={newExpense.subcategory} onValueChange={(value) => onExpenseChange({ ...newExpense, subcategory: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите подкатегорию" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories[newExpense.category].map(subcat => (
                    <SelectItem key={subcat} value={subcat}>
                      {subcat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="amount">Сумма *</Label>
            <Input
              id="amount"
              type="number"
              value={newExpense.amount || ''}
              onChange={(e) => onExpenseChange({ ...newExpense, amount: Number(e.target.value) })}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="date">Дата расхода</Label>
            <Input
              id="date"
              type="date"
              value={newExpense.date || ''}
              onChange={(e) => onExpenseChange({ ...newExpense, date: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={newExpense.description || ''}
              onChange={(e) => onExpenseChange({ ...newExpense, description: e.target.value })}
              placeholder="Подробное описание расхода"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="receipt"
              checked={newExpense.receipt || false}
              onChange={(e) => onExpenseChange({ ...newExpense, receipt: e.target.checked })}
            />
            <Label htmlFor="receipt">Есть чек/документ</Label>
          </div>

          {newExpense.receipt && (
            <div>
              <Label htmlFor="receiptNumber">Номер чека/документа</Label>
              <Input
                id="receiptNumber"
                value={newExpense.receiptNumber || ''}
                onChange={(e) => onExpenseChange({ ...newExpense, receiptNumber: e.target.value })}
                placeholder="Номер документа"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="reimbursable"
              checked={newExpense.reimbursable || false}
              onChange={(e) => onExpenseChange({ ...newExpense, reimbursable: e.target.checked })}
            />
            <Label htmlFor="reimbursable">Подлежит возмещению</Label>
          </div>

          <div>
            <Label htmlFor="notes">Заметки</Label>
            <Textarea
              id="notes"
              value={newExpense.notes || ''}
              onChange={(e) => onExpenseChange({ ...newExpense, notes: e.target.value })}
              placeholder="Дополнительные заметки"
            />
          </div>

          <Button onClick={onAddExpense} className="w-full">
            Добавить расход
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;