
import React from 'react';
import { User, Mail, Phone, Calendar, Activity, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const profileData = {
    joinDate: '2024-01-01',
    plan: 'Premium',
    trainer: 'Carlos Silva',
    goals: ['Perder peso', 'Ganhar massa muscular', 'Melhorar condicionamento'],
    stats: {
      workoutsCompleted: 45,
      attendanceRate: 89,
      currentWeight: 70,
      targetWeight: 65,
      muscleGain: 2.5
    }
  };

  const biometryData = {
    weight: 70,
    height: 1.65,
    bodyFat: 18.5,
    muscleMass: 45.2,
    lastUpdate: '2024-01-20'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
        <p className="text-gray-600 mt-2">Informações pessoais e dados corporais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">Aluno {profileData.plan}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user?.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">Membro desde {profileData.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">Treinador: {profileData.trainer}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Editar Perfil
            </Button>
          </CardContent>
        </Card>

        {/* Dados Corporais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Bioimpedância
            </CardTitle>
            <CardDescription>
              Última atualização: {biometryData.lastUpdate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <h4 className="text-2xl font-bold text-blue-600">{biometryData.weight}kg</h4>
                <p className="text-sm text-gray-600">Peso Atual</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <h4 className="text-2xl font-bold text-green-600">{biometryData.height}m</h4>
                <p className="text-sm text-gray-600">Altura</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <h4 className="text-2xl font-bold text-yellow-600">{biometryData.bodyFat}%</h4>
                <p className="text-sm text-gray-600">Gordura Corporal</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <h4 className="text-2xl font-bold text-purple-600">{biometryData.muscleMass}kg</h4>
                <p className="text-sm text-gray-600">Massa Muscular</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Atualizar Dados
            </Button>
          </CardContent>
        </Card>

        {/* Estatísticas e Metas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Progresso e Metas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Treinos Concluídos</span>
                <span>{profileData.stats.workoutsCompleted}</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Taxa de Frequência</span>
                <span>{profileData.stats.attendanceRate}%</span>
              </div>
              <Progress value={profileData.stats.attendanceRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Meta de Peso</span>
                <span>{profileData.stats.currentWeight}kg → {profileData.stats.targetWeight}kg</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            <div className="pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Objetivos</h4>
              <div className="space-y-1">
                {profileData.goals.map((goal, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {goal}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
