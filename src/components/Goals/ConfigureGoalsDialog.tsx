
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const goalSchema = z.object({
  name: z.string().min(1, 'Nome da meta é obrigatório'),
  target: z.number().min(1, 'Meta deve ser maior que 0'),
  period: z.enum(['weekly', 'monthly'], {
    required_error: 'Período é obrigatório',
  }),
  type: z.enum(['number', 'currency', 'percentage'], {
    required_error: 'Tipo é obrigatório',
  }),
});

type GoalForm = z.infer<typeof goalSchema>;

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  progress: number;
  period: string;
  type: 'number' | 'currency' | 'percentage';
}

interface ConfigureGoalsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalData?: Goal | null;
  onSave: (goalData: Omit<Goal, 'id' | 'current' | 'progress'>) => void;
}

export const ConfigureGoalsDialog: React.FC<ConfigureGoalsDialogProps> = ({
  open,
  onOpenChange,
  goalData,
  onSave,
}) => {
  const form = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: goalData?.name || '',
      target: goalData?.target || 0,
      period: (goalData?.period.includes('Semanal') ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      type: goalData?.type || 'number',
    },
  });

  React.useEffect(() => {
    if (goalData) {
      form.reset({
        name: goalData.name,
        target: goalData.target,
        period: (goalData.period.includes('Semanal') ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        type: goalData.type,
      });
    } else {
      form.reset({
        name: '',
        target: 0,
        period: 'monthly',
        type: 'number',
      });
    }
  }, [goalData, form]);

  const onSubmit = (data: GoalForm) => {
    const periodText = data.period === 'weekly' ? 'Semanal' : 'Janeiro 2024';
    
    // Corrigindo o tipo - garantindo que todos os campos obrigatórios estão presentes
    onSave({
      name: data.name,
      target: data.target,
      type: data.type,
      period: periodText,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {goalData ? 'Editar Meta' : 'Nova Meta'}
          </DialogTitle>
          <DialogDescription>
            Configure uma nova meta para acompanhamento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Meta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Novos Alunos, Receita Mensal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor da Meta</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="number">Número</SelectItem>
                          <SelectItem value="currency">Moeda (R$)</SelectItem>
                          <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Meta</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
