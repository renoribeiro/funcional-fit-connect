
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Class {
  id: number;
  name: string;
  time: string;
  duration: number;
  students: number;
  capacity: number;
  instructor: string;
  location: string;
  date: Date;
}

interface CalendarViewProps {
  classes: Class[];
  onDateSelect: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  classes,
  onDateSelect,
  selectedDate,
}) => {
  // Função para verificar se uma data tem aulas
  const hasClasses = (date: Date) => {
    return classes.some(
      (cls) =>
        cls.date.toDateString() === date.toDateString()
    );
  };

  // Função para obter aulas de uma data específica
  const getClassesForDate = (date: Date) => {
    return classes.filter(
      (cls) => cls.date.toDateString() === date.toDateString()
    );
  };

  // Custom day content para mostrar indicadores de aulas
  const renderDay = (day: Date) => {
    const dayClasses = getClassesForDate(day);
    
    if (dayClasses.length === 0) {
      return <span>{day.getDate()}</span>;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative w-full h-full flex items-center justify-center">
              <span>{day.getDate()}</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="p-3 max-w-xs">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">
                Aulas do dia {day.getDate()}
              </h4>
              {dayClasses.map((cls) => (
                <div key={cls.id} className="space-y-1 border-b pb-2 last:border-b-0">
                  <p className="font-medium text-sm">{cls.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{cls.time} ({cls.duration}min)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{cls.students}/{cls.capacity} alunos</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{cls.location}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Prof: {cls.instructor}
                  </p>
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário de Aulas</CardTitle>
        <CardDescription>
          Clique em uma data para ver as aulas do dia. Datas com aulas têm um ponto azul.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          className="rounded-md border"
          modifiers={{
            hasClasses: (date) => hasClasses(date),
          }}
          modifiersStyles={{
            hasClasses: {
              fontWeight: 'bold',
              color: 'var(--primary)',
            },
          }}
          components={{
            Day: ({ date }) => renderDay(date),
          }}
        />
        
        {selectedDate && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">
              Aulas do dia {selectedDate.toLocaleDateString('pt-BR')}
            </h4>
            {getClassesForDate(selectedDate).length > 0 ? (
              <div className="space-y-2">
                {getClassesForDate(selectedDate).map((cls) => (
                  <div key={cls.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{cls.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {cls.time} - {cls.instructor} - {cls.location}
                        </p>
                      </div>
                      <Badge variant={cls.students >= cls.capacity ? 'destructive' : 'secondary'}>
                        {cls.students}/{cls.capacity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhuma aula agendada para esta data.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
