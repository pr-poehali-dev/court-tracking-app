import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SealFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SealForm: React.FC<SealFormProps> = ({ isOpen, onOpenChange }) => {
  const handleSubmit = () => {
    console.log('Создание печати');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={16} className="mr-2" />
          Создать печать
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Создание новой печати</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="seal-name">Название печати</Label>
              <Input
                id="seal-name"
                placeholder="Например: Печать организации"
              />
            </div>
            <div>
              <Label htmlFor="seal-text">Текст печати</Label>
              <Textarea
                id="seal-text"
                placeholder="Текст, который будет отображаться на печати"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="seal-type">Тип печати</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип печати" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round">Круглая</SelectItem>
                  <SelectItem value="rectangular">Прямоугольная</SelectItem>
                  <SelectItem value="triangular">Треугольная</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="seal-size">Размер</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите размер" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Малый (40мм)</SelectItem>
                  <SelectItem value="medium">Средний (50мм)</SelectItem>
                  <SelectItem value="large">Большой (65мм)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <Label>Предварительный просмотр</Label>
            <Card className="p-4">
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded">
                <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
                  <span className="text-xs text-center">Печать</span>
                </div>
              </div>
            </Card>
            <div className="space-y-2">
              <Label>Загрузить изображение печати</Label>
              <Input type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">
                Поддерживаются форматы: PNG, JPG, SVG
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отменить
          </Button>
          <Button onClick={handleSubmit}>
            Создать печать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SealForm;