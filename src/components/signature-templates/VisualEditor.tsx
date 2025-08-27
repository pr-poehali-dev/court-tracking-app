import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { SignaturePosition, getTypeIcon } from './types';

interface VisualEditorProps {
  editorPositions: SignaturePosition[];
  updatePosition: (id: string, updates: Partial<SignaturePosition>) => void;
}

const VisualEditor: React.FC<VisualEditorProps> = ({ 
  editorPositions, 
  updatePosition 
}) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Визуальный редактор</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-50 rounded-lg h-96 border-2 border-dashed border-gray-200">
          <div className="absolute inset-4 bg-white rounded border shadow-sm">
            {editorPositions.map((pos) => (
              <div
                key={pos.id}
                className="absolute border-2 border-blue-500 bg-blue-100/80 rounded cursor-move flex items-center justify-center text-xs font-medium hover:border-blue-600 hover:shadow-md transition-all"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `${pos.width}%`,
                  height: `${pos.height}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseDown={(e) => {
                  // Здесь можно добавить логику перетаскивания
                }}
              >
                <Icon name={getTypeIcon(pos.type)} size={16} />
              </div>
            ))}
            
            {editorPositions.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Icon name="MousePointer" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Добавьте элементы подписи из панели слева</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Горизонтальная линейка */}
          <div className="absolute top-0 left-4 right-4 h-4 bg-gray-200 border-b">
            {Array.from({ length: 11 }, (_, i) => (
              <div
                key={i}
                className="absolute border-l border-gray-400 h-full text-xs text-gray-600"
                style={{ left: `${i * 10}%` }}
              >
                <span className="ml-1">{i * 10}</span>
              </div>
            ))}
          </div>
          
          {/* Вертикальная линейка */}
          <div className="absolute top-4 bottom-4 left-0 w-4 bg-gray-200 border-r">
            {Array.from({ length: 11 }, (_, i) => (
              <div
                key={i}
                className="absolute border-t border-gray-400 w-full text-xs text-gray-600"
                style={{ top: `${i * 10}%` }}
              >
                <span className="ml-1 writing-mode-vertical">{i * 10}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          Подсказка: Перетащите элементы на документ для позиционирования подписей и печатей
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualEditor;