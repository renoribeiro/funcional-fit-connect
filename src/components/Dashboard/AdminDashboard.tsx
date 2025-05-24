
import React from 'react';
import { Users, Calendar, MessageSquare, TrendingUp, Activity, Bell } from 'lucide-react';
import { StatCard } from './StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard: React.FC = () => {
  const { toast } = useToast();

  const stats = [
    {
      title: 'Total de Alunos',
      value: 156,
      icon: Users,
      trend: { value: 12, isPositive: true },
      color: 'primary' as const
    },
    {
      title: 'Aulas Hoje',
      value: 8,
      icon: Calendar,
      color: 'success' as const
    },
    {
      title: 'Mensagens Pendentes',
      value: 23,
      icon: MessageSquare,
      color: 'warning' as const
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.200',
      icon: TrendingUp,
      trend: { value: 8, isPositive: true },
      color: 'success' as const
    }
  ];

  const recentActivities = [
    { id: 1, user: 'Maria Santos', action: 'Completou treino de HIIT', time: '2 min atrás', type: 'workout' },
    { id: 2, user: 'João Silva', action: 'Enviou mensagem', time: '5 min atrás', type: 'message' },
    { id: 3, user: 'Ana Costa', action: 'Confirmou presença na aula', time: '10 min atrás', type: 'attendance' },
    { id: 4, user: 'Carlos Oliveira', action: 'Atualizou bioimpedância', time: '15 min atrás', type: 'biometry' },
  ];

  const upcomingClasses = [
    { id: 1, name: 'Treinamento Funcional', time: '09:00', students: 12, capacity: 15 },
    { id: 2, name: 'HIIT Avançado', time: '10:30', students: 8, capacity: 10 },
    { id: 3, name: 'Yoga & Pilates', time: '14:00', students: 15, capacity: 15 },
    { id: 4, name: 'Crossfit', time: '18:00', students: 10, capacity: 12 },
  ];

  // Handlers para os botões
  const handleViewAllActivities = () => {
    toast({
      title: "Atividades",
      description: "Redirecionando para página de atividades completa...",
    });
    console.log('Navegando para página de atividades');
    // Aqui seria implementada a navegação para a página de atividades
  };

  const handleManageCalendar = () => {
    toast({
      title: "Calendário",
      description: "Abrindo gerenciador de calendário...",
    });
    console.log('Abrindo gerenciador de calendário');
    // Aqui seria implementada a navegação para o calendário
  };

  const handleVerifyPayments = () => {
    toast({
      title: "Pagamentos Pendentes",
      description: "Verificando 5 pagamentos em atraso...",
    });
    console.log('Verificando pagamentos pendentes');
    // Aqui seria implementada a lógica de verificação de pagamentos
  };

  const handleNotifyBioimpedance = () => {
    toast({
      title: "Notificações Enviadas",
      description: "12 alunos foram notificados para atualizar bioimpedância",
    });
    console.log('Enviando notificações de bioimpedância');
    // Aqui seria implementada a lógica de envio de notificações
  };

  const handleViewMonthlyGoals = () => {
    toast({
      title: "Meta Mensal",
      description: "Exibindo detalhes da meta mensal...",
    });
    console.log('Visualizando detalhes da meta mensal');
    // Aqui seria implementada a navegação para detalhes da meta
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-2">Visão geral da sua assessoria esportiva</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary-600" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas ações dos usuários na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" onClick={handleViewAllActivities}>
              Ver todas as atividades
            </Button>
          </CardContent>
        </Card>

        {/* Aulas de Hoje */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-600" />
              Aulas de Hoje
            </CardTitle>
            <CardDescription>
              Cronograma de aulas programadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div key={class_.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{class_.name}</p>
                  <p className="text-sm text-gray-600">{class_.time}</p>
                </div>
                <div className="text-right">
                  <Badge variant={class_.students >= class_.capacity ? 'destructive' : 'secondary'}>
                    {class_.students}/{class_.capacity}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">alunos</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" onClick={handleManageCalendar}>
              <Calendar className="h-4 w-4 mr-2" />
              Gerenciar Calendário
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary-600" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800">Pagamentos Pendentes</h4>
              <p className="text-sm text-yellow-700 mt-1">5 alunos com mensalidades em atraso</p>
              <Button size="sm" variant="outline" className="mt-2" onClick={handleVerifyPayments}>
                Verificar
              </Button>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800">Bioimpedâncias</h4>
              <p className="text-sm text-blue-700 mt-1">12 alunos precisam atualizar dados</p>
              <Button size="sm" variant="outline" className="mt-2" onClick={handleNotifyBioimpedance}>
                Notificar
              </Button>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800">Meta Mensal</h4>
              <p className="text-sm text-green-700 mt-1">85% da meta de novos alunos atingida</p>
              <Button size="sm" variant="outline" className="mt-2" onClick={handleViewMonthlyGoals}>
                Detalhes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
