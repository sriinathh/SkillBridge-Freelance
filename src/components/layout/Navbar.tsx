import { useState, useEffect } from 'react';
import { Link } from 'lucide-react';
import { Menu, X, Sun, Moon, Bell, ChevronDown, LayoutDashboard, MessageSquare, LogOut, User as UserIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { navigate, getPath } from '@/lib/router';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

const publicLinks = [
  { label: 'Find Gigs', path: '/gigs' },
  { label: 'Find Jobs', path: '/jobs' },
  { label: 'Freelancers', path: '/freelancers' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = getPath();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [currentPath]);

  const go = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass-strong shadow-card dark:shadow-card-dark' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => go('/')} className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Link className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-ink-900 dark:text-white hidden sm:block">
            Skill<span className="gradient-text">Bridge</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {publicLinks.map((l) => (
            <button
              key={l.path}
              onClick={() => go(l.path)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                currentPath.startsWith(l.path)
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white hover:bg-ink-100 dark:hover:bg-ink-800/50'
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {user ? (
            <>
              <button
                onClick={() => go('/chat')}
                className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors relative"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
              </button>
              <button className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800/50 p-1 pr-2 transition-colors"
                >
                  <Avatar name={user.name} src={user.avatar} size="sm" />
                  <ChevronDown className={cn('w-4 h-4 text-ink-400 transition-transform', profileOpen && 'rotate-180')} />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-xl shadow-card dark:shadow-card-dark p-2 z-20 animate-scale-in">
                      <div className="px-3 py-2 border-b border-ink-200 dark:border-ink-800 mb-1">
                        <p className="text-sm font-semibold text-ink-900 dark:text-ink-50 truncate">{user.name}</p>
                        <p className="text-xs text-ink-400 truncate">{user.email}</p>
                        <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                          {user.role}
                        </span>
                      </div>
                      <MenuItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" onClick={() => go('/dashboard')} />
                      <MenuItem icon={<UserIcon className="w-4 h-4" />} label="Profile" onClick={() => go('/freelancers/f1')} />
                      <MenuItem icon={<MessageSquare className="w-4 h-4" />} label="Messages" onClick={() => go('/chat')} />
                      <div className="h-px bg-ink-200 dark:bg-ink-800 my-1" />
                      <MenuItem icon={<LogOut className="w-4 h-4" />} label="Logout" onClick={() => { logout(); go('/'); }} danger />
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => go('/login')}>Sign In</Button>
              <Button size="sm" onClick={() => go('/signup')}>Get Started</Button>
            </div>
          )}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-ink-200 dark:border-ink-800 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {publicLinks.map((l) => (
              <button
                key={l.path}
                onClick={() => go(l.path)}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
              >
                {l.label}
              </button>
            ))}
            {!user && (
              <div className="pt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => go('/login')}>Sign In</Button>
                <Button size="sm" className="flex-1" onClick={() => go('/signup')}>Get Started</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function MenuItem({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        danger
          ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20'
          : 'text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
