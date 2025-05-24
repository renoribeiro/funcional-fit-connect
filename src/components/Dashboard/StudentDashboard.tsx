
import React from 'react';
import { Activity, Calendar, MessageSquare, Video, FileText, CreditCard } from 'lucide-react';
import { StatCard } from './StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export const StudentDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Treinos Concluídos',
      value: 18,
      icon: Activity,
      trend: { value: 15, isPositive: true },
      color: 'success' as const
    },
    {
      title: 'Próxima Aula',
      value: 'Hoje 18h',
      icon: Calendar,
      color: 'primary' as const
    },
    {
      title: 'Mensagens',
      value: 3,
      icon: MessageSquare,
      color: 'warning' as const
    },
    {
      title: 'Frequência Mensal',
      value: '85%',
      icon: Activity,
      trend: { value: 5, isPositive: true },
      color: 'success' as const
    }
  ];

  const workoutPlan = [
    { day: 'Segunda', type: 'Treino Funcional', status: 'completed' },
    { day: 'Terça', type: 'HIIT', status: 'completed' },
    { day: 'Quarta', type: 'Yoga', status: 'pending' },
    { day: 'Quinta', type: 'Musculação', status: 'scheduled' },
    { day: 'Sexta', type: 'Cardio', status: 'scheduled' },
    { day: 'Sábado', type: 'Crossfit', status: 'scheduled' },
  ];

  const biometryData = {
    weight: 68.5,
    bodyFat: 18.2,
    muscleMass: 52.3,
    lastUpdate: '15/05/2024'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meu Dashboard</h1>
        <p className="text-gray-600 mt-2">Acompanhe seu progresso e atividades</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plano de Treino Semanal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-600" />
              Plano de Treino Semanal
            </CardTitle>
            <CardDescription>
              Sua rotina de exercícios desta semana
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workoutPlan.map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    workout.status === 'completed' ? 'bg-green-500' :
                    workout.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{workout.day}</p>
                    <p className="text-sm text-gray-600">{workout.type}</p>
                  </div>
                </div>
                <Badge variant={
                  workout.status === 'completed' ? 'default' :
                  workout.status === 'pending' ? 'secondary' : 'outline'
                }>
                  {workout.status === 'completed' ? 'Concluído' :
                   workout.status === 'pending' ? 'Pendente' : 'Agendado'}
                </Badge>
              </div>
            ))}
            <Button className="w-full mt-4">
              <Activity className="h-4 w-4 mr-2" />
              Iniciar Treino
            </Button>
          </CardContent>
        </Card>

        {/* Bioimpedância */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bioimpedância</CardTitle>
            <CardDescription>
              Última atualização: {biometryData.lastUpdate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Peso</span>
                  <span className="font-medium">{biometryData.weight} kg</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Gordura Corporal</span>
                  <span className="font-medium">{biometryData.bodyFat}%</span>
                </div>
                <Progress value={biometryData.bodyFat} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Massa Muscular</span>
                  <span className="font-medium">{biometryData.muscleMass} kg</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Atualizar Dados
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vídeos de Treino */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary-600" />
              Vídeos para Casa
            </CardTitle>
            <CardDescription>
              Treinos que você pode fazer em casa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'HIIT 15 minutos', duration: '15:30', level: 'Intermediário' },
              { title: 'Yoga Matinal', duration: '20:45', level: 'Iniciante' },
              { title: 'Treino Funcional', duration: '25:15', level: 'Avançado' },
            ].map((video, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">{video.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{video.duration}</span>
                    <span>•</span>
                    <span>{video.level}</span>
                  </div>
                </div>
                <Video className="h-5 w-5 text-primary-600" />
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver Todos os Vídeos
            </Button>
          </CardContent>
        </Card>

        {/* Status da Assinatura */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary-600" />
              Minha Assinatura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-green-800">Plano Premium</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <p className="text-sm text-green-700">Válido até: 15/06/2024</p>
              <p className="text-sm text-green-700">Próximo pagamento: 15/06/2024</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Benefícios inclusos:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Acesso ilimitado às aulas</li>
                <li>• Vídeos de treino em casa</li>
                <li>• Acompanhamento nutricional</li>
                <li>• Chat com professores</li>
              </ul>
            </div>
            
            <Button variant="outline" className="w-full">
              Gerenciar Assinatura
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
