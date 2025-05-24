
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, LoginCredentials } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users para demonstração
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@fitapp.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
    avatar: '',
    phone: '+55 11 99999-9999',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    email: 'professor@fitapp.com',
    password: 'prof123',
    name: 'Carlos Silva',
    role: 'professor',
    avatar: '',
    phone: '+55 11 88888-8888',
    createdAt: '2024-01-02',
    isActive: true
  },
  {
    id: '3',
    email: 'aluno@fitapp.com',
    password: 'aluno123',
    name: 'Maria Santos',
    role: 'aluno',
    avatar: '',
    phone: '+55 11 77777-7777',
    createdAt: '2024-01-03',
    isActive: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Credenciais inválidas');
      }

      if (!foundUser.isActive) {
        throw new Error('Usuário inativo');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${foundUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
