
import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AttendancePage: React.FC = () => {
  const attendanceHistory = [
    { id: 1, date: '2024-01-22', class: 'Treinamento Funcional', time: '09:00', status: 'Presente', instructor: 'Carlos Silva' },
    { id: 2, date: '2024-01-20', class: 'HIIT Avançado', time: '10:30', status: 'Presente', instructor: 'Ana Costa' },
    { id: 3, date: '2024-01-18', class: 'Yoga & Pilates', time: '14:00', status: 'Ausente', instructor: 'Maria Santos' },
    { id: 4, date: '2024-01-15', class: 'CrossFit', time: '18:00', status: 'Presente', instructor: 'João Oliveira' },
    { id: 5, date: '2024-01-13', class: 'Treinamento Funcional', time: '09:00', status: 'Presente', instructor: 'Carlos Silva' },
  ];

  const upcomingClasses = [
    { id: 1, date: '2024-01-24', class: 'HIIT Avançado', time: '10:30', instructor: 'Ana Costa', location: 'Sala de Cardio' },
    { id: 2, date: '2024-01-25', class: 'Yoga & Pilates', time: '14:00', instructor: 'Maria Santos', location: 'Sala Zen' },
    { id: 3, date: '2024-01-27', class: 'CrossFit', time: '18:00', instructor: 'João Oliveira', location: 'Box CrossFit' },
  ];

  const attendanceStats = {
    total: attendanceHistory.length,
    present: attendanceHistory.filter(a => a.status === 'Presente').length,
    absent: attendanceHistory.filter(a => a.status === 'Ausente').length,
    rate: Math.round((attendanceHistory.filter(a => a.status === 'Presente').length / attendanceHistory.length) * 100)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Minha Frequência</h1>
        <p className="text-gray-600 mt-2">Acompanhe sua presença nas aulas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Aulas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{attendanceStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presenças</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faltas</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{attendanceStats.rate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Próximas Aulas
            </CardTitle>
            <CardDescription>
              Aulas agendadas para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_) => (
                <div key={class_.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{class_.class}</h3>
                      <p className="text-sm text-gray-600 mt-1">Professor: {class_.instructor}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {class_.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {class_.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {class_.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Histórico de Frequência
            </CardTitle>
            <CardDescription>
              Suas últimas participações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceHistory.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{record.class}</h3>
                    <p className="text-sm text-gray-600">Professor: {record.instructor}</p>
                    <p className="text-xs text-gray-500 mt-1">{record.date} às {record.time}</p>
                  </div>
                  <Badge 
                    variant={record.status === 'Presente' ? 'default' : 'destructive'}
                    className={record.status === 'Presente' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {record.status === 'Presente' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
