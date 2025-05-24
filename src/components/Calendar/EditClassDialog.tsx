
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

const classSchema = z.object({
  name: z.string().min(1, 'Nome da aula é obrigatório'),
  time: z.string().min(1, 'Horário é obrigatório'),
  duration: z.number().min(1, 'Duração deve ser maior que 0'),
  capacity: z.number().min(1, 'Capacidade deve ser maior que 0'),
  instructor: z.string().min(1, 'Instrutor é obrigatório'),
  location: z.string().min(1, 'Local é obrigatório'),
});

type ClassForm = z.infer<typeof classSchema>;

interface Class {
  id: number;
  name: string;
  time: string;
  duration: number;
  students: number;
  capacity: number;
  instructor: string;
  location: string;
}

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: Class | null;
  onSave: (classData: Class) => void;
}

export const EditClassDialog: React.FC<EditClassDialogProps> = ({
  open,
  onOpenChange,
  classData,
  onSave,
}) => {
  const form = useForm<ClassForm>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: classData?.name || '',
      time: classData?.time || '',
      duration: classData?.duration || 60,
      capacity: classData?.capacity || 15,
      instructor: classData?.instructor || '',
      location: classData?.location || '',
    },
  });

  React.useEffect(() => {
    if (classData) {
      form.reset({
        name: classData.name,
        time: classData.time,
        duration: classData.duration,
        capacity: classData.capacity,
        instructor: classData.instructor,
        location: classData.location,
      });
    }
  }, [classData, form]);

  const onSubmit = (data: ClassForm) => {
    if (classData) {
      onSave({
        ...classData,
        ...data,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {classData ? 'Editar Aula' : 'Nova Aula'}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados da aula abaixo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Aula</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Treinamento Funcional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração (min)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instrutor</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um instrutor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Carlos Silva">Carlos Silva</SelectItem>
                        <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                        <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                        <SelectItem value="João Oliveira">João Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um local" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sala Principal">Sala Principal</SelectItem>
                        <SelectItem value="Sala de Cardio">Sala de Cardio</SelectItem>
                        <SelectItem value="Sala Zen">Sala Zen</SelectItem>
                        <SelectItem value="Box CrossFit">Box CrossFit</SelectItem>
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
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
