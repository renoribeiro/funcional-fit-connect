
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Activity, Calendar } from 'lucide-react';
import { Student } from '@/types/student';

interface BiometryConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onSave: (studentId: number, biometryConfig: Student['biometry']) => void;
}

export const BiometryConfigDialog: React.FC<BiometryConfigDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSave
}) => {
  const { toast } = useToast();
  
  const [config, setConfig] = useState({
    enabled: student?.biometry?.enabled || false,
    frequency: student?.biometry?.frequency || 'monthly' as const,
    weight: student?.biometry?.weight || '',
    bodyFat: student?.biometry?.bodyFat || '',
    muscleMass: student?.biometry?.muscleMass || ''
  });

  const frequencyLabels = {
    weekly: 'Semanal',
    biweekly: 'Quinzenal',
    monthly: 'Mensal',
    quarterly: 'Trimestral'
  };

  const handleSave = () => {
    if (!student) return;

    const biometryConfig: Student['biometry'] = {
      enabled: config.enabled,
      frequency: config.frequency,
      lastUpdate: new Date().toISOString().split('T')[0],
      ...(config.weight && { weight: Number(config.weight) }),
      ...(config.bodyFat && { bodyFat: Number(config.bodyFat) }),
      ...(config.muscleMass && { muscleMass: Number(config.muscleMass) })
    };

    onSave(student.id, biometryConfig);
    
    toast({
      title: "Bioimpedância Configurada",
      description: `Configuração de bioimpedância ${config.enabled ? 'ativada' : 'desativada'} para ${student.name}`,
    });
    
    onOpenChange(false);
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Configurar Bioimpedância - {student.name}
          </DialogTitle>
          <DialogDescription>
            Configure o monitoramento de bioimpedância para este aluno
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Ativar/Desativar bioimpedância */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Monitoramento de Bioimpedância</Label>
              <p className="text-sm text-muted-foreground">
                Ativar controle de dados corporais para este aluno
              </p>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
            />
          </div>

          {config.enabled && (
            <>
              {/* Frequência de atualização */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Frequência de Atualização
                </Label>
                <Select
                  value={config.frequency}
                  onValueChange={(value: 'weekly' | 'biweekly' | 'monthly' | 'quarterly') => 
                    setConfig({ ...config, frequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="biweekly">Quinzenal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Periodicidade para atualização dos dados corporais
                </p>
              </div>

              {/* Dados iniciais (opcional) */}
              <div className="space-y-4">
                <Label className="text-base">Dados Iniciais (Opcional)</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="70.0"
                      value={config.weight}
                      onChange={(e) => setConfig({ ...config, weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyFat" className="text-sm">Gordura (%)</Label>
                    <Input
                      id="bodyFat"
                      type="number"
                      step="0.1"
                      placeholder="18.5"
                      value={config.bodyFat}
                      onChange={(e) => setConfig({ ...config, bodyFat: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="muscleMass" className="text-sm">Músculo (kg)</Label>
                    <Input
                      id="muscleMass"
                      type="number"
                      step="0.1"
                      placeholder="45.2"
                      value={config.muscleMass}
                      onChange={(e) => setConfig({ ...config, muscleMass: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Configuração
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
