
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Clock, Bell } from 'lucide-react';

interface NotificationConfig {
  enabled: boolean;
  advanceTime: number;
  timeUnit: 'minutes' | 'hours' | 'days';
  autoReminder: boolean;
  reminderFrequency: number;
}

interface NotificationTimingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationTimingDialog: React.FC<NotificationTimingDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [config, setConfig] = useState<NotificationConfig>(() => {
    const saved = localStorage.getItem('notification_timing_config');
    return saved ? JSON.parse(saved) : {
      enabled: true,
      advanceTime: 2,
      timeUnit: 'hours',
      autoReminder: true,
      reminderFrequency: 30,
    };
  });

  const handleSave = () => {
    localStorage.setItem('notification_timing_config', JSON.stringify(config));
    toast({
      title: "Configuração Salva",
      description: `Notificações serão enviadas ${config.advanceTime} ${config.timeUnit === 'hours' ? 'hora(s)' : config.timeUnit === 'minutes' ? 'minuto(s)' : 'dia(s)'} antes da aula.`,
    });
    onOpenChange(false);
  };

  const getTimeUnitLabel = (unit: string) => {
    switch (unit) {
      case 'minutes': return 'Minutos';
      case 'hours': return 'Horas';
      case 'days': return 'Dias';
      default: return 'Horas';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Antecedência de Notificação
          </DialogTitle>
          <DialogDescription>
            Configure quando os alunos devem receber lembretes das aulas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Ativar/Desativar notificações */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Notificações Automáticas</Label>
              <p className="text-sm text-muted-foreground">
                Enviar lembretes automaticamente para os alunos
              </p>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
            />
          </div>

          {config.enabled && (
            <>
              {/* Tempo de antecedência */}
              <div className="space-y-3">
                <Label className="text-base">Tempo de Antecedência</Label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="number"
                      min="1"
                      max="48"
                      value={config.advanceTime}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        advanceTime: parseInt(e.target.value) || 1 
                      })}
                      placeholder="2"
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      value={config.timeUnit}
                      onValueChange={(value: 'minutes' | 'hours' | 'days') => 
                        setConfig({ ...config, timeUnit: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutos</SelectItem>
                        <SelectItem value="hours">Horas</SelectItem>
                        <SelectItem value="days">Dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Notificações serão enviadas {config.advanceTime} {getTimeUnitLabel(config.timeUnit).toLowerCase()} antes da aula
                </p>
              </div>

              {/* Lembrete adicional */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Lembrete Adicional</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar um segundo lembrete mais próximo da aula
                  </p>
                </div>
                <Switch
                  checked={config.autoReminder}
                  onCheckedChange={(checked) => setConfig({ ...config, autoReminder: checked })}
                />
              </div>

              {config.autoReminder && (
                <div className="space-y-3">
                  <Label className="text-base">Segundo Lembrete (minutos antes)</Label>
                  <Input
                    type="number"
                    min="5"
                    max="120"
                    value={config.reminderFrequency}
                    onChange={(e) => setConfig({ 
                      ...config, 
                      reminderFrequency: parseInt(e.target.value) || 30 
                    })}
                    placeholder="30"
                  />
                  <p className="text-sm text-muted-foreground">
                    Um lembrete adicional será enviado {config.reminderFrequency} minutos antes da aula
                  </p>
                </div>
              )}
            </>
          )}
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
