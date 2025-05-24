
import React, { useState } from 'react';
import { Target, TrendingUp, Calendar, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ConfigureGoalsDialog } from '@/components/Goals/ConfigureGoalsDialog';

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  progress: number;
  period: string;
  type: 'number' | 'currency' | 'percentage';
}

export const GoalsPage: React.FC = () => {
  const { toast } = useToast();
  const [configureDialogOpen, setConfigureDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const [monthlyGoals, setMonthlyGoals] = useState<Goal[]>([
    { id: 1, name: 'Novos Alunos', target: 20, current: 17, progress: 85, period: 'Janeiro 2024', type: 'number' },
    { id: 2, name: 'Receita Mensal', target: 50000, current: 42500, progress: 85, period: 'Janeiro 2024', type: 'currency' },
    { id: 3, name: 'Frequência Média', target: 80, current: 72, progress: 90, period: 'Janeiro 2024', type: 'percentage' },
    { id: 4, name: 'Retenção de Alunos', target: 95, current: 88, progress: 93, period: 'Janeiro 2024', type: 'percentage' },
  ]);

  const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>([
    { id: 5, name: 'Aulas Ministradas', target: 35, current: 32, progress: 91, period: 'Semanal', type: 'number' },
    { id: 6, name: 'Check-ins de Alunos', target: 150, current: 134, progress: 89, period: 'Semanal', type: 'number' },
    { id: 7, name: 'Mensagens Respondidas', target: 100, current: 95, progress: 95, period: 'Semanal', type: 'number' },
  ]);

  const handleAddGoal = () => {
    setEditingGoal(null);
    setConfigureDialogOpen(true);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setConfigureDialogOpen(true);
  };

  const handleSaveGoal = (goalData: Omit<Goal, 'id' | 'current' | 'progress'>) => {
    if (editingGoal) {
      // Editar meta existente
      const updatedGoal = {
        ...editingGoal,
        ...goalData,
        progress: editingGoal.current > 0 ? Math.round((editingGoal.current / goalData.target) * 100) : 0,
      };

      if (goalData.period === 'Semanal') {
        setWeeklyGoals(weeklyGoals.map(goal => 
          goal.id === editingGoal.id ? updatedGoal : goal
        ));
      } else {
        setMonthlyGoals(monthlyGoals.map(goal => 
          goal.id === editingGoal.id ? updatedGoal : goal
        ));
      }

      toast({
        title: "Meta Atualizada",
        description: `A meta "${goalData.name}" foi atualizada com sucesso.`,
      });
    } else {
      // Adicionar nova meta
      const newGoal: Goal = {
        ...goalData,
        id: Date.now(),
        current: 0,
        progress: 0,
      };

      if (goalData.period === 'Semanal') {
        setWeeklyGoals([...weeklyGoals, newGoal]);
      } else {
        setMonthlyGoals([...monthlyGoals, newGoal]);
      }

      toast({
        title: "Meta Criada",
        description: `A meta "${goalData.name}" foi criada com sucesso.`,
      });
    }
  };

  const handleDeleteGoal = (goalId: number, isWeekly: boolean) => {
    if (isWeekly) {
      setWeeklyGoals(weeklyGoals.filter(goal => goal.id !== goalId));
    } else {
      setMonthlyGoals(monthlyGoals.filter(goal => goal.id !== goalId));
    }

    toast({
      title: "Meta Removida",
      description: "A meta foi removida com sucesso.",
      variant: "destructive",
    });
  };

  const formatGoalValue = (goal: Goal) => {
    switch (goal.type) {
      case 'currency':
        return `R$ ${goal.current.toLocaleString()} / R$ ${goal.target.toLocaleString()}`;
      case 'percentage':
        return `${goal.current}% / ${goal.target}%`;
      default:
        return `${goal.current} / ${goal.target}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metas e Objetivos</h1>
          <p className="text-gray-600 mt-2">Acompanhe e configure o desempenho da assessoria</p>
        </div>
        <Button onClick={handleAddGoal} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
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
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Metas Mensais
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddGoal}
              >
                <Plus className="h-4 w-4" />
              </Button>
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
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {formatGoalValue(goal)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditGoal(goal)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id, false)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
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
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Metas Semanais
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddGoal}
              >
                <Plus className="h-4 w-4" />
              </Button>
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
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {formatGoalValue(goal)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditGoal(goal)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id, true)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
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

      {/* Dialog para configurar metas */}
      <ConfigureGoalsDialog
        open={configureDialogOpen}
        onOpenChange={setConfigureDialogOpen}
        goalData={editingGoal}
        onSave={handleSaveGoal}
      />
    </div>
  );
};
