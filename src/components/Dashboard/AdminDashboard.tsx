
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, TrendingUp, Activity, Bell } from 'lucide-react';
import { StatCard } from './StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // Handlers navegação para páginas
  const handleViewAllActivities = () => {
    navigate('/activities');
  };

  const handleManageCalendar = () => {
    navigate('/calendar');
  };

  const handleViewAllStudents = () => {
    navigate('/students');
  };

  const handleManagePayments = () => {
    navigate('/payments');
  };

  const handleManageBiometry = () => {
    navigate('/biometry');
  };

  const handleViewGoals = () => {
    navigate('/goals');
  };

  // Handlers para alertas específicos
  const handleVerifyPayments = () => {
    navigate('/payments');
    toast({
      title: "Pagamentos",
      description: "Redirecionando para página de pagamentos...",
    });
  };

  const handleNotifyBioimpedance = () => {
    navigate('/biometry');
    toast({
      title: "Bioimpedância",
      description: "Redirecionando para controle de bioimpedância...",
    });
  };

  const handleViewMonthlyGoals = () => {
    navigate('/goals');
    toast({
      title: "Metas",
      description: "Redirecionando para página de metas...",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
        <p className="text-muted-foreground mt-2">Visão geral da sua assessoria esportiva</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} onClick={() => {
            if (stat.title === 'Total de Alunos') handleViewAllStudents();
            else if (stat.title === 'Aulas Hoje') handleManageCalendar();
            else if (stat.title === 'Receita Mensal') handleManagePayments();
          }} className="cursor-pointer">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Activity className="h-5 w-5 text-primary" />
              Atividades Recentes
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Últimas ações dos usuários na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" onClick={handleViewAllActivities}>
              Ver todas as atividades
            </Button>
          </CardContent>
        </Card>

        {/* Aulas de Hoje */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Aulas de Hoje
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Cronograma de aulas programadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div key={class_.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-card-foreground">{class_.name}</p>
                  <p className="text-sm text-muted-foreground">{class_.time}</p>
                </div>
                <div className="text-right">
                  <Badge variant={class_.students >= class_.capacity ? 'destructive' : 'secondary'}>
                    {class_.students}/{class_.capacity}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">alunos</p>
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
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Bell className="h-5 w-5 text-primary" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Pagamentos Pendentes</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">5 alunos com mensalidades em atraso</p>
              <Button size="sm" variant="outline" className="mt-2" onClick={handleVerifyPayments}>
                Verificar
              </Button>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Bioimpedâncias</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">12 alunos precisam atualizar dados</p>
              <Button size="sm" variant="outline" className="mt-2" onClick={handleNotifyBioimpedance}>
                Notificar
              </Button>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Meta Mensal</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">85% da meta de novos alunos atingida</p>
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
