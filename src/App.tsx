import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { useRoute, useRouteMatch } from '@/hooks/useRoute';
import { navigate } from '@/lib/router';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { GigsBrowsePage } from '@/pages/GigsBrowsePage';
import { GigDetailPage } from '@/pages/GigDetailPage';
import { JobsBrowsePage } from '@/pages/JobsBrowsePage';
import { JobDetailPage } from '@/pages/JobDetailPage';
import { PostJobPage } from '@/pages/PostJobPage';
import { FreelancersBrowsePage } from '@/pages/FreelancersBrowsePage';
import { FreelancerProfilePage } from '@/pages/FreelancerProfilePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ChatPage } from '@/pages/ChatPage';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-ink-900 dark:text-white mb-2">Page not found</h1>
        <p className="text-ink-400 mb-6">The page you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function Router() {
  const { cleanPath } = useRoute();
  const gigMatch = useRouteMatch('/gigs/:id');
  const jobMatch = useRouteMatch('/jobs/:id');
  const freelancerMatch = useRouteMatch('/freelancers/:id');

  // Auth pages (no layout)
  if (cleanPath === '/login') return <LoginPage />;
  if (cleanPath === '/signup') return <SignupPage />;
  if (cleanPath === '/forgot-password') return <ForgotPasswordPage />;

  // Dashboard pages (dashboard layout)
  if (cleanPath === '/dashboard') {
    return (
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    );
  }

  // Chat page (public layout, no footer space needed)
  if (cleanPath === '/chat') {
    return (
      <PublicLayout>
        <ChatPage />
      </PublicLayout>
    );
  }

  // Determine content for public layout pages
  let content: React.ReactNode = null;

  if (cleanPath === '/') content = <LandingPage />;
  else if (cleanPath === '/gigs') content = <GigsBrowsePage />;
  else if (gigMatch) content = <GigDetailPage id={gigMatch.params.id} />;
  else if (cleanPath === '/jobs') content = <JobsBrowsePage />;
  else if (cleanPath === '/jobs/new') content = <PostJobPage />;
  else if (jobMatch) content = <JobDetailPage id={jobMatch.params.id} />;
  else if (cleanPath === '/freelancers') content = <FreelancersBrowsePage />;
  else if (freelancerMatch) content = <FreelancerProfilePage id={freelancerMatch.params.id} />;

  if (!content) content = <NotFoundPage />;

  return <PublicLayout>{content}</PublicLayout>;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
