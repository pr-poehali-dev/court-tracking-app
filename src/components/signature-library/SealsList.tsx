import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { SealData } from './types';

interface SealsListProps {
  seals: SealData[];
  onSelectSeal: (seal: SealData) => void;
}

const SealsList: React.FC<SealsListProps> = ({ seals, onSelectSeal }) => {
  const getSealTypeLabel = (type: string) => {
    switch (type) {
      case 'round': return 'Круглая';
      case 'rectangular': return 'Прямоугольная';
      case 'triangular': return 'Треугольная';
      default: return type;
    }
  };

  const getSealSizeLabel = (size: string) => {
    switch (size) {
      case 'large': return 'Большой';
      case 'medium': return 'Средний';
      case 'small': return 'Малый';
      default: return size;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {seals.map(seal => (
        <Card key={seal.id} className="card-hover cursor-pointer" onClick={() => onSelectSeal(seal)}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{seal.name}</CardTitle>
              {seal.isActive && (
                <Badge className="bg-green-500 text-white text-xs">Активна</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-20 bg-gray-50 rounded flex items-center justify-center border">
              <img 
                src={seal.preview} 
                alt={seal.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div>Тип: {getSealTypeLabel(seal.type)}</div>
              <div>Размер: {getSealSizeLabel(seal.size)}</div>
              <div>Создана: {seal.createdAt}</div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Edit" size={12} className="mr-1" />
                Изменить
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={12} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SealsList;