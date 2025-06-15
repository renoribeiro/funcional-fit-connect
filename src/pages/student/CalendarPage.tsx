
import React, { useState } from 'react';
import { CalendarView } from '@/components/Calendar/CalendarView';
import { useAuth } from '@/contexts/AuthContext';

// Mock data de aulas para o aluno
const studentClasses = [
  { id: 1, name: 'Treinamento Funcional', time: '09:00', duration: 60, students: 10, capacity: 15, instructor: 'Carlos Silva', location: 'Sala Principal', date: new Date('2025-06-16') },
  { id: 2, name: 'HIIT Avançado', time: '10:30', duration: 45, students: 8, capacity: 10, instructor: 'Ana Costa', location: 'Sala de Cardio', date: new Date('2025-06-18') },
  { id: 3, name: 'Yoga & Pilates', time: '14:00', duration: 60, students: 12, capacity: 12, instructor: 'Maria Santos', location: 'Sala Zen', date: new Date('2025-06-20') },
  { id: 4, name: 'Treinamento Funcional', time: '09:00', duration: 60, students: 10, capacity: 15, instructor: 'Carlos Silva', location: 'Sala Principal', date: new Date('2025-06-23') },
  { id: 5, name: 'HIIT Avançado', time: '10:30', duration: 45, students: 8, capacity: 10, instructor: 'Ana Costa', location: 'Sala de Cardio', date: new Date('2025-06-25') },
  { id: 6, name: 'Yoga & Pilates', time: '14:00', duration: 60, students: 12, capacity: 12, instructor: 'Maria Santos', location: 'Sala Zen', date: new Date('2025-06-27') },
];

export const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meu Calendário</h1>
        <p className="text-gray-600 mt-2">Veja suas aulas agendadas e planeje sua semana.</p>
      </div>
      <CalendarView
        classes={studentClasses}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    </div>
  );
};

