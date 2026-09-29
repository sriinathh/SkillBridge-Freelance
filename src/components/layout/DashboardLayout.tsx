import type { ReactNode } from 'react';
import { Link, LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut, Bell, Home } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { navigate, getPath } from '@/lib/router';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Briefcase, label: 'Projects', path: '/dashboard?tab=projects' },
  { icon: MessageSquare, label: 'Messages', path: '/chat' },
  { icon: Settings, label: 'Settings', path: '/dashboard?tab=settings' },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const currentPath = getPath();

  return (
    <div className="min-h-screen flex bg-ink-50 dark:bg-ink-950">
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 glass-strong border-r border-ink-200 dark:border-ink-800 z-30">
        <div className="h-16 flex items-center px-5 border-b border-ink-200 dark:border-ink-800">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Link className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-ink-900 dark:text-white">
              Skill<span className="gradient-text">Bridge</span>
            </span>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = currentPath === item.path.split('?')[0];
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800/50'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-ink-200 dark:border-ink-800">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="h-16 sticky top-0 z-20 glass-strong border-b border-ink-200 dark:border-ink-800 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-ink-100 dark:hover:bg-ink-800">
              <Home className="w-5 h-5 text-ink-600 dark:text-ink-300" />
            </button>
            <h1 className="font-display font-bold text-ink-900 dark:text-white hidden sm:block">
              {user?.role === 'client' ? 'Client Dashboard' : user?.role === 'admin' ? 'Admin Panel' : 'Freelancer Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            {user && <Avatar name={user.name} src={user.avatar} size="sm" className="ml-1" />}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
