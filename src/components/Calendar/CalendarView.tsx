
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Calcular o próximo mês
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

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

  // Custom day content para mostrar indicadores de aulas com hover
  const renderDay = (day: Date) => {
    const dayClasses = getClassesForDate(day);
    
    if (dayClasses.length === 0) {
      return (
        <button
          className="h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground rounded-md"
          onClick={() => onDateSelect(day)}
        >
          {day.getDate()}
        </button>
      );
    }

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <button
            className="relative h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground rounded-md flex items-center justify-center"
            onClick={() => onDateSelect(day)}
          >
            <span>{day.getDate()}</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">
              {day.getDate()} de {day.toLocaleDateString('pt-BR', { month: 'long' })}
            </h4>
            <div className="text-xs text-muted-foreground">
              {dayClasses.length} aula{dayClasses.length > 1 ? 's' : ''} agendada{dayClasses.length > 1 ? 's' : ''}
            </div>
            {dayClasses.slice(0, 3).map((cls) => (
              <div key={cls.id} className="space-y-1 border-b pb-2 last:border-b-0">
                <p className="font-medium text-sm">{cls.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{cls.time}</span>
                  <Users className="h-3 w-3 ml-2" />
                  <span>{cls.students}/{cls.capacity}</span>
                </div>
              </div>
            ))}
            {dayClasses.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{dayClasses.length - 3} aula{dayClasses.length - 3 > 1 ? 's' : ''} a mais
              </p>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário de Aulas</CardTitle>
        <CardDescription>
          Passe o mouse sobre as datas com aulas para ver um resumo. Clique na data para ver detalhes completos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendário do mês atual */}
          <div>
            <h3 className="font-semibold mb-3 text-center">
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
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
          </div>
          
          {/* Calendário do próximo mês */}
          <div>
            <h3 className="font-semibold mb-3 text-center">
              {nextMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              month={nextMonth}
              onMonthChange={(newMonth) => setCurrentMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() - 1, 1))}
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
          </div>
        </div>
        
        {selectedDate && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3 text-lg">
              Aulas do dia {selectedDate.toLocaleDateString('pt-BR')}
            </h4>
            {getClassesForDate(selectedDate).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getClassesForDate(selectedDate).map((cls) => (
                  <div key={cls.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-lg">{cls.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          Prof: {cls.instructor}
                        </p>
                      </div>
                      <Badge variant={cls.students >= cls.capacity ? 'destructive' : 'secondary'}>
                        {cls.students}/{cls.capacity}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{cls.time} ({cls.duration}min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{cls.students} alunos inscritos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{cls.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground">Nenhuma aula agendada para esta data.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
