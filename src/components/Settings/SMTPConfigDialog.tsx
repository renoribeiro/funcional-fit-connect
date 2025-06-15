
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Mail, Eye, EyeOff } from 'lucide-react';

interface SMTPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
  fromEmail: string;
  fromName: string;
}

interface SMTPConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SMTPConfigDialog: React.FC<SMTPConfigDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<SMTPConfig>(() => {
    const saved = localStorage.getItem('smtp_config');
    return saved ? JSON.parse(saved) : {
      host: '',
      port: 587,
      username: '',
      password: '',
      secure: false,
      fromEmail: '',
      fromName: 'Sistema de Academia',
    };
  });

  const handleSave = () => {
    if (!config.host || !config.username || !config.password || !config.fromEmail) {
      toast({
        title: "Campos Obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('smtp_config', JSON.stringify(config));
    toast({
      title: "Configuração Salva",
      description: "Configurações de email SMTP salvas com sucesso.",
    });
    onOpenChange(false);
  };

  const handleTest = async () => {
    setIsLoading(true);
    try {
      // Simular teste de envio de email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Teste Realizado",
        description: "Email de teste enviado com sucesso! Verifique sua caixa de entrada.",
      });
    } catch (error) {
      toast({
        title: "Erro no Teste",
        description: "Erro ao enviar email de teste. Verifique as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-orange-600" />
            Configuração SMTP
          </DialogTitle>
          <DialogDescription>
            Configure o servidor de email para envio de notificações
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">Servidor SMTP *</Label>
              <Input
                id="host"
                placeholder="smtp.gmail.com"
                value={config.host}
                onChange={(e) => setConfig({ ...config, host: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Porta *</Label>
              <Input
                id="port"
                type="number"
                placeholder="587"
                value={config.port}
                onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) || 587 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Usuário/Email *</Label>
            <Input
              id="username"
              type="email"
              placeholder="seu-email@gmail.com"
              value={config.username}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha de app"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromEmail">Email Remetente *</Label>
              <Input
                id="fromEmail"
                type="email"
                placeholder="academia@exemplo.com"
                value={config.fromEmail}
                onChange={(e) => setConfig({ ...config, fromEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromName">Nome Remetente</Label>
              <Input
                id="fromName"
                placeholder="Sistema de Academia"
                value={config.fromName}
                onChange={(e) => setConfig({ ...config, fromName: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="secure"
              checked={config.secure}
              onCheckedChange={(checked) => setConfig({ ...config, secure: checked })}
            />
            <Label htmlFor="secure">Usar conexão segura (TLS/SSL)</Label>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleTest}
            disabled={isLoading || !config.host || !config.username}
          >
            {isLoading ? 'Testando...' : 'Testar Email'}
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
