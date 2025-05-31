
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { Header } from '@/components/Layout/Header';
import { AdminDashboard } from '@/components/Dashboard/AdminDashboard';
import { StudentDashboard } from '@/components/Dashboard/StudentDashboard';
import { useAuth } from '@/contexts/AuthContext';

// Páginas Admin
import { StudentsPage } from '@/pages/admin/StudentsPage';
import { PaymentsPage } from '@/pages/admin/PaymentsPage';
import { CalendarPage } from '@/pages/admin/CalendarPage';
import { ActivitiesPage } from '@/pages/admin/ActivitiesPage';
import { BiometryPage } from '@/pages/admin/BiometryPage';
import { GoalsPage } from '@/pages/admin/GoalsPage';
import { SettingsPage } from '@/pages/admin/SettingsPage';

// Páginas Aluno
import { WorkoutPlanPage } from '@/pages/student/WorkoutPlanPage';
import { AttendancePage } from '@/pages/student/AttendancePage';
import { VideosPage } from '@/pages/student/VideosPage';
import { ChatPage } from '@/pages/student/ChatPage';
import { MessagesPage } from '@/pages/student/MessagesPage';
import { ProfilePage } from '@/pages/student/ProfilePage';
import { SubscriptionPage } from '@/pages/student/SubscriptionPage';

import NotFound from '@/pages/NotFound';

export const MainLayout: React.FC = () => {
  const { user } = useAuth();

  const renderRoutes = () => {
    const baseRoutes = (
      <>
        <Route path="/" element={
          user?.role === 'aluno' ? <StudentDashboard /> : <AdminDashboard />
        } />
        <Route path="/dashboard" element={
          user?.role === 'aluno' ? <StudentDashboard /> : <AdminDashboard />
        } />
      </>
    );

    const adminRoutes = (
      <>
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/biometry" element={<BiometryPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </>
    );

    const studentRoutes = (
      <>
        <Route path="/workout-plan" element={<WorkoutPlanPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </>
    );

    return (
      <Routes>
        {baseRoutes}
        {(user?.role === 'admin' || user?.role === 'professor') && adminRoutes}
        {user?.role === 'aluno' && studentRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 bg-background">
              <div className="max-w-7xl mx-auto">
                {renderRoutes()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};
