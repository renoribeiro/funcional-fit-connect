
import React, { useState } from 'react';
import { Calendar, Plus, Clock, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const CalendarPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('2024-01-22');

  const classes = [
    { 
      id: 1, 
      name: 'Treinamento Funcional', 
      time: '09:00', 
      duration: 60, 
      students: 12, 
      capacity: 15,
      instructor: 'Carlos Silva',
      location: 'Sala Principal'
    },
    { 
      id: 2, 
      name: 'HIIT Avançado', 
      time: '10:30', 
      duration: 45, 
      students: 8, 
      capacity: 10,
      instructor: 'Ana Costa',
      location: 'Sala de Cardio'
    },
    { 
      id: 3, 
      name: 'Yoga & Pilates', 
      time: '14:00', 
      duration: 60, 
      students: 15, 
      capacity: 15,
      instructor: 'Maria Santos',
      location: 'Sala Zen'
    },
    { 
      id: 4, 
      name: 'CrossFit', 
      time: '18:00', 
      duration: 50, 
      students: 10, 
      capacity: 12,
      instructor: 'João Oliveira',
      location: 'Box CrossFit'
    },
  ];

  const handleAddClass = () => {
    toast({
      title: "Nova Aula",
      description: "Formulário de agendamento será aberto...",
    });
  };

  const handleEditClass = (classId: number) => {
    toast({
      title: "Editar Aula",
      description: `Editando aula ID: ${classId}`,
    });
  };

  const handleCancelClass = (classId: number) => {
    toast({
      title: "Aula Cancelada",
      description: "Alunos serão notificados sobre o cancelamento",
      variant: "destructive",
    });
  };

  const handleSendNotification = (classId: number) => {
    toast({
      title: "Notificação Enviada",
      description: "Lembrete enviado para todos os alunos da aula",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Calendário</h1>
        <p className="text-gray-600 mt-2">Agende e gerencie as aulas da assessoria</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Aulas de Hoje - {selectedDate}</h2>
        </div>
        <Button onClick={handleAddClass} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Agendar Aula
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((class_) => (
          <Card key={class_.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  {class_.name}
                </span>
                <Badge variant={class_.students >= class_.capacity ? 'destructive' : 'secondary'}>
                  {class_.students}/{class_.capacity}
                </Badge>
              </CardTitle>
              <CardDescription>
                Professor: {class_.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{class_.time} ({class_.duration}min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{class_.students} alunos</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{class_.location}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditClass(class_.id)}
                  className="flex-1"
                >
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSendNotification(class_.id)}
                  className="flex-1"
                >
                  Notificar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCancelClass(class_.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Notificação</CardTitle>
          <CardDescription>
            Configure quando e como os alunos recebem lembretes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Antecedência de Notificação</h4>
              <p className="text-sm text-gray-600 mb-3">Enviar lembretes 2 horas antes da aula</p>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Canais de Envio</h4>
              <p className="text-sm text-gray-600 mb-3">Push notification + WhatsApp</p>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
