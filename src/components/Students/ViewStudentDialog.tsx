import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Phone, User, Activity, Target, TrendingUp, Settings } from 'lucide-react';
import { BiometryConfigDialog } from './BiometryConfigDialog';
import { Student } from '@/types/student';

interface ViewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onUpdateStudent?: (studentId: number, biometryConfig: Student['biometry']) => void;
}

export const ViewStudentDialog: React.FC<ViewStudentDialogProps> = ({
  open,
  onOpenChange,
  student,
  onUpdateStudent
}) => {
  const [biometryDialogOpen, setBiometryDialogOpen] = useState(false);

  if (!student) return null;

  // Mock data for demonstration
  const studentDetails = {
    phone: student.phone || '+55 11 99999-9999',
    joinDate: '2024-01-15',
    trainer: 'Carlos Silva',
    workoutsCompleted: 32,
    attendanceRate: 85,
    currentWeight: student.biometry?.weight || 75,
    targetWeight: 70,
    bodyFat: student.biometry?.bodyFat || 20.5,
    muscleMass: student.biometry?.muscleMass || 42.8,
    goals: ['Perder peso', 'Ganhar massa muscular']
  };

  const frequencyLabels = {
    weekly: 'Semanal',
    biweekly: 'Quinzenal',
    monthly: 'Mensal',
    quarterly: 'Trimestral'
  };

  const handleBiometrySave = (studentId: number, biometryConfig: Student['biometry']) => {
    if (onUpdateStudent) {
      onUpdateStudent(studentId, biometryConfig);
    }
  };

  return (
    <>
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
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Pagamento:</span>
                  <Badge variant="outline">{student.paymentMethod}</Badge>
                </div>
                {student.dueDate && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Vencimento:</span>
                    <span className="text-sm">{student.dueDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Configuração de Bioimpedância */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    Bioimpedância
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setBiometryDialogOpen(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.biometry?.enabled ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Frequência:</span>
                      <span className="text-sm">{frequencyLabels[student.biometry.frequency]}</span>
                    </div>
                    {student.biometry.lastUpdate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Última atualização:</span>
                        <span className="text-sm">{student.biometry.lastUpdate}</span>
                      </div>
                    )}
                    
                    {/* Dados corporais */}
                    {(student.biometry.weight || student.biometry.bodyFat || student.biometry.muscleMass) && (
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {student.biometry.weight && (
                          <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <h4 className="text-lg font-bold text-blue-600">{student.biometry.weight}kg</h4>
                            <p className="text-xs text-gray-600">Peso</p>
                          </div>
                        )}
                        {student.biometry.bodyFat && (
                          <div className="text-center p-2 bg-yellow-50 rounded-lg">
                            <h4 className="text-lg font-bold text-yellow-600">{student.biometry.bodyFat}%</h4>
                            <p className="text-xs text-gray-600">Gordura</p>
                          </div>
                        )}
                        {student.biometry.muscleMass && (
                          <div className="text-center p-2 bg-purple-50 rounded-lg">
                            <h4 className="text-lg font-bold text-purple-600">{student.biometry.muscleMass}kg</h4>
                            <p className="text-xs text-gray-600">Músculo</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Bioimpedância não configurada</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setBiometryDialogOpen(true)}
                    >
                      Ativar Monitoramento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
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

      <BiometryConfigDialog
        open={biometryDialogOpen}
        onOpenChange={setBiometryDialogOpen}
        student={student}
        onSave={handleBiometrySave}
      />
    </>
  );
};
