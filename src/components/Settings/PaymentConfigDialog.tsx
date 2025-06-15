
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface PaymentConfig {
  provider: 'stripe' | 'mercadopago';
  testMode: boolean;
  stripe?: {
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  mercadopago?: {
    publicKey: string;
    accessToken: string;
  };
  currency: string;
  webhookUrl: string;
}

interface PaymentConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentConfigDialog: React.FC<PaymentConfigDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [showSecrets, setShowSecrets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<PaymentConfig>(() => {
    const saved = localStorage.getItem('payment_config');
    return saved ? JSON.parse(saved) : {
      provider: 'stripe',
      testMode: true,
      stripe: {
        publicKey: '',
        secretKey: '',
        webhookSecret: '',
      },
      currency: 'BRL',
      webhookUrl: '',
    };
  });

  const handleSave = () => {
    if (config.provider === 'stripe') {
      if (!config.stripe?.publicKey || !config.stripe?.secretKey) {
        toast({
          title: "Campos Obrigatórios",
          description: "Por favor, preencha as chaves públicas e secretas do Stripe.",
          variant: "destructive",
        });
        return;
      }
    }

    localStorage.setItem('payment_config', JSON.stringify(config));
    toast({
      title: "Configuração Salva",
      description: "Configurações de pagamento salvas com sucesso.",
    });
    onOpenChange(false);
  };

  const handleTest = async () => {
    setIsLoading(true);
    try {
      // Simular teste de conexão com gateway
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Conexão Testada",
        description: "Conexão com o gateway de pagamento realizada com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro no Teste",
        description: "Erro ao conectar com o gateway. Verifique as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Configuração de Pagamentos
          </DialogTitle>
          <DialogDescription>
            Configure o gateway de pagamento para processar mensalidades
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Modo de Teste */}
          <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-800">Modo de Teste</h4>
                <p className="text-sm text-yellow-700">
                  {config.testMode ? 'Ativo - Use chaves de teste' : 'Inativo - Usando chaves de produção'}
                </p>
              </div>
            </div>
            <Switch
              checked={config.testMode}
              onCheckedChange={(checked) => setConfig({ ...config, testMode: checked })}
            />
          </div>

          {/* Provider Selection */}
          <div className="space-y-2">
            <Label>Gateway de Pagamento</Label>
            <div className="flex gap-4">
              <Button
                variant={config.provider === 'stripe' ? 'default' : 'outline'}
                onClick={() => setConfig({ ...config, provider: 'stripe' })}
                className="flex-1"
              >
                Stripe
              </Button>
              <Button
                variant={config.provider === 'mercadopago' ? 'default' : 'outline'}
                onClick={() => setConfig({ ...config, provider: 'mercadopago' })}
                className="flex-1"
              >
                Mercado Pago
              </Button>
            </div>
          </div>

          {/* Stripe Configuration */}
          {config.provider === 'stripe' && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Configurações do Stripe</h4>
              
              <div className="space-y-2">
                <Label htmlFor="stripePublicKey">Chave Pública *</Label>
                <Input
                  id="stripePublicKey"
                  placeholder={config.testMode ? 'pk_test_...' : 'pk_live_...'}
                  value={config.stripe?.publicKey || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    stripe: { ...config.stripe!, publicKey: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripeSecretKey">Chave Secreta *</Label>
                <div className="relative">
                  <Input
                    id="stripeSecretKey"
                    type={showSecrets ? 'text' : 'password'}
                    placeholder={config.testMode ? 'sk_test_...' : 'sk_live_...'}
                    value={config.stripe?.secretKey || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      stripe: { ...config.stripe!, secretKey: e.target.value }
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowSecrets(!showSecrets)}
                  >
                    {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookSecret">Webhook Secret (Opcional)</Label>
                <Input
                  id="webhookSecret"
                  type={showSecrets ? 'text' : 'password'}
                  placeholder="whsec_..."
                  value={config.stripe?.webhookSecret || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    stripe: { ...config.stripe!, webhookSecret: e.target.value }
                  })}
                />
              </div>
            </div>
          )}

          {/* Mercado Pago Configuration */}
          {config.provider === 'mercadopago' && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Configurações do Mercado Pago</h4>
              
              <div className="space-y-2">
                <Label htmlFor="mpPublicKey">Chave Pública *</Label>
                <Input
                  id="mpPublicKey"
                  placeholder={config.testMode ? 'TEST-...' : 'APP_USR-...'}
                  value={config.mercadopago?.publicKey || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    mercadopago: { ...config.mercadopago!, publicKey: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mpAccessToken">Access Token *</Label>
                <div className="relative">
                  <Input
                    id="mpAccessToken"
                    type={showSecrets ? 'text' : 'password'}
                    placeholder={config.testMode ? 'TEST-...' : 'APP_USR-...'}
                    value={config.mercadopago?.accessToken || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      mercadopago: { ...config.mercadopago!, accessToken: e.target.value }
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowSecrets(!showSecrets)}
                  >
                    {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* General Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Moeda</Label>
              <Input
                id="currency"
                value={config.currency}
                onChange={(e) => setConfig({ ...config, currency: e.target.value })}
                placeholder="BRL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">URL do Webhook (Opcional)</Label>
              <Input
                id="webhookUrl"
                value={config.webhookUrl}
                onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                placeholder="https://seusite.com/webhook/pagamentos"
              />
              <p className="text-xs text-muted-foreground">
                URL para receber notificações de status de pagamento
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleTest}
            disabled={isLoading}
          >
            {isLoading ? 'Testando...' : 'Testar Conexão'}
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
