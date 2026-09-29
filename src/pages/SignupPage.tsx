import { useState } from 'react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight, Link as LinkIcon, Check } from 'lucide-react';
import type { UserRole } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { navigate } from '@/lib/router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SignupPage() {
  const { signup, loading } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('freelancer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast('Please fill in all fields', 'error');
      return;
    }
    if (password.length < 6) {
      toast('Password must be at least 6 characters', 'error');
      return;
    }
    try {
      await signup(name, email, password, role);
      toast('Account created! Welcome to SkillBridge.');
      navigate('/dashboard');
    } catch {
      toast('Signup failed. Please try again.', 'error');
    }
  };

  const roles: { key: UserRole; label: string; desc: string }[] = [
    { key: 'freelancer', label: 'I am a Freelancer', desc: 'Find work and offer services' },
    { key: 'client', label: 'I am a Client', desc: 'Hire talent and post jobs' },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-6 bg-ink-50 dark:bg-ink-950">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-ink-900 dark:text-white">SkillBridge</span>
          </button>

          <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-ink-500 dark:text-ink-400 mb-6">Join SkillBridge and start building today.</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  role === r.key
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-ink-200 dark:border-ink-800 hover:border-ink-300 dark:hover:border-ink-700'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-ink-900 dark:text-ink-50">{r.label}</span>
                  {role === r.key && <Check className="w-4 h-4 text-primary-500" />}
                </div>
                <p className="text-xs text-ink-400">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              icon={<UserIcon className="w-5 h-5" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
                placeholder="Create a password"
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

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-accent-600 via-accent-700 to-primary-700 p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-20" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative" />
        <div className="relative">
          <h1 className="font-display text-4xl font-extrabold text-white leading-tight text-balance">
            Join 1.2M+ freelancers and clients building on SkillBridge.
          </h1>
          <p className="mt-4 text-accent-50 text-lg">
            Whether you are hiring or looking for work, SkillBridge gives you the tools to succeed.
          </p>
        </div>
      </div>
    </div>
  );
}
