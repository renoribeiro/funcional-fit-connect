
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/Dashboard/AdminDashboard';
import { StudentDashboard } from '@/components/Dashboard/StudentDashboard';

const Index = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'professor':
        return <AdminDashboard />; // Por enquanto usa o mesmo dashboard do admin
      case 'aluno':
        return <StudentDashboard />;
      default:
        return <div>Role não reconhecida</div>;
    }
  };

  return renderDashboard();
};

export default Index;
