
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/Auth/LoginForm";
import { MainLayout } from "@/components/Layout/MainLayout";
import NotFound from "./pages/NotFound";

console.log('App.tsx: Inicializando componentes...');

const queryClient = new QueryClient();
console.log('App.tsx: QueryClient criado:', queryClient);

const AppContent = () => {
  console.log('AppContent: Renderizando...');
  const { isAuthenticated } = useAuth();
  console.log('AppContent: isAuthenticated =', isAuthenticated);

  if (!isAuthenticated) {
    console.log('AppContent: Usuário não autenticado, mostrando LoginForm');
    return <LoginForm />;
  }

  console.log('AppContent: Usuário autenticado, mostrando MainLayout');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  console.log('App: Renderizando componente principal...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

console.log('App.tsx: Componente App definido');

export default App;
