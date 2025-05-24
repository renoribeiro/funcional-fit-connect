
import React from 'react';
import { BarChart3, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const BiometryPage: React.FC = () => {
  const { toast } = useToast();

  const biometryData = [
    { id: 1, student: 'Maria Santos', lastUpdate: '2024-01-15', weight: 65, bodyFat: 18.5, muscleMass: 45.2, status: 'Atualizada' },
    { id: 2, student: 'João Silva', lastUpdate: '2024-01-10', weight: 80, bodyFat: 15.2, muscleMass: 62.1, status: 'Pendente' },
    { id: 3, student: 'Ana Costa', lastUpdate: '2024-01-20', weight: 58, bodyFat: 22.1, muscleMass: 38.7, status: 'Atualizada' },
    { id: 4, student: 'Carlos Oliveira', lastUpdate: '2024-01-05', weight: 75, bodyFat: 12.8, muscleMass: 58.9, status: 'Atrasada' },
  ];

  const handleNotifyStudent = (studentId: number) => {
    toast({
      title: "Notificação Enviada",
      description: "Aluno notificado para atualizar bioimpedância",
    });
  };

  const handleNotifyAll = () => {
    toast({
      title: "Notificações Enviadas",
      description: "Todos os alunos com dados atrasados foram notificados",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Controle de Bioimpedância</h1>
        <p className="text-gray-600 mt-2">Monitore os dados corporais dos alunos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{biometryData.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dados Atualizados</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {biometryData.filter(d => d.status === 'Atualizada').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {biometryData.filter(d => d.status === 'Pendente').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {biometryData.filter(d => d.status === 'Atrasada').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dados dos Alunos</h2>
        <Button onClick={handleNotifyAll} className="bg-green-600 hover:bg-green-700">
          Notificar Todos Pendentes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            Bioimpedância dos Alunos
          </CardTitle>
          <CardDescription>
            Dados corporais e status de atualização
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {biometryData.map((data) => (
              <div key={data.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{data.student}</h3>
                  <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-gray-600">
                    <span>Peso: {data.weight}kg</span>
                    <span>Gordura: {data.bodyFat}%</span>
                    <span>Massa Muscular: {data.muscleMass}kg</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Última atualização: {data.lastUpdate}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={
                      data.status === 'Atualizada' ? 'default' : 
                      data.status === 'Pendente' ? 'secondary' : 'destructive'
                    }
                  >
                    {data.status}
                  </Badge>
                  {data.status !== 'Atualizada' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleNotifyStudent(data.id)}
                    >
                      Notificar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
