
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/types/student';
import { evolutionApi } from '@/services/evolutionApi';

export const usePaymentReminders = (students: Student[]) => {
  const { toast } = useToast();

  useEffect(() => {
    const checkDueDates = () => {
      const today = new Date();
      const fiveDaysFromNow = new Date();
      fiveDaysFromNow.setDate(today.getDate() + 5);

      const studentsNearDue = students.filter(student => {
        if (!student.dueDate) return false;
        
        const dueDate = new Date(student.dueDate);
        return dueDate <= fiveDaysFromNow && dueDate >= today;
      });

      if (studentsNearDue.length > 0) {
        console.log('Alunos com vencimento próximo:', studentsNearDue);
        
        // Enviar lembretes via WhatsApp se configurado
        if (evolutionApi.isConfigured()) {
          studentsNearDue.forEach(student => {
            sendPaymentReminder(student);
          });
        } else {
          // Fallback para simulação se WhatsApp não estiver configurado
          studentsNearDue.forEach(student => {
            console.log(`Lembrete seria enviado para ${student.name} (${student.phone})`);
          });
        }

        // Notificar administrador
        notifyAdmin(studentsNearDue);
      }
    };

    // Verificar diariamente
    const interval = setInterval(checkDueDates, 24 * 60 * 60 * 1000);
    
    // Verificar imediatamente ao carregar
    checkDueDates();

    return () => clearInterval(interval);
  }, [students, toast]);

  const sendPaymentReminder = async (student: Student) => {
    try {
      if (!student.phone) {
        console.log(`Telefone não cadastrado para ${student.name}`);
        return;
      }

      const formattedPhone = evolutionApi.formatPhoneNumber(student.phone);
      
      await evolutionApi.sendPaymentReminder(
        student.name,
        formattedPhone,
        student.plan,
        student.dueDate!
      );

      console.log(`Lembrete de pagamento enviado para ${student.name}`);
    } catch (error) {
      console.error(`Erro ao enviar lembrete para ${student.name}:`, error);
      
      toast({
        title: "Erro no Lembrete",
        description: `Erro ao enviar lembrete para ${student.name}`,
        variant: "destructive",
      });
    }
  };

  const notifyAdmin = async (studentsNearDue: Student[]) => {
    try {
      const message = `Lembretes de pagamento enviados para ${studentsNearDue.length} aluno(s): ${studentsNearDue.map(s => s.name).join(', ')}`;
      
      console.log('Notificando admin:', message);
      
      // Enviar notificação para admin via WhatsApp se configurado
      if (evolutionApi.isConfigured()) {
        // Aqui você pode configurar o telefone do admin
        const adminPhone = '5511999999999'; // Configurar dinamicamente
        await evolutionApi.sendAdminNotification(adminPhone, message);
      }
      
      toast({
        title: "Lembretes Enviados",
        description: message,
      });
    } catch (error) {
      console.error('Erro ao notificar admin:', error);
    }
  };
};
