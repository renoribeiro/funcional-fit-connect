
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
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Database simulado de alunos
  const mockStudents = [
    { id: 1, name: 'Maria Santos', email: 'maria@email.com', plan: 'Premium' },
    { id: 2, name: 'João Silva', email: 'joao@email.com', plan: 'Básico' },
    { id: 3, name: 'Ana Costa', email: 'ana@email.com', plan: 'Premium' },
    { id: 4, name: 'Carlos Oliveira', email: 'carlos@email.com', plan: 'Intermediário' },
    { id: 5, name: 'Pedro Santos', email: 'pedro@email.com', plan: 'Básico' },
    { id: 6, name: 'Lucia Ferreira', email: 'lucia@email.com', plan: 'Premium' },
  ];

  // Base de dados completa para busca
  const searchDatabase = [
    // Páginas Administrativas
    { type: 'página', name: 'Dashboard', detail: 'Painel administrativo principal', route: '/dashboard', category: 'admin' },
    { type: 'página', name: 'Gerenciar Alunos', detail: 'Lista e gestão de alunos', route: '/students', category: 'admin' },
    { type: 'página', name: 'Pagamentos', detail: 'Controle financeiro e mensalidades', route: '/payments', category: 'admin' },
    { type: 'página', name: 'Calendário', detail: 'Agenda de aulas e eventos', route: '/calendar', category: 'admin' },
    { type: 'página', name: 'Atividades', detail: 'Gestão de aulas e exercícios', route: '/activities', category: 'admin' },
    { type: 'página', name: 'Biometria', detail: 'Controle de acesso e presença', route: '/biometry', category: 'admin' },
    { type: 'página', name: 'Metas', detail: 'Objetivos e acompanhamento', route: '/goals', category: 'admin' },
    { type: 'página', name: 'Configurações', detail: 'Configurações do sistema', route: '/settings', category: 'admin' },
    { type: 'página', name: 'Perfil', detail: 'Editar perfil do usuário', route: '/profile', category: 'common' },

    // Páginas do Aluno
    { type: 'página', name: 'Plano de Treino', detail: 'Exercícios personalizados', route: '/workout-plan', category: 'student' },
    { type: 'página', name: 'Frequência', detail: 'Histórico de presença', route: '/attendance', category: 'student' },
    { type: 'página', name: 'Vídeos', detail: 'Biblioteca de exercícios', route: '/videos', category: 'student' },
    { type: 'página', name: 'Chat', detail: 'Conversa com instrutor', route: '/chat', category: 'student' },
    { type: 'página', name: 'Mensagens', detail: 'Central de mensagens', route: '/messages', category: 'student' },
    { type: 'página', name: 'Assinatura', detail: 'Planos e pagamentos', route: '/subscription', category: 'student' },

    // Funções/Funcionalidades
    { type: 'função', name: 'Adicionar Aluno', detail: 'Cadastrar novo membro', route: '/students', category: 'admin' },
    { type: 'função', name: 'Editar Aluno', detail: 'Modificar dados do aluno', route: '/students', category: 'admin' },
    { type: 'função', name: 'Excluir Aluno', detail: 'Remover aluno do sistema', route: '/students', category: 'admin' },
    { type: 'função', name: 'Buscar Alunos', detail: 'Pesquisar na base de dados', route: '/students', category: 'admin' },
    { type: 'função', name: 'Controle de Pagamentos', detail: 'Gestão financeira', route: '/payments', category: 'admin' },
    { type: 'função', name: 'Agendar Aula', detail: 'Criar evento no calendário', route: '/calendar', category: 'admin' },
    { type: 'função', name: 'Gerenciar Usuários', detail: 'Administrar contas do sistema', route: '/settings', category: 'admin' },
    { type: 'função', name: 'Configurar WhatsApp', detail: 'Integração de mensagens', route: '/settings', category: 'admin' },
    { type: 'função', name: 'Notificações', detail: 'Central de avisos', route: '/', category: 'common' },
    { type: 'função', name: 'Alternar Tema', detail: 'Modo claro/escuro', route: '/', category: 'common' },
    { type: 'função', name: 'Logout', detail: 'Sair do sistema', route: '/', category: 'common' },

    // Configurações específicas
    { type: 'configuração', name: 'Criar Usuário', detail: 'Adicionar novo usuário ao sistema', route: '/settings', category: 'admin' },
    { type: 'configuração', name: 'Editar Usuário', detail: 'Modificar permissões de usuário', route: '/settings', category: 'admin' },
    { type: 'configuração', name: 'Excluir Usuário', detail: 'Remover usuário do sistema', route: '/settings', category: 'admin' },
    { type: 'configuração', name: 'WhatsApp Webhook', detail: 'Configurar integração WhatsApp', route: '/settings', category: 'admin' },
    { type: 'configuração', name: 'Lembretes de Pagamento', detail: 'Automatizar cobranças', route: '/settings', category: 'admin' },
    { type: 'configuração', name: 'Preferências do Sistema', detail: 'Configurações gerais', route: '/settings', category: 'admin' },

    // Atividades e Aulas
    { type: 'aula', name: 'Yoga & Pilates', detail: '14:00 - Sala Zen', route: '/activities', category: 'admin' },
    { type: 'aula', name: 'HIIT Avançado', detail: '18:00 - Sala Principal', route: '/activities', category: 'admin' },
    { type: 'aula', name: 'Musculação Iniciante', detail: '08:00 - Área de Pesos', route: '/activities', category: 'admin' },
    { type: 'aula', name: 'Spinning', detail: '19:00 - Sala de Bike', route: '/activities', category: 'admin' },
    { type: 'aula', name: 'Funcional', detail: '16:00 - Área Externa', route: '/activities', category: 'admin' },
  ];

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      professor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      aluno: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
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
    
    if (value.length > 1) {
      let results: any[] = [];

      // Buscar na base de dados do sistema
      const systemResults = searchDatabase.filter(item => {
        const searchLower = value.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.detail.toLowerCase().includes(searchLower) ||
          item.type.toLowerCase().includes(searchLower)
        );
      }).filter(item => {
        // Filtrar por permissões do usuário
        if (item.category === 'admin') {
          return user?.role === 'admin' || user?.role === 'professor';
        }
        if (item.category === 'student') {
          return user?.role === 'aluno';
        }
        return true; // common
      });

      // Buscar alunos (apenas para admin/professor)
      if (user?.role === 'admin' || user?.role === 'professor') {
        const studentResults = mockStudents.filter(student => {
          const searchLower = value.toLowerCase();
          return (
            student.name.toLowerCase().includes(searchLower) ||
            student.email.toLowerCase().includes(searchLower) ||
            student.plan.toLowerCase().includes(searchLower)
          );
        }).map(student => ({
          type: 'aluno',
          name: student.name,
          detail: `${student.plan} • ${student.email}`,
          route: '/students',
          category: 'admin'
        }));

        results = [...systemResults, ...studentResults];
      } else {
        results = systemResults;
      }

      // Limitar resultados e ordenar por relevância
      results = results
        .sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().startsWith(value.toLowerCase());
          const bNameMatch = b.name.toLowerCase().startsWith(value.toLowerCase());
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return 0;
        })
        .slice(0, 8);

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: any) => {
    navigate(result.route);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleNotifications = () => {
    setNotificationsOpen(true);
    toast({
      title: "Notificações",
      description: "Você tem 3 notificações não lidas",
    });
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const notifications = [
    { id: 1, title: 'Nova mensagem', description: 'João Silva enviou uma mensagem', time: '5 min' },
    { id: 2, title: 'Pagamento vencendo', description: 'Maria Santos - vence em 2 dias', time: '1 hora' },
    { id: 3, title: 'Aula cancelada', description: 'HIIT Avançado - hoje 18h', time: '2 horas' },
  ];

  return (
    <header className="h-16 border-b bg-background dark:bg-background sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger />
        
        <div className="relative max-w-md ml-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar alunos, aulas, funções, páginas..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
          />
          
          {/* Resultados da pesquisa */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg dark:shadow-dark-soft-lg z-50">
              {searchResults.map((result, index) => (
                <div 
                  key={index} 
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-border last:border-b-0 rounded-md transition-colors"
                  onClick={() => handleSearchResultClick(result)}
                >
                  <div className="font-medium text-foreground">{result.name}</div>
                  <div className="text-sm text-muted-foreground">{result.type} • {result.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle de tema */}
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* Notificações */}
        <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground" onClick={handleNotifications}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-popover">
            <DialogHeader>
              <DialogTitle>Notificações</DialogTitle>
              <DialogDescription>
                Suas notificações recentes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 border border-border rounded-lg bg-card">
                  <h4 className="font-medium text-card-foreground">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <span className="text-xs text-muted-foreground">{notification.time} atrás</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover">
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
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
