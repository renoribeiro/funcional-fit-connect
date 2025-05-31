
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, Edit } from 'lucide-react';

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

interface DayEventsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  dayClasses: Class[];
  onEditClass?: (classData: Class) => void;
}

export const DayEventsDialog: React.FC<DayEventsDialogProps> = ({
  open,
  onOpenChange,
  selectedDate,
  dayClasses,
  onEditClass,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Eventos de {selectedDate?.toLocaleDateString('pt-BR')}
          </DialogTitle>
          <DialogDescription>
            {dayClasses.length > 0 
              ? `${dayClasses.length} evento${dayClasses.length > 1 ? 's' : ''} encontrado${dayClasses.length > 1 ? 's' : ''}`
              : 'Nenhum evento encontrado para este dia'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {dayClasses.length > 0 ? (
            dayClasses.map((cls) => (
              <div key={cls.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{cls.name}</h3>
                    <p className="text-sm text-gray-600">Prof: {cls.instructor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={cls.students >= cls.capacity ? 'destructive' : 'secondary'}>
                      {cls.students}/{cls.capacity}
                    </Badge>
                    {onEditClass && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditClass(cls)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{cls.time} ({cls.duration}min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{cls.students} alunos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{cls.location}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="text-gray-400 mb-2">📅</div>
              <h3 className="font-medium text-gray-900 mb-1">Nenhum evento agendado</h3>
              <p className="text-sm text-gray-600">
                Não há eventos disponíveis para esta data.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
