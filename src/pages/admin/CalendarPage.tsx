import React, { useState } from 'react';
import { Calendar, Plus, Clock, Users, MapPin, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { EditClassDialog } from '@/components/Calendar/EditClassDialog';
import { CalendarView } from '@/components/Calendar/CalendarView';

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

export const CalendarPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  
  // Estado das aulas com datas diferentes
  const [classes, setClasses] = useState<Class[]>([
    { 
      id: 1, 
      name: 'Treinamento Funcional', 
      time: '09:00', 
      duration: 60, 
      students: 12, 
      capacity: 15,
      instructor: 'Carlos Silva',
      location: 'Sala Principal',
      date: new Date()
    },
    { 
      id: 2, 
      name: 'HIIT Avançado', 
      time: '10:30', 
      duration: 45, 
      students: 8, 
      capacity: 10,
      instructor: 'Ana Costa',
      location: 'Sala de Cardio',
      date: new Date()
    },
    { 
      id: 3, 
      name: 'Yoga & Pilates', 
      time: '14:00', 
      duration: 60, 
      students: 15, 
      capacity: 15,
      instructor: 'Maria Santos',
      location: 'Sala Zen',
      date: new Date()
    },
    { 
      id: 4, 
      name: 'CrossFit', 
      time: '18:00', 
      duration: 50, 
      students: 10, 
      capacity: 12,
      instructor: 'João Oliveira',
      location: 'Box CrossFit',
      date: new Date()
    },
    // Aulas para outros dias
    { 
      id: 5, 
      name: 'Pilates Matinal', 
      time: '07:00', 
      duration: 50, 
      students: 8, 
      capacity: 12,
      instructor: 'Maria Santos',
      location: 'Sala Zen',
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // Amanhã
    },
    { 
      id: 6, 
      name: 'Musculação Iniciante', 
      time: '16:00', 
      duration: 60, 
      students: 6, 
      capacity: 8,
      instructor: 'Carlos Silva',
      location: 'Sala Principal',
      date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000) // Depois de amanhã
    },
    // Adicionar mais aulas para o próximo mês
    { 
      id: 7, 
      name: 'Spinning', 
      time: '19:00', 
      duration: 45, 
      students: 14, 
      capacity: 16,
      instructor: 'Ana Costa',
      location: 'Sala de Cardio',
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5) // Próximo mês
    },
    { 
      id: 8, 
      name: 'Funcional Avançado', 
      time: '08:00', 
      duration: 55, 
      students: 9, 
      capacity: 12,
      instructor: 'João Oliveira',
      location: 'Box CrossFit',
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10) // Próximo mês
    },
  ]);

  // Filtrar aulas do dia selecionado
  const todaysClasses = selectedDate ? classes.filter(
    cls => cls.date.toDateString() === selectedDate.toDateString()
  ) : [];

  const handleAddClass = () => {
    if (!selectedDate) {
      toast({
        title: "Selecione uma Data",
        description: "Por favor, selecione uma data no calendário para agendar uma aula.",
        variant: "destructive",
      });
      return;
    }
    setEditingClass(null);
    setEditDialogOpen(true);
  };

  const handleEditClass = (classData: Class) => {
    setEditingClass(classData);
    setEditDialogOpen(true);
  };

  const handleSaveClass = (classData: Class) => {
    if (editingClass) {
      // Editar aula existente
      setClasses(classes.map(cls => 
        cls.id === editingClass.id ? { ...classData, date: selectedDate || editingClass.date } : cls
      ));
      toast({
        title: "Aula Atualizada",
        description: `A aula "${classData.name}" foi atualizada com sucesso.`,
      });
    } else {
      // Adicionar nova aula
      const newClass: Class = {
        ...classData,
        id: Date.now(),
        students: 0,
        date: selectedDate || new Date(),
      };
      setClasses([...classes, newClass]);
      toast({
        title: "Aula Agendada",
        description: `A aula "${classData.name}" foi agendada com sucesso.`,
      });
    }
  };

  const handleCancelClass = (classId: number) => {
    setClasses(classes.filter(cls => cls.id !== classId));
    toast({
      title: "Aula Cancelada",
      description: "A aula foi cancelada e os alunos foram notificados.",
      variant: "destructive",
    });
  };

  const handleSendNotification = (classId: number) => {
    const classData = classes.find(cls => cls.id === classId);
    toast({
      title: "Notificação Enviada",
      description: `Lembrete da aula "${classData?.name}" enviado para todos os alunos.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Calendário</h1>
        <p className="text-gray-600 mt-2">Agende e gerencie as aulas da assessoria</p>
      </div>

      {/* Calendário com visualização das aulas */}
      <CalendarView
        classes={classes}
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
        onEditClass={handleEditClass}
      />

      {selectedDate && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                Gerenciar Aulas de {selectedDate.toLocaleDateString('pt-BR')}
              </h2>
            </div>
            <Button onClick={handleAddClass} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Agendar Aula
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {todaysClasses.map((class_) => (
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
                      onClick={() => handleEditClass(class_)}
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
            
            {todaysClasses.length === 0 && selectedDate && (
              <div className="col-span-2 text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma aula agendada
                </h3>
                <p className="text-gray-600 mb-4">
                  Não há aulas agendadas para {selectedDate.toLocaleDateString('pt-BR')}.
                </p>
                <Button onClick={handleAddClass} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Primeira Aula
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Configurações de Notificação */}
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
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Canais de Envio</h4>
              <p className="text-sm text-gray-600 mb-3">Push notification + WhatsApp</p>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog para editar/adicionar aulas */}
      <EditClassDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        classData={editingClass}
        onSave={handleSaveClass}
      />
    </div>
  );
};
