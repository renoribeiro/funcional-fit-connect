
import React, { useState } from 'react';
import { Send, MessageSquare, User, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export const MessagesPage: React.FC = () => {
  const { toast } = useToast();
  const [messageType, setMessageType] = useState<'professor' | 'admin'>('professor');
  const [message, setMessage] = useState('');

  const messageHistory = [
    {
      id: 1,
      to: 'Professor Carlos',
      message: 'Gostaria de ajustar meu treino para focar mais em cardio',
      response: 'Claro! Vamos conversar sobre isso na próxima aula.',
      date: '2024-01-20',
      status: 'Respondida'
    },
    {
      id: 2,
      to: 'Administração',
      message: 'Preciso alterar o dia da minha mensalidade',
      response: null,
      date: '2024-01-22',
      status: 'Aguardando'
    },
  ];

  const professors = [
    { id: 1, name: 'Carlos Silva', specialty: 'Treinamento Funcional' },
    { id: 2, name: 'Ana Costa', specialty: 'HIIT e Cardio' },
    { id: 3, name: 'Maria Santos', specialty: 'Yoga e Pilates' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Mensagem Enviada!",
        description: `Sua mensagem foi enviada para ${messageType === 'professor' ? 'o professor' : 'a administração'}`,
      });
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mensagens</h1>
        <p className="text-gray-600 mt-2">Converse com professores e administração</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enviar Nova Mensagem */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-600" />
              Nova Mensagem
            </CardTitle>
            <CardDescription>
              Envie uma mensagem para professores ou administração
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={messageType === 'professor' ? 'default' : 'outline'}
                onClick={() => setMessageType('professor')}
                className="flex-1"
              >
                <User className="h-4 w-4 mr-2" />
                Professor
              </Button>
              <Button
                variant={messageType === 'admin' ? 'default' : 'outline'}
                onClick={() => setMessageType('admin')}
                className="flex-1"
              >
                <Users className="h-4 w-4 mr-2" />
                Administração
              </Button>
            </div>

            {messageType === 'professor' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Selecione o Professor:</label>
                <div className="space-y-2">
                  {professors.map((prof) => (
                    <div key={prof.id} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {prof.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{prof.name}</p>
                          <p className="text-xs text-gray-600">{prof.specialty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Sua Mensagem:</label>
              <Textarea
                placeholder={`Digite sua mensagem para ${messageType === 'professor' ? 'o professor' : 'a administração'}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <Button 
              onClick={handleSendMessage} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>
          </CardContent>
        </Card>

        {/* Histórico de Mensagens */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Histórico de Mensagens
            </CardTitle>
            <CardDescription>
              Suas mensagens anteriores e respostas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messageHistory.map((msg) => (
                <div key={msg.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Para: {msg.to}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      msg.status === 'Respondida' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-700">{msg.message}</p>
                      <p className="text-xs text-gray-500 mt-1">Enviado em {msg.date}</p>
                    </div>
                    {msg.response && (
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm text-gray-700">{msg.response}</p>
                        <p className="text-xs text-gray-500 mt-1">Resposta do professor</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
