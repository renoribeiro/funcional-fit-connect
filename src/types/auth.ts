
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'professor' | 'aluno';
  avatar?: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
