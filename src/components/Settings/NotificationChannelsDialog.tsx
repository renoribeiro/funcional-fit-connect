
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Mail, Smartphone, Bell } from 'lucide-react';

interface ChannelConfig {
  email: {
    enabled: boolean;
    template: string;
  };
  whatsapp: {
    enabled: boolean;
    template: string;
  };
  push: {
    enabled: boolean;
    template: string;
  };
  sms: {
    enabled: boolean;
    template: string;
  };
}

interface NotificationChannelsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationChannelsDialog: React.FC<NotificationChannelsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [config, setConfig] = useState<ChannelConfig>(() => {
    const saved = localStorage.getItem('notification_channels_config');
    return saved ? JSON.parse(saved) : {
      email: {
        enabled: true,
        template: 'Olá {nome}, você tem uma aula de {aula} agendada para {data} às {hora}. Local: {local}.',
      },
      whatsapp: {
        enabled: true,
        template: '🏃‍♂️ Lembrete: Sua aula de {aula} será em {tempo}! Local: {local}',
      },
      push: {
        enabled: true,
        template: 'Sua aula de {aula} começará em breve! 💪',
      },
      sms: {
        enabled: false,
        template: 'Lembrete: Aula de {aula} em {tempo}. Local: {local}',
      },
    };
  });

  const handleSave = () => {
    localStorage.setItem('notification_channels_config', JSON.stringify(config));
    
    const enabledChannels = Object.entries(config)
      .filter(([_, channel]) => channel.enabled)
      .map(([name]) => {
        switch (name) {
          case 'email': return 'Email';
          case 'whatsapp': return 'WhatsApp';
          case 'push': return 'Push';
          case 'sms': return 'SMS';
          default: return name;
        }
      });

    toast({
      title: "Configuração Salva",
      description: `Canais ativos: ${enabledChannels.join(', ')}`,
    });
    onOpenChange(false);
  };

  const updateChannelConfig = (channel: keyof ChannelConfig, field: 'enabled' | 'template', value: boolean | string) => {
    setConfig(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [field]: value,
      },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            Canais de Envio
          </DialogTitle>
          <DialogDescription>
            Configure os canais de comunicação para envio de lembretes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <Label className="text-base font-medium">Email</Label>
              </div>
              <Switch
                checked={config.email.enabled}
                onCheckedChange={(checked) => updateChannelConfig('email', 'enabled', checked)}
              />
            </div>
            {config.email.enabled && (
              <div className="space-y-2">
                <Label className="text-sm">Template da Mensagem</Label>
                <Textarea
                  value={config.email.template}
                  onChange={(e) => updateChannelConfig('email', 'template', e.target.value)}
                  placeholder="Digite o template do email..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Variáveis disponíveis: {'{nome}'}, {'{aula}'}, {'{data}'}, {'{hora}'}, {'{local}'}, {'{tempo}'}
                </p>
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <Label className="text-base font-medium">WhatsApp</Label>
              </div>
              <Switch
                checked={config.whatsapp.enabled}
                onCheckedChange={(checked) => updateChannelConfig('whatsapp', 'enabled', checked)}
              />
            </div>
            {config.whatsapp.enabled && (
              <div className="space-y-2">
                <Label className="text-sm">Template da Mensagem</Label>
                <Textarea
                  value={config.whatsapp.template}
                  onChange={(e) => updateChannelConfig('whatsapp', 'template', e.target.value)}
                  placeholder="Digite o template do WhatsApp..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Variáveis disponíveis: {'{nome}'}, {'{aula}'}, {'{data}'}, {'{hora}'}, {'{local}'}, {'{tempo}'}
                </p>
              </div>
            )}
          </div>

          {/* Push Notifications */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-600" />
                <Label className="text-base font-medium">Push Notification</Label>
              </div>
              <Switch
                checked={config.push.enabled}
                onCheckedChange={(checked) => updateChannelConfig('push', 'enabled', checked)}
              />
            </div>
            {config.push.enabled && (
              <div className="space-y-2">
                <Label className="text-sm">Template da Mensagem</Label>
                <Textarea
                  value={config.push.template}
                  onChange={(e) => updateChannelConfig('push', 'template', e.target.value)}
                  placeholder="Digite o template da notificação push..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Variáveis disponíveis: {'{nome}'}, {'{aula}'}, {'{data}'}, {'{hora}'}, {'{local}'}, {'{tempo}'}
                </p>
              </div>
            )}
          </div>

          {/* SMS */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-purple-600" />
                <Label className="text-base font-medium">SMS</Label>
              </div>
              <Switch
                checked={config.sms.enabled}
                onCheckedChange={(checked) => updateChannelConfig('sms', 'enabled', checked)}
              />
            </div>
            {config.sms.enabled && (
              <div className="space-y-2">
                <Label className="text-sm">Template da Mensagem</Label>
                <Textarea
                  value={config.sms.template}
                  onChange={(e) => updateChannelConfig('sms', 'template', e.target.value)}
                  placeholder="Digite o template do SMS..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Variáveis disponíveis: {'{nome}'}, {'{aula}'}, {'{data}'}, {'{hora}'}, {'{local}'}, {'{tempo}'}. SMS tem limite de caracteres.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
