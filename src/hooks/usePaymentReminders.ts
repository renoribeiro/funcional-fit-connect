
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/types/student';

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
        // Aqui você integraria com a Evolution API v2
        console.log('Alunos com vencimento próximo:', studentsNearDue);
        
        // Simular envio de lembretes
        studentsNearDue.forEach(student => {
          sendPaymentReminder(student);
        });

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
      // Aqui você faria a integração real com Evolution API v2
      console.log(`Enviando lembrete para ${student.name} (${student.phone})`);
      
      // Simular chamada da API
      const response = await fetch('/api/evolution/send-reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: student.phone,
          message: `Olá ${student.name}! Seu pagamento do plano ${student.plan} vence em ${student.dueDate}. Não esqueça de renovar!`,
        }),
      });

      if (response.ok) {
        console.log(`Lembrete enviado com sucesso para ${student.name}`);
      }
    } catch (error) {
      console.error('Erro ao enviar lembrete:', error);
    }
  };

  const notifyAdmin = async (studentsNearDue: Student[]) => {
    try {
      const message = `Lembretes de pagamento enviados para ${studentsNearDue.length} aluno(s): ${studentsNearDue.map(s => s.name).join(', ')}`;
      
      // Simular notificação para admin
      console.log('Notificando admin:', message);
      
      toast({
        title: "Lembretes Enviados",
        description: message,
      });
    } catch (error) {
      console.error('Erro ao notificar admin:', error);
    }
  };
};
