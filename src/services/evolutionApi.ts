export interface WhatsAppConfig {
  apiKey: string;
  instanceName: string;
  serverUrl: string;
  webhookUrl?: string;
  templates?: {
    paymentReminder: string;
    welcomeMessage: string;
    workoutReminder: string;
    adminNotification: string;
  };
}

export interface SendMessageParams {
  number: string;
  text: string;
}

export interface MessageResponse {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: {
    conversation: string;
  };
  messageTimestamp: number;
  status: string;
}

export class EvolutionApiService {
  private config: WhatsAppConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    const savedConfig = localStorage.getItem('whatsapp_config');
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
    }
  }

  public saveConfig(config: WhatsAppConfig): void {
    this.config = config;
    localStorage.setItem('whatsapp_config', JSON.stringify(config));
  }

  public getConfig(): WhatsAppConfig | null {
    return this.config;
  }

  public isConfigured(): boolean {
    return !!(this.config?.apiKey && this.config?.instanceName && this.config?.serverUrl);
  }

  public async sendTextMessage(params: SendMessageParams): Promise<MessageResponse> {
    if (!this.isConfigured()) {
      throw new Error('WhatsApp não está configurado');
    }

    const { number, text } = params;
    const { apiKey, instanceName, serverUrl } = this.config!;

    try {
      const response = await fetch(`${serverUrl}/message/sendText/${instanceName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
        },
        body: JSON.stringify({
          number: number,
          text: text,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${error}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao enviar mensagem WhatsApp:', error);
      throw error;
    }
  }

  public async sendPaymentReminder(studentName: string, studentPhone: string, plan: string, dueDate: string): Promise<void> {
    const template = this.config?.templates?.paymentReminder || 
      'Olá {NOME}! Seu pagamento do plano {PLANO} vence em {DATA}. Não esqueça de renovar!';
    
    const message = template
      .replace('{NOME}', studentName)
      .replace('{PLANO}', plan)
      .replace('{DATA}', dueDate);
    
    await this.sendTextMessage({
      number: studentPhone,
      text: message,
    });
  }

  public async sendWelcomeMessage(studentName: string, studentPhone: string, plan: string): Promise<void> {
    const template = this.config?.templates?.welcomeMessage || 
      'Bem-vindo(a) {NOME}! Estamos felizes em tê-lo(a) conosco. Seu plano {PLANO} está ativo!';
    
    const message = template
      .replace('{NOME}', studentName)
      .replace('{PLANO}', plan);
    
    await this.sendTextMessage({
      number: studentPhone,
      text: message,
    });
  }

  public async sendWorkoutReminder(studentName: string, studentPhone: string, date: string, time: string): Promise<void> {
    const template = this.config?.templates?.workoutReminder || 
      'Olá {NOME}! Lembrando que você tem treino marcado para {DATA} às {HORA}.';
    
    const message = template
      .replace('{NOME}', studentName)
      .replace('{DATA}', date)
      .replace('{HORA}', time);
    
    await this.sendTextMessage({
      number: studentPhone,
      text: message,
    });
  }

  public async sendAdminNotification(adminPhone: string, message: string): Promise<void> {
    const template = this.config?.templates?.adminNotification || '[ADMIN] {MENSAGEM}';
    
    const finalMessage = template.replace('{MENSAGEM}', message);
    
    await this.sendTextMessage({
      number: adminPhone,
      text: finalMessage,
    });
  }

  public formatPhoneNumber(phone: string): string {
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Se não começar com 55 (DDI Brasil), adiciona
    if (!cleanPhone.startsWith('55')) {
      return `55${cleanPhone}`;
    }
    
    return cleanPhone;
  }
}

export const evolutionApi = new EvolutionApiService();
