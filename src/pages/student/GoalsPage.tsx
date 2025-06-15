
import React from 'react';
import { Target, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export const GoalsPage: React.FC = () => {
  const currentGoals = [
    { title: 'Perder 5kg de gordura', progress: 60, target: '5kg', current: '3kg' },
    { title: 'Aumentar a frequência para 4x/semana', progress: 75, target: '4x', current: '3x' },
    { title: 'Correr 5km em menos de 30 minutos', progress: 40, target: '5km', current: '2km' },
  ];

  const achievedGoals = [
    { title: 'Completar 1 mês sem faltar', date: 'Março 2025' },
    { title: 'Aprender a fazer agachamento livre', date: 'Fevereiro 2025' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Minhas Metas</h1>
        <p className="text-gray-600 mt-2">Acompanhe seu progresso e mantenha o foco!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Metas Atuais
            </CardTitle>
            <CardDescription>Seu foco para as próximas semanas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-sm">{goal.title}</h4>
                  <span className="text-xs text-gray-500">{goal.current} / {goal.target}</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
             <Button variant="outline" className="w-full mt-4">
              Discutir novas metas com o professor
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Metas Concluídas
            </CardTitle>
            <CardDescription>Suas conquistas até agora</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievedGoals.map((goal, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">{goal.title}</p>
                    <p className="text-xs text-gray-500">Concluído em {goal.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
