import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import { mockUpcomingEvents } from './types';

interface CalendarTabProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const CalendarTab: React.FC<CalendarTabProps> = ({ selectedDate, onSelectDate }) => {
  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Календарь</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onSelectDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Предстоящие события</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUpcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="text-center min-w-[70px] bg-primary/10 rounded-lg p-2">
                    <div className="text-lg font-bold text-primary">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.case}</p>
                    <div className="flex items-center mt-2 space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        {event.court}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    Добавить в календарь
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarTab;