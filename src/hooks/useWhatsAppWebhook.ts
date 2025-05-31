
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WebhookMessage {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: {
    conversation?: string;
    extendedTextMessage?: {
      text: string;
    };
  };
  messageTimestamp: number;
  pushName: string;
}

interface WebhookData {
  instance: string;
  data: {
    key: any;
    message: any;
    messageTimestamp: number;
    status: string;
    participant?: string;
  };
  destination: string;
  date_time: string;
  sender: string;
  server_url: string;
  apikey: string;
}

export const useWhatsAppWebhook = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Função para processar mensagens recebidas via webhook
    const handleWebhookMessage = (webhookData: WebhookData) => {
      try {
        const { data } = webhookData;
        
        // Processar apenas mensagens recebidas (não enviadas)
        if (data.key.fromMe) return;
        
        const messageText = data.message?.conversation || 
                           data.message?.extendedTextMessage?.text || 
                           '';
        
        const senderPhone = data.key.remoteJid.replace('@s.whatsapp.net', '');
        
        console.log('Mensagem recebida via WhatsApp:', {
          phone: senderPhone,
          message: messageText,
          timestamp: data.messageTimestamp,
        });

        // Processar comandos ou respostas automáticas
        processIncomingMessage(senderPhone, messageText);
        
      } catch (error) {
        console.error('Erro ao processar webhook:', error);
      }
    };

    const processIncomingMessage = (phone: string, message: string) => {
      const lowerMessage = message.toLowerCase().trim();
      
      // Respostas automáticas baseadas no conteúdo da mensagem
      if (lowerMessage.includes('horario') || lowerMessage.includes('horário')) {
        // Responder com informações de horário
        toast({
          title: "Solicitação de Horário",
          description: `Cliente ${phone} solicitou informações de horário`,
        });
      }
      
      if (lowerMessage.includes('pagamento') || lowerMessage.includes('mensalidade')) {
        // Responder sobre pagamentos
        toast({
          title: "Dúvida sobre Pagamento",
          description: `Cliente ${phone} tem dúvidas sobre pagamento`,
        });
      }
      
      if (lowerMessage.includes('cancelar') || lowerMessage.includes('cancelamento')) {
        // Alerta para cancelamento
        toast({
          title: "Solicitação de Cancelamento",
          description: `ATENÇÃO: Cliente ${phone} mencionou cancelamento`,
          variant: "destructive",
        });
      }
    };

    // Simular recebimento de webhook (em produção, seria um endpoint real)
    const simulateWebhook = () => {
      // Esta função seria chamada pelo endpoint de webhook real
      console.log('Sistema de webhook WhatsApp inicializado');
    };

    simulateWebhook();

    // Cleanup não necessário para simulação
    return () => {};
  }, [toast]);

  // Função para responder automaticamente via webhook
  const sendAutoReply = async (phone: string, message: string) => {
    try {
      // Aqui você integraria com o serviço Evolution API
      console.log(`Resposta automática para ${phone}: ${message}`);
      
      toast({
        title: "Resposta Automática Enviada",
        description: `Mensagem enviada para ${phone}`,
      });
    } catch (error) {
      console.error('Erro ao enviar resposta automática:', error);
    }
  };

  return {
    sendAutoReply,
  };
};
