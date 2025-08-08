
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { Header } from '@/components/Layout/Header';
import { useAuth } from '@/contexts/AuthContext';

// Lazy-loaded components for better performance
const AdminDashboard = lazy(() => import('@/components/Dashboard/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const StudentDashboard = lazy(() => import('@/components/Dashboard/StudentDashboard').then(m => ({ default: m.StudentDashboard })));

// Páginas Admin
const StudentsPage = lazy(() => import('@/pages/admin/StudentsPage').then(m => ({ default: m.StudentsPage })));
const PaymentsPage = lazy(() => import('@/pages/admin/PaymentsPage').then(m => ({ default: m.PaymentsPage })));
const CalendarPage = lazy(() => import('@/pages/admin/CalendarPage').then(m => ({ default: m.CalendarPage })));
const ActivitiesPage = lazy(() => import('@/pages/admin/ActivitiesPage').then(m => ({ default: m.ActivitiesPage })));
const BiometryPage = lazy(() => import('@/pages/admin/BiometryPage').then(m => ({ default: m.BiometryPage })));
const GoalsPage = lazy(() => import('@/pages/admin/GoalsPage').then(m => ({ default: m.GoalsPage })));
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage').then(m => ({ default: m.SettingsPage })));

// Páginas Aluno
const WorkoutPlanPage = lazy(() => import('@/pages/student/WorkoutPlanPage').then(m => ({ default: m.WorkoutPlanPage })));
const AttendancePage = lazy(() => import('@/pages/student/AttendancePage').then(m => ({ default: m.AttendancePage })));
const VideosPage = lazy(() => import('@/pages/student/VideosPage').then(m => ({ default: m.VideosPage })));
const ChatPage = lazy(() => import('@/pages/student/ChatPage').then(m => ({ default: m.ChatPage })));
const MessagesPage = lazy(() => import('@/pages/student/MessagesPage').then(m => ({ default: m.MessagesPage })));
const SubscriptionPage = lazy(() => import('@/pages/student/SubscriptionPage').then(m => ({ default: m.SubscriptionPage })));
const StudentCalendarPage = lazy(() => import('@/pages/student/CalendarPage').then(m => ({ default: m.CalendarPage })));
const StudentGoalsPage = lazy(() => import('@/pages/student/GoalsPage').then(m => ({ default: m.GoalsPage })));

// Página de Perfil Comum
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));

const NotFound = lazy(() => import('@/pages/NotFound'));


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
        <Route path="/profile" element={<ProfilePage />} />
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
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/calendar" element={<StudentCalendarPage />} />
        <Route path="/goals" element={<StudentGoalsPage />} />
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
                <Suspense fallback={<div className="py-10 text-center text-muted-foreground">Carregando...</div>}>
                  {renderRoutes()}
                </Suspense>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};
