
import React, { useState } from 'react';
import { MessageCircle, Send, Users, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);

  const chats = [
    { id: 1, name: 'Grupo Geral', lastMessage: 'Alguém vai no treino de hoje?', time: '14:30', unread: 2 },
    { id: 2, name: 'Turma da Manhã', lastMessage: 'Ótimo treino hoje pessoal!', time: '10:15', unread: 0 },
    { id: 3, name: 'HIIT Warriors', lastMessage: 'Vamos para mais um HIIT!', time: '09:45', unread: 5 },
  ];

  const messages = [
    { id: 1, user: 'Maria Santos', message: 'Bom dia pessoal! Quem vai no treino das 9h?', time: '08:30', isOwn: false },
    { id: 2, user: 'Você', message: 'Eu vou! Só estou terminando o café aqui', time: '08:32', isOwn: true },
    { id: 3, user: 'João Silva', message: 'Também vou! Nos vemos lá', time: '08:35', isOwn: false },
    { id: 4, user: 'Ana Costa', message: 'Pessoal, alguém sabe se vai ter aula amanhã?', time: '08:40', isOwn: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Enviando mensagem:', message);
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chat dos Alunos</h1>
        <p className="text-gray-600 mt-2">Converse com outros alunos da assessoria</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Lista de Chats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Grupos
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar grupos..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedChat === chat.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{chat.name}</h3>
                    {chat.unread > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Área de Mensagens */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                {chats.find(c => c.id === selectedChat)?.name}
              </CardTitle>
              <CardDescription>
                Participe das conversas do grupo
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isOwn && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                          {msg.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-xs ${msg.isOwn ? 'order-1' : ''}`}>
                      {!msg.isOwn && (
                        <p className="text-xs text-gray-600 mb-1">{msg.user}</p>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          msg.isOwn
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isOwn ? 'text-green-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campo de Mensagem */}
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
