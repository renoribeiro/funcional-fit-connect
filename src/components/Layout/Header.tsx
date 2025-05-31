
import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      professor: 'bg-blue-100 text-blue-800',
      aluno: 'bg-green-100 text-green-800'
    };
    
    const labels = {
      admin: 'Administrador',
      professor: 'Professor',
      aluno: 'Aluno'
    };

    return (
      <Badge className={colors[role as keyof typeof colors]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.length > 2) {
      // Simular busca em diferentes entidades
      const mockResults = [
        { type: 'aluno', name: 'Maria Santos', detail: 'Plano Premium' },
        { type: 'aula', name: 'Yoga & Pilates', detail: '14:00 - Sala Zen' },
        { type: 'função', name: 'Gerenciar Alunos', detail: 'Página administrativa' },
      ].filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.detail.toLowerCase().includes(value.toLowerCase())
      );
      
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleNotifications = () => {
    setNotificationsOpen(true);
    toast({
      title: "Notificações",
      description: "Você tem 3 notificações não lidas",
    });
  };

  const handleProfile = () => {
    toast({
      title: "Perfil",
      description: "Redirecionando para página de perfil...",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Configurações",
      description: "Redirecionando para configurações...",
    });
  };

  const notifications = [
    { id: 1, title: 'Nova mensagem', description: 'João Silva enviou uma mensagem', time: '5 min' },
    { id: 2, title: 'Pagamento vencendo', description: 'Maria Santos - vence em 2 dias', time: '1 hora' },
    { id: 3, title: 'Aula cancelada', description: 'HIIT Avançado - hoje 18h', time: '2 horas' },
  ];

  return (
    <header className="h-16 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger />
        
        <div className="relative max-w-md ml-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquisar alunos, aulas, funções..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-700 transition-colors"
          />
          
          {/* Resultados da pesquisa */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
              {searchResults.map((result, index) => (
                <div key={index} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{result.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.type} • {result.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle de tema */}
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* Notificações */}
        <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="relative" onClick={handleNotifications}>
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificações</DialogTitle>
              <DialogDescription>
                Suas notificações recentes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
                  <span className="text-xs text-gray-500">{notification.time} atrás</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary-100 text-primary-700">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2">
              <span>Minha Conta</span>
              {user?.role && getRoleBadge(user.role)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
