
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Calendar, Mail, Phone, User, Activity, Target, TrendingUp } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  lastWorkout: string;
}

interface ViewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

export const ViewStudentDialog: React.FC<ViewStudentDialogProps> = ({
  open,
  onOpenChange,
  student
}) => {
  if (!student) return null;

  // Mock data for demonstration
  const studentDetails = {
    phone: '+55 11 99999-9999',
    joinDate: '2024-01-15',
    trainer: 'Carlos Silva',
    workoutsCompleted: 32,
    attendanceRate: 85,
    currentWeight: 75,
    targetWeight: 70,
    bodyFat: 20.5,
    muscleMass: 42.8,
    goals: ['Perder peso', 'Ganhar massa muscular']
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                {student.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span>{student.name}</span>
              <Badge variant={student.status === 'Ativo' ? 'default' : 'secondary'} className="ml-2">
                {student.status}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            Perfil completo do aluno
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-blue-600" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{studentDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Membro desde {studentDetails.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Treinador: {studentDetails.trainer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Plano:</span>
                <Badge variant="outline">{student.plan}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-green-600" />
                Estatísticas de Treino
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Treinos Concluídos</span>
                  <span>{studentDetails.workoutsCompleted}</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Taxa de Frequência</span>
                  <span>{studentDetails.attendanceRate}%</span>
                </div>
                <Progress value={studentDetails.attendanceRate} className="h-2" />
              </div>
              <div className="text-sm text-gray-600">
                Último treino: {student.lastWorkout}
              </div>
            </CardContent>
          </Card>

          {/* Dados Corporais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Dados Corporais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-xl font-bold text-blue-600">{studentDetails.currentWeight}kg</h4>
                  <p className="text-xs text-gray-600">Peso Atual</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <h4 className="text-xl font-bold text-green-600">{studentDetails.targetWeight}kg</h4>
                  <p className="text-xs text-gray-600">Meta de Peso</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <h4 className="text-xl font-bold text-yellow-600">{studentDetails.bodyFat}%</h4>
                  <p className="text-xs text-gray-600">Gordura Corporal</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <h4 className="text-xl font-bold text-purple-600">{studentDetails.muscleMass}kg</h4>
                  <p className="text-xs text-gray-600">Massa Muscular</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objetivos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-orange-600" />
                Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {studentDetails.goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{goal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
