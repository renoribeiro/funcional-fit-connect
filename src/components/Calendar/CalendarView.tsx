
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, CalendarDays, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { DayEventsDialog } from './DayEventsDialog';

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
  onEditClass?: (classData: Class) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  classes,
  onDateSelect,
  selectedDate,
  onEditClass,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dayEventsOpen, setDayEventsOpen] = useState(false);
  const [selectedDayForModal, setSelectedDayForModal] = useState<Date | null>(null);
  
  // Calcular o próximo mês
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  // Função para navegar meses
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

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

  // Função para lidar com clique no dia
  const handleDayClick = (date: Date) => {
    setSelectedDayForModal(date);
    setDayEventsOpen(true);
    onDateSelect(date);
  };

  // Função para obter os próximos 5 eventos
  const getUpcomingEvents = () => {
    const now = new Date();
    return classes
      .filter(cls => cls.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

  // Custom day content para mostrar indicadores de aulas com hover
  const renderDay = (day: Date) => {
    const dayClasses = getClassesForDate(day);
    
    if (dayClasses.length === 0) {
      return (
        <button
          className="h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground rounded-md"
          onClick={() => handleDayClick(day)}
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
            onClick={() => handleDayClick(day)}
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendário de Aulas</CardTitle>
          <CardDescription>
            Passe o mouse sobre as datas com aulas para ver um resumo. Clique na data para ver detalhes completos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Controles de navegação centralizados */}
          <div className="flex justify-center items-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="mr-4"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold mx-4">
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {nextMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="ml-4"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendários lado a lado em uma única linha */}
          <div className="grid grid-cols-2 gap-6">
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
                className="rounded-md border w-full [&_.rdp-nav]:hidden"
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
                className="rounded-md border w-full [&_.rdp-nav]:hidden"
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
        </CardContent>
      </Card>

      {/* Próximos 5 eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Próximos Eventos
          </CardTitle>
          <CardDescription>
            Os cinco próximos eventos agendados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getUpcomingEvents().length > 0 ? (
            <div className="space-y-3">
              {getUpcomingEvents().map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-medium">{cls.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Prof: {cls.instructor}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{cls.date.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{cls.location}</span>
                    </div>
                    <Badge variant={cls.students >= cls.capacity ? 'destructive' : 'secondary'}>
                      {cls.students}/{cls.capacity}
                    </Badge>
                    {onEditClass && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditClass(cls)}
                        className="ml-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum evento agendado nos próximos dias.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de eventos do dia */}
      <DayEventsDialog
        open={dayEventsOpen}
        onOpenChange={setDayEventsOpen}
        selectedDate={selectedDayForModal}
        dayClasses={selectedDayForModal ? getClassesForDate(selectedDayForModal) : []}
        onEditClass={onEditClass}
      />
    </div>
  );
};
