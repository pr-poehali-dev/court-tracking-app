import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TasksTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Управление задачами</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Компонент задач временно упрощен для устранения ошибок рендеринга
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksTab;