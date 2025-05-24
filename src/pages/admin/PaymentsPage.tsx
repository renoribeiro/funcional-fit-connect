
import React, { useState } from 'react';
import { CreditCard, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const PaymentsPage: React.FC = () => {
  const { toast } = useToast();

  const payments = [
    { id: 1, student: 'Maria Santos', amount: 150, status: 'Pago', dueDate: '2024-01-15', paidDate: '2024-01-14' },
    { id: 2, student: 'João Silva', amount: 120, status: 'Pendente', dueDate: '2024-01-20', paidDate: null },
    { id: 3, student: 'Ana Costa', amount: 180, status: 'Atrasado', dueDate: '2024-01-10', paidDate: null },
    { id: 4, student: 'Carlos Oliveira', amount: 150, status: 'Pago', dueDate: '2024-01-18', paidDate: '2024-01-17' },
  ];

  const totalRevenue = payments.filter(p => p.status === 'Pago').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'Pendente').length;
  const overduePayments = payments.filter(p => p.status === 'Atrasado').length;

  const handleMarkAsPaid = (paymentId: number) => {
    toast({
      title: "Pagamento Confirmado",
      description: `Pagamento ID: ${paymentId} marcado como pago`,
    });
  };

  const handleSendReminder = (paymentId: number) => {
    toast({
      title: "Lembrete Enviado",
      description: "Lembrete de pagamento enviado por WhatsApp",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pendente':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Atrasado':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Pagamentos</h1>
        <p className="text-gray-600 mt-2">Controle de mensalidades e pagamentos dos alunos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Pagamentos confirmados este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando confirmação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Atrasados</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overduePayments}</div>
            <p className="text-xs text-muted-foreground">
              Precisam de atenção
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Lista de Pagamentos
          </CardTitle>
          <CardDescription>
            Histórico de pagamentos dos alunos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(payment.status)}
                    <h3 className="font-medium text-gray-900">{payment.student}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Valor: R$ {payment.amount} | Vencimento: {payment.dueDate}
                    {payment.paidDate && ` | Pago em: ${payment.paidDate}`}
                  </p>
                  <Badge 
                    variant={
                      payment.status === 'Pago' ? 'default' : 
                      payment.status === 'Pendente' ? 'secondary' : 'destructive'
                    }
                    className="mt-2"
                  >
                    {payment.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {payment.status !== 'Pago' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleMarkAsPaid(payment.id)}
                      >
                        Marcar como Pago
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSendReminder(payment.id)}
                      >
                        Enviar Lembrete
                      </Button>
                    </>
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
