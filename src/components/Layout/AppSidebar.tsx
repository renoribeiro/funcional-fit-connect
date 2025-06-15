import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users, Calendar, MessageSquare, TrendingUp, Activity, CreditCard,
  BarChart3, Target, Dumbbell, Clock, Video, MessageCircle,
  Send, User, Clipboard, Home, Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();

  const adminMenuItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Alunos', url: '/students', icon: Users },
    { title: 'Pagamentos', url: '/payments', icon: CreditCard },
    { title: 'Calendário', url: '/calendar', icon: Calendar },
    { title: 'Atividades', url: '/activities', icon: Activity },
    { title: 'Bioimpedância', url: '/biometry', icon: BarChart3 },
    { title: 'Metas', url: '/goals', icon: Target },
    ...(user?.role === 'admin' ? [{ title: 'Configurações', url: '/settings', icon: Settings }] : []),
  ];

  const studentMenuItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Ficha de Treino', url: '/workout-plan', icon: Dumbbell },
    { title: 'Calendário', url: '/calendar', icon: Calendar },
    { title: 'Frequência', url: '/attendance', icon: Clock },
    { title: 'Vídeos', url: '/videos', icon: Video },
    { title: 'Chat Alunos', url: '/chat', icon: MessageCircle },
    { title: 'Mensagens', url: '/messages', icon: Send },
    { title: 'Meu Perfil', url: '/profile', icon: User },
    { title: 'Assinatura', url: '/subscription', icon: Clipboard },
  ];

  const menuItems = user?.role === 'aluno' ? studentMenuItems : adminMenuItems;
  const groupLabel = user?.role === 'aluno' ? 'Área do Aluno' : 'Administração';
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">FitApp</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Assessoria Esportiva</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {user?.name} - {user?.role === 'aluno' ? 'Aluno' : user?.role === 'admin' ? 'Administrador' : 'Professor'}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
