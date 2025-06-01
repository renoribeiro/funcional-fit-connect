
export interface Student {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  lastWorkout: string;
  paymentMethod: 'Site' | 'Direto' | 'App' | 'PIX' | 'Cartão';
  dueDate?: string; // Only for Site and Direto
  phone?: string; // For WhatsApp reminders
}
