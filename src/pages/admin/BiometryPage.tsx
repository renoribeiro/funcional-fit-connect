
import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface BiometryStudent {
  id: number;
  student: string;
  lastUpdate: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  status: 'Atualizada' | 'Pendente' | 'Atrasada';
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  nextDueDate: string;
}

export const BiometryPage: React.FC = () => {
  const { toast } = useToast();

  // Dados simulados - apenas alunos com bioimpedância ativada
  const [biometryData] = useState<BiometryStudent[]>([
    { 
      id: 1, 
      student: 'Maria Santos', 
      lastUpdate: '2024-01-15', 
      weight: 65, 
      bodyFat: 18.5, 
      muscleMass: 45.2, 
      status: 'Atualizada',
      frequency: 'monthly',
      nextDueDate: '2024-02-15'
    },
    { 
      id: 2, 
      student: 'João Silva', 
      lastUpdate: '2024-01-10', 
      weight: 80, 
      bodyFat: 15.2, 
      muscleMass: 62.1, 
      status: 'Pendente',
      frequency: 'biweekly',
      nextDueDate: '2024-01-24'
    },
    { 
      id: 3, 
      student: 'Ana Costa', 
      lastUpdate: '2024-01-20', 
      weight: 58, 
      bodyFat: 22.1, 
      muscleMass: 38.7, 
      status: 'Atualizada',
      frequency: 'weekly',
      nextDueDate: '2024-01-27'
    },
    { 
      id: 4, 
      student: 'Carlos Oliveira', 
      lastUpdate: '2024-01-05', 
      weight: 75, 
      bodyFat: 12.8, 
      muscleMass: 58.9, 
      status: 'Atrasada',
      frequency: 'monthly',
      nextDueDate: '2024-02-05'
    },
  ]);

  const frequencyLabels = {
    weekly: 'Semanal',
    biweekly: 'Quinzenal',
    monthly: 'Mensal',
    quarterly: 'Trimestral'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Atualizada': return 'text-green-600';
      case 'Pendente': return 'text-yellow-600';
      case 'Atrasada': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleNotifyStudent = (studentId: number) => {
    const student = biometryData.find(s => s.id === studentId);
    toast({
      title: "Notificação Enviada",
      description: `${student?.student} foi notificado para atualizar bioimpedância`,
    });
  };

  const handleNotifyAll = () => {
    const pendingCount = biometryData.filter(d => d.status !== 'Atualizada').length;
    toast({
      title: "Notificações Enviadas",
      description: `${pendingCount} alunos com dados pendentes foram notificados`,
    });
  };

  const calculateDaysOverdue = (lastUpdate: string, frequency: string) => {
    const lastUpdateDate = new Date(lastUpdate);
    const today = new Date();
    const diffTime = today.getTime() - lastUpdateDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const frequencyDays = {
      weekly: 7,
      biweekly: 14,
      monthly: 30,
      quarterly: 90
    };
    
    return Math.max(0, diffDays - frequencyDays[frequency as keyof typeof frequencyDays]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Controle de Bioimpedância</h1>
        <p className="text-gray-600 mt-2">Monitore os dados corporais dos alunos com bioimpedância ativada</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Monitorados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{biometryData.length}</div>
            <p className="text-xs text-muted-foreground">Com bioimpedância ativa</p>
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
            <p className="text-xs text-muted-foreground">Em dia</p>
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
            <p className="text-xs text-muted-foreground">Próximo ao vencimento</p>
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
            <p className="text-xs text-muted-foreground">Necessita atualização</p>
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
            Dados corporais e status de atualização com frequência configurada
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
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Última atualização: {data.lastUpdate}</span>
                    <span>Frequência: {frequencyLabels[data.frequency]}</span>
                    <span>Próxima: {data.nextDueDate}</span>
                  </div>
                  {data.status === 'Atrasada' && (
                    <p className="text-xs text-red-600 mt-1">
                      {calculateDaysOverdue(data.lastUpdate, data.frequency)} dias em atraso
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={
                      data.status === 'Atualizada' ? 'default' : 
                      data.status === 'Pendente' ? 'secondary' : 'destructive'
                    }
                    className={getStatusColor(data.status)}
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
