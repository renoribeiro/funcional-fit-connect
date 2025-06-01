
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/types/student';

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onSave: (student: Student) => void;
}

interface StudentForm {
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
  paymentMethod: 'Site' | 'Direto' | 'App' | 'PIX' | 'Cartão';
  dueDate?: string;
}

export const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSave
}) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, watch } = useForm<StudentForm>();

  React.useEffect(() => {
    if (student) {
      setValue('name', student.name);
      setValue('email', student.email);
      setValue('phone', student.phone || '');
      setValue('plan', student.plan);
      setValue('status', student.status);
      setValue('paymentMethod', student.paymentMethod);
      setValue('dueDate', student.dueDate || '');
    }
  }, [student, setValue]);

  const onSubmit = (data: StudentForm) => {
    if (student) {
      onSave({
        ...student,
        ...data
      });
      toast({
        title: "Aluno atualizado",
        description: "As informações do aluno foram atualizadas com sucesso.",
      });
      onOpenChange(false);
      reset();
    }
  };

  const watchedStatus = watch('status');
  const watchedPlan = watch('plan');
  const watchedPaymentMethod = watch('paymentMethod');

  const showDueDate = watchedPaymentMethod === 'Site' || watchedPaymentMethod === 'Direto';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Aluno</DialogTitle>
          <DialogDescription>
            Edite as informações do aluno aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              {...register('name', { required: true })}
              placeholder="Nome completo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { required: true })}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Plano</Label>
            <Select value={watchedPlan} onValueChange={(value) => setValue('plan', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Básico">Básico</SelectItem>
                <SelectItem value="Intermediário">Intermediário</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={watchedStatus} onValueChange={(value) => setValue('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
            <Select value={watchedPaymentMethod} onValueChange={(value: 'Site' | 'Direto' | 'App' | 'PIX' | 'Cartão') => setValue('paymentMethod', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Site">Site</SelectItem>
                <SelectItem value="Direto">Direto</SelectItem>
                <SelectItem value="App">App</SelectItem>
                <SelectItem value="PIX">PIX</SelectItem>
                <SelectItem value="Cartão">Cartão</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {showDueDate && (
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input
                id="dueDate"
                type="date"
                {...register('dueDate')}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Preview:</span>
            <Badge variant={watchedStatus === 'Ativo' ? 'default' : 'secondary'}>
              {watchedStatus || 'Status'}
            </Badge>
            <span className="text-xs text-gray-500">Plano: {watchedPlan || 'Não selecionado'}</span>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
