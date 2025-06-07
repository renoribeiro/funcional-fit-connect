import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, MapPin, Save, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/types/student';
import { AttendanceRecord, ClassAttendance } from '@/types/attendance';

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

interface AttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: Class | null;
  students: Student[];
}

export const AttendanceDialog: React.FC<AttendanceDialogProps> = ({
  open,
  onOpenChange,
  classData,
  students
}) => {
  const { toast } = useToast();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filtrar apenas alunos ativos/adimplentes
  const activeStudents = students.filter(student => 
    student.status === 'Ativo'
  );

  // Inicializar registros de frequência quando a aula for selecionada
  useEffect(() => {
    if (classData && open) {
      // Buscar frequência existente ou criar nova
      const existingAttendance = getExistingAttendance(classData.id);
      
      if (existingAttendance) {
        setAttendanceRecords(existingAttendance.records);
      } else {
        // Criar registros vazios para todos os alunos ativos
        const newRecords: AttendanceRecord[] = activeStudents.map(student => ({
          id: `${classData.id}-${student.id}-${classData.date.toISOString()}`,
          classId: classData.id,
          studentId: student.id,
          studentName: student.name,
          studentEmail: student.email,
          present: false,
          date: classData.date.toLocaleDateString('pt-BR'),
          time: classData.time
        }));
        setAttendanceRecords(newRecords);
      }
    }
  }, [classData, open, activeStudents]);

  // Simular busca de frequência existente (em um app real, seria uma API call)
  const getExistingAttendance = (classId: number): ClassAttendance | null => {
    const saved = localStorage.getItem(`attendance-${classId}`);
    return saved ? JSON.parse(saved) : null;
  };

  // Salvar frequência (em um app real, seria uma API call)
  const saveAttendance = async () => {
    if (!classData) return;

    setIsLoading(true);
    
    try {
      const attendanceData: ClassAttendance = {
        classId: classData.id,
        className: classData.name,
        date: classData.date.toLocaleDateString('pt-BR'),
        time: classData.time,
        instructor: classData.instructor,
        location: classData.location,
        records: attendanceRecords,
        totalStudents: attendanceRecords.length,
        presentStudents: attendanceRecords.filter(r => r.present).length
      };

      // Simular salvamento (localStorage para demonstração)
      localStorage.setItem(`attendance-${classData.id}`, JSON.stringify(attendanceData));
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Frequência Salva",
        description: `Frequência da aula "${classData.name}" foi registrada com sucesso.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: "Não foi possível salvar a frequência. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresenceChange = (studentId: number, present: boolean) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.studentId === studentId 
          ? { ...record, present }
          : record
      )
    );
  };

  const markAllPresent = () => {
    setAttendanceRecords(prev => 
      prev.map(record => ({ ...record, present: true }))
    );
  };

  const markAllAbsent = () => {
    setAttendanceRecords(prev => 
      prev.map(record => ({ ...record, present: false }))
    );
  };

  const presentCount = attendanceRecords.filter(r => r.present).length;
  const totalCount = attendanceRecords.length;

  if (!classData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registrar Frequência
          </DialogTitle>
          <DialogDescription>
            Marque a presença dos alunos na aula selecionada
          </DialogDescription>
        </DialogHeader>

        {/* Informações da Aula */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{classData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{classData.date.toLocaleDateString('pt-BR')} às {classData.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-gray-500" />
                <span>Prof: {classData.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{classData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo da Frequência */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              Presentes: {presentCount}/{totalCount}
            </Badge>
            <span className="text-sm text-gray-600">
              Taxa de presença: {totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}%
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllPresent}
              className="text-green-600 hover:text-green-700"
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Marcar Todos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAbsent}
              className="text-red-600 hover:text-red-700"
            >
              <UserX className="h-4 w-4 mr-1" />
              Desmarcar Todos
            </Button>
          </div>
        </div>

        {/* Lista de Alunos */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Alunos Matriculados ({totalCount})</h3>
          
          {attendanceRecords.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {attendanceRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{record.studentName}</h4>
                    <p className="text-sm text-gray-600">{record.studentEmail}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`student-${record.studentId}`}
                        checked={record.present}
                        onCheckedChange={(checked) => 
                          handlePresenceChange(record.studentId, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`student-${record.studentId}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Presente
                      </label>
                    </div>
                    
                    <Badge 
                      variant={record.present ? 'default' : 'secondary'}
                      className={record.present ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {record.present ? 'P' : 'A'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum aluno ativo encontrado
              </h3>
              <p className="text-gray-600">
                Não há alunos adimplentes/ativos para registrar frequência nesta aula.
              </p>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={saveAttendance}
            disabled={isLoading || attendanceRecords.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Frequência
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
