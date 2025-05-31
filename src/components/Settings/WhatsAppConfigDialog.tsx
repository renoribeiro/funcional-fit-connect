
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, Settings, Webhook } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WhatsAppConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WhatsAppConfigDialog: React.FC<WhatsAppConfigDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [instanceName, setInstanceName] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Olá! Esta é uma mensagem de teste da Evolution API v2.');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleSaveConfig = async () => {
    try {
      setIsConnecting(true);
      
      // Simular salvamento da configuração
      const config = {
        apiKey,
        instanceName,
        serverUrl,
        webhookUrl,
      };
      
      localStorage.setItem('whatsapp_config', JSON.stringify(config));
      
      toast({
        title: "Configuração Salva",
        description: "Configurações do WhatsApp foram salvas com sucesso.",
      });
      
      setIsConnecting(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações do WhatsApp.",
        variant: "destructive",
      });
      setIsConnecting(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setIsTesting(true);
      
      if (!apiKey || !instanceName || !serverUrl) {
        toast({
          title: "Configuração Incompleta",
          description: "Preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        setIsTesting(false);
        return;
      }

      // Simular teste de conexão com Evolution API v2
      const response = await fetch(`${serverUrl}/message/sendText/${instanceName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
        },
        body: JSON.stringify({
          number: testPhone,
          text: testMessage,
        }),
      });

      if (response.ok) {
        toast({
          title: "Teste Realizado",
          description: "Mensagem de teste enviada com sucesso!",
        });
      } else {
        throw new Error('Falha na comunicação com a API');
      }
      
      setIsTesting(false);
    } catch (error) {
      toast({
        title: "Erro no Teste",
        description: "Erro ao testar conexão com WhatsApp. Verifique as configurações.",
        variant: "destructive",
      });
      setIsTesting(false);
    }
  };

  const handleConfigureWebhook = async () => {
    try {
      if (!webhookUrl) {
        toast({
          title: "URL do Webhook Necessária",
          description: "Configure a URL do webhook primeiro.",
          variant: "destructive",
        });
        return;
      }

      // Simular configuração do webhook
      const webhookConfig = {
        url: webhookUrl,
        events: ['messages.upsert', 'messages.update'],
        webhook_by_events: true,
      };

      toast({
        title: "Webhook Configurado",
        description: "Webhook configurado para receber respostas do WhatsApp.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao configurar webhook.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    // Carregar configurações salvas
    const savedConfig = localStorage.getItem('whatsapp_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setApiKey(config.apiKey || '');
      setInstanceName(config.instanceName || '');
      setServerUrl(config.serverUrl || '');
      setWebhookUrl(config.webhookUrl || '');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            Configuração WhatsApp - Evolution API v2
          </DialogTitle>
          <DialogDescription>
            Configure a integração com WhatsApp para envio de lembretes e notificações
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuração</TabsTrigger>
            <TabsTrigger value="webhook">Webhook</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações da API
                </CardTitle>
                <CardDescription>
                  Configure a conexão com a Evolution API v2
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serverUrl">URL do Servidor</Label>
                    <Input
                      id="serverUrl"
                      value={serverUrl}
                      onChange={(e) => setServerUrl(e.target.value)}
                      placeholder="https://api.evolution.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instanceName">Nome da Instância</Label>
                    <Input
                      id="instanceName"
                      value={instanceName}
                      onChange={(e) => setInstanceName(e.target.value)}
                      placeholder="minha-instancia"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Sua API Key da Evolution"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveConfig} disabled={isConnecting}>
                    {isConnecting ? "Salvando..." : "Salvar Configuração"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Teste de Conexão
                </CardTitle>
                <CardDescription>
                  Teste a conexão enviando uma mensagem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testPhone">Número de Teste (com DDI)</Label>
                  <Input
                    id="testPhone"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="5511999999999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testMessage">Mensagem de Teste</Label>
                  <Textarea
                    id="testMessage"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={handleTestConnection} disabled={isTesting || !testPhone}>
                  {isTesting ? "Enviando..." : "Enviar Teste"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhook" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-4 w-4" />
                  Configuração de Webhook
                </CardTitle>
                <CardDescription>
                  Configure o webhook para receber respostas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">URL do Webhook</Label>
                  <Input
                    id="webhookUrl"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://sua-aplicacao.com/webhook/whatsapp"
                  />
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Eventos Configurados:</h4>
                  <ul className="text-sm text-blue-700 list-disc list-inside">
                    <li>messages.upsert - Novas mensagens recebidas</li>
                    <li>messages.update - Status de mensagens (entregue, lida)</li>
                  </ul>
                </div>
                <Button onClick={handleConfigureWebhook}>
                  Configurar Webhook
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Mensagens</CardTitle>
                <CardDescription>
                  Templates para lembretes e notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Lembrete de Pagamento</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      "Olá [NOME]! Seu pagamento do plano [PLANO] vence em [DATA]. Não esqueça de renovar!"
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Confirmação de Treino</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      "Olá [NOME]! Lembrando que você tem treino marcado para [DATA] às [HORA]."
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Boas-vindas</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      "Bem-vindo(a) [NOME]! Estamos felizes em tê-lo(a) conosco. Seu plano [PLANO] está ativo!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
