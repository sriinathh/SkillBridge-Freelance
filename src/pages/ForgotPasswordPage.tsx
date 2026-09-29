import { useState } from 'react';
import { Mail, ArrowRight, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { navigate } from '@/lib/router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast('Please enter your email', 'error');
      return;
    }
    setSent(true);
    toast('Password reset link sent to your email!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-ink-50 dark:bg-ink-950">
      <div className="w-full max-w-md">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-ink-900 dark:text-white">SkillBridge</span>
        </button>

        {sent ? (
          <div className="glass-strong rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-white mb-2">Check Your Email</h2>
            <p className="text-ink-500 dark:text-ink-400 mb-6">
              We sent a password reset link to <span className="font-semibold text-ink-700 dark:text-ink-200">{email}</span>
            </p>
            <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
              Back to Sign In
            </Button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white mb-2">Reset Password</h2>
            <p className="text-ink-500 dark:text-ink-400 mb-8">
              Enter your email and we will send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-5 h-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="lg" className="w-full">
                Send Reset Link
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
              Remember your password?{' '}
              <button onClick={() => navigate('/login')} className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
