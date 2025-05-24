
import React from 'react';
import { Dumbbell, Clock, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const WorkoutPlanPage: React.FC = () => {
  const { toast } = useToast();

  const currentWorkout = {
    name: 'Treino Funcional - Semana 3',
    phase: 'Fortalecimento',
    startDate: '2024-01-15',
    duration: '4 semanas',
    progress: 75
  };

  const exercises = [
    { id: 1, name: 'Agachamento', sets: 3, reps: '12-15', rest: '60s', completed: true },
    { id: 2, name: 'Flexão de Braço', sets: 3, reps: '8-12', rest: '45s', completed: true },
    { id: 3, name: 'Prancha', sets: 3, reps: '30-45s', rest: '30s', completed: false },
    { id: 4, name: 'Burpee', sets: 3, reps: '8-10', rest: '90s', completed: false },
    { id: 5, name: 'Mountain Climber', sets: 3, reps: '20', rest: '45s', completed: false },
  ];

  const handleCompleteExercise = (exerciseId: number) => {
    toast({
      title: "Exercício Concluído!",
      description: "Ótimo trabalho! Continue assim.",
    });
  };

  const handleStartWorkout = () => {
    toast({
      title: "Treino Iniciado",
      description: "Boa sorte no seu treino de hoje!",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Minha Ficha de Treino</h1>
        <p className="text-gray-600 mt-2">Acompanhe seus exercícios e progresso</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Treino Atual
          </CardTitle>
          <CardDescription>
            Seu programa de treinamento personalizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <h3 className="font-medium text-gray-900">{currentWorkout.name}</h3>
              <p className="text-sm text-gray-600">Programa Atual</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-green-600">{currentWorkout.phase}</h3>
              <p className="text-sm text-gray-600">Fase</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-blue-600">{currentWorkout.duration}</h3>
              <p className="text-sm text-gray-600">Duração</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-purple-600">{currentWorkout.progress}%</h3>
              <p className="text-sm text-gray-600">Progresso</p>
            </div>
          </div>
          <Button onClick={handleStartWorkout} className="w-full bg-green-600 hover:bg-green-700">
            <Dumbbell className="h-4 w-4 mr-2" />
            Iniciar Treino de Hoje
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-green-600" />
            Exercícios de Hoje
          </CardTitle>
          <CardDescription>
            Série: Treino Funcional Completo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={exercise.id} className={`p-4 border rounded-lg ${exercise.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{exercise.sets} séries</span>
                        <span>{exercise.reps} repetições</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {exercise.rest} descanso
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {exercise.completed ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Concluído
                      </Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCompleteExercise(exercise.id)}
                      >
                        Marcar como Feito
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
