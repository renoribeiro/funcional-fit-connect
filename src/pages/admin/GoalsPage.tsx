
import React from 'react';
import { Target, TrendingUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const GoalsPage: React.FC = () => {
  const monthlyGoals = [
    { id: 1, name: 'Novos Alunos', target: 20, current: 17, progress: 85, period: 'Janeiro 2024' },
    { id: 2, name: 'Receita Mensal', target: 50000, current: 42500, progress: 85, period: 'Janeiro 2024' },
    { id: 3, name: 'Frequência Média', target: 80, current: 72, progress: 90, period: 'Janeiro 2024' },
    { id: 4, name: 'Retenção de Alunos', target: 95, current: 88, progress: 93, period: 'Janeiro 2024' },
  ];

  const weeklyGoals = [
    { id: 1, name: 'Aulas Ministradas', target: 35, current: 32, progress: 91 },
    { id: 2, name: 'Check-ins de Alunos', target: 150, current: 134, progress: 89 },
    { id: 3, name: 'Mensagens Respondidas', target: 100, current: 95, progress: 95 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Metas e Objetivos</h1>
        <p className="text-gray-600 mt-2">Acompanhe o desempenho da assessoria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Principal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <p className="text-xs text-muted-foreground">
              Novos alunos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+12%</div>
            <p className="text-xs text-muted-foreground">
              Em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dias Restantes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">9</div>
            <p className="text-xs text-muted-foreground">
              Para o fim do mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">156</div>
            <p className="text-xs text-muted-foreground">
              Total cadastrados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Metas Mensais
            </CardTitle>
            <CardDescription>
              Progresso das principais metas de Janeiro 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {monthlyGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className="text-sm text-gray-500">
                    {goal.name === 'Receita Mensal' ? 
                      `R$ ${goal.current.toLocaleString()} / R$ ${goal.target.toLocaleString()}` :
                      `${goal.current} / ${goal.target}`
                    }
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{goal.progress}% concluído</span>
                  <span>{goal.period}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Metas Semanais
            </CardTitle>
            <CardDescription>
              Objetivos da semana atual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className="text-sm text-gray-500">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="text-xs text-gray-500">
                  {goal.progress}% concluído
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
