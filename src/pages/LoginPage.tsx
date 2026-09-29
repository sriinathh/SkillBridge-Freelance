import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { navigate } from '@/lib/router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function LoginPage() {
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Please fill in all fields', 'error');
      return;
    }
    try {
      await login(email, password);
      toast('Welcome back to SkillBridge!');
      navigate('/dashboard');
    } catch {
      toast('Login failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">SkillBridge</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white leading-tight text-balance">
            Welcome back to the future of freelancing.
          </h1>
          <p className="mt-4 text-primary-100 text-lg">
            Sign in to manage your projects, chat with clients, and grow your freelance business.
          </p>
        </div>
        <div className="relative space-y-4">
          {['Manage projects from your dashboard', 'Real-time chat with clients', 'Secure escrow payments'].map((t) => (
            <div key={t} className="flex items-center gap-3 text-white/90">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-ink-50 dark:bg-ink-950">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('/')} className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-ink-900 dark:text-white">SkillBridge</span>
          </button>

          <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white mb-2">Sign In</h2>
          <p className="text-ink-500 dark:text-ink-400 mb-8">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={<Lock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-[38px] text-ink-400 hover:text-ink-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-600 dark:text-ink-300 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-ink-300 text-primary-500 focus:ring-primary-500" />
                Remember me
              </label>
              <button type="button" onClick={() => navigate('/forgot-password')} className="text-primary-600 dark:text-primary-400 hover:underline">
                Forgot password?
              </button>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-ink-200 dark:bg-ink-800" />
            <span className="text-xs text-ink-400">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-ink-200 dark:bg-ink-800" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => toast('Google OAuth coming soon!', 'info')}>
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09a7.68 7.68 0 0 1 0-4.18V7.07H2.18a11.01 11.01 0 0 0 0 9.86l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Google
            </Button>
            <Button variant="outline" onClick={() => toast('GitHub OAuth coming soon!', 'info')}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-ink-500 dark:text-ink-400">
            Do not have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
