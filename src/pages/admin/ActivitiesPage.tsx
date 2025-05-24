
import React from 'react';
import { Activity, TrendingUp, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const ActivitiesPage: React.FC = () => {
  const activities = [
    { id: 1, user: 'Maria Santos', action: 'Completou treino de HIIT', time: '2 min atrás', type: 'workout' },
    { id: 2, user: 'João Silva', action: 'Enviou mensagem', time: '5 min atrás', type: 'message' },
    { id: 3, user: 'Ana Costa', action: 'Confirmou presença na aula', time: '10 min atrás', type: 'attendance' },
    { id: 4, user: 'Carlos Oliveira', action: 'Atualizou bioimpedância', time: '15 min atrás', type: 'biometry' },
    { id: 5, user: 'Lucia Ferreira', action: 'Completou treino funcional', time: '20 min atrás', type: 'workout' },
    { id: 6, user: 'Pedro Santos', action: 'Fez pagamento da mensalidade', time: '25 min atrás', type: 'payment' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Atividades Recentes</h1>
        <p className="text-gray-600 mt-2">Acompanhe todas as ações dos usuários na plataforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividades Hoje</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">127</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treinos Concluídos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">45</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">89</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média por Hora</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Feed de Atividades
          </CardTitle>
          <CardDescription>
            Últimas ações dos usuários em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
