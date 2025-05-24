
import React from 'react';
import { Clipboard, CreditCard, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const SubscriptionPage: React.FC = () => {
  const { toast } = useToast();

  const subscription = {
    plan: 'Premium',
    status: 'Ativo',
    price: 180,
    nextPayment: '2024-02-15',
    daysLeft: 23,
    features: [
      'Acesso ilimitado às aulas',
      'Treinos personalizados',
      'Acompanhamento nutricional',
      'Área de vídeos completa',
      'Chat com outros alunos',
      'Suporte prioritário'
    ]
  };

  const paymentHistory = [
    { id: 1, date: '2024-01-15', amount: 180, status: 'Pago', method: 'Cartão de Crédito' },
    { id: 2, date: '2023-12-15', amount: 180, status: 'Pago', method: 'PIX' },
    { id: 3, date: '2023-11-15', amount: 180, status: 'Pago', method: 'Cartão de Crédito' },
  ];

  const availablePlans = [
    { name: 'Básico', price: 120, features: ['2x por semana', 'Treinos básicos'] },
    { name: 'Intermediário', price: 150, features: ['3x por semana', 'Treinos + nutricional'] },
    { name: 'Premium', price: 180, features: ['Ilimitado', 'Todos os benefícios'] },
  ];

  const handlePayNow = () => {
    toast({
      title: "Redirecionando para Pagamento",
      description: "Você será direcionado para o portal de pagamento...",
    });
  };

  const handleChangePlan = (planName: string) => {
    toast({
      title: "Alteração de Plano",
      description: `Solicitação para mudar para o plano ${planName} enviada`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Minha Assinatura</h1>
        <p className="text-gray-600 mt-2">Gerencie seu plano e pagamentos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status da Assinatura */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clipboard className="h-5 w-5 text-green-600" />
              Plano Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600">{subscription.plan}</h3>
              <Badge className="bg-green-100 text-green-800 mt-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                {subscription.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Valor Mensal:</span>
                <span className="font-medium">R$ {subscription.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Próximo Pagamento:</span>
                <span className="font-medium">{subscription.nextPayment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dias Restantes:</span>
                <span className="font-medium">{subscription.daysLeft} dias</span>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Benefícios Inclusos:</h4>
              <div className="space-y-1">
                {subscription.features.map((feature, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximo Pagamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Próximo Pagamento
            </CardTitle>
            <CardDescription>
              Vencimento em {subscription.daysLeft} dias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-blue-600">R$ {subscription.price}</h3>
              <p className="text-sm text-gray-600">Vence em {subscription.nextPayment}</p>
            </div>

            <Button onClick={handlePayNow} className="w-full bg-green-600 hover:bg-green-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Pagar Agora
            </Button>

            <div className="text-center">
              <Button variant="outline" size="sm">
                Alterar Forma de Pagamento
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Pagamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Histórico
            </CardTitle>
            <CardDescription>
              Últimos pagamentos realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">R$ {payment.amount}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                    <p className="text-xs text-gray-500">{payment.method}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {payment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outros Planos Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Outros Planos Disponíveis</CardTitle>
          <CardDescription>
            Considere mudar seu plano se desejar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availablePlans.map((plan) => (
              <div 
                key={plan.name} 
                className={`p-4 border rounded-lg ${
                  plan.name === subscription.plan ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="text-center mb-4">
                  <h3 className="font-medium text-gray-900">{plan.name}</h3>
                  <p className="text-2xl font-bold text-green-600">R$ {plan.price}</p>
                  <p className="text-sm text-gray-600">por mês</p>
                </div>
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
                {plan.name === subscription.plan ? (
                  <Badge className="w-full justify-center bg-green-100 text-green-800">
                    Plano Atual
                  </Badge>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleChangePlan(plan.name)}
                  >
                    Alterar para este plano
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
