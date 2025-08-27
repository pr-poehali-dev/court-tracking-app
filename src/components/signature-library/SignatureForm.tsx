import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { SignatureFormData, signatureStyles } from './types';

interface SignatureFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: SignatureFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignatureFormData>>;
  onSubmit: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSubmit
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={16} className="mr-2" />
          Создать подпись
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Создание новой подписи</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="sig-name">ФИО</Label>
              <Input
                id="sig-name"
                placeholder="Введите ФИО"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="sig-position">Должность</Label>
              <Input
                id="sig-position"
                placeholder="Введите должность"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="sig-style">Стиль подписи</Label>
              <Select value={formData.style} onValueChange={(value) => setFormData(prev => ({ ...prev, style: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {signatureStyles.map(style => (
                    <SelectItem key={style.id} value={style.id}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sig-color">Цвет</Label>
              <Input
                id="sig-color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-4">
            <Label>Предварительный просмотр</Label>
            <Card className="p-4">
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded">
                <div className="text-center">
                  <div className="font-semibold text-lg" style={{ color: formData.color }}>
                    {formData.name || 'Ваша подпись'}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formData.position || 'Должность'}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отменить
          </Button>
          <Button onClick={onSubmit}>
            Создать подпись
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureForm;