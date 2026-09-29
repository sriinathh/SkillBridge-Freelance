import { TrendingUp, TrendingDown, DollarSign, Briefcase, Eye, Star, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import { cn, formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

function MiniBarChart({ data, color = 'primary' }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
          <div className="w-full flex-1 flex items-end">
            <div
              className={cn('w-full rounded-t-md transition-all duration-500 group-hover:opacity-80', color === 'primary' ? 'bg-gradient-to-t from-primary-600 to-primary-400' : 'bg-gradient-to-t from-accent-600 to-accent-400')}
              style={{ height: `${(v / max) * 100}%`, minHeight: '4px', animationDelay: `${i * 50}ms` }}
            />
          </div>
          <span className="text-[10px] text-ink-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ dataPoints, labels }: { dataPoints: number[]; labels: string[] }) {
  const max = Math.max(...dataPoints, 1);
  const min = Math.min(...dataPoints, 0);
  const range = max - min || 1;
  const w = 100;
  const h = 100;
  const step = w / (dataPoints.length - 1);
  const points = dataPoints.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');
  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <div className="relative h-48">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3366ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3366ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#areaGrad)" />
        <polyline points={points} fill="none" stroke="#3366ff" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {dataPoints.map((_, i) => (
          <circle key={i} cx={i * step} cy={h - ((dataPoints[i] - min) / range) * h} r="1.2" fill="#3366ff" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {labels.map((l) => <span key={l} className="text-[10px] text-ink-400">{l}</span>)}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color, onClick }: {
  icon: React.ReactNode; label: string; value: string; trend?: number; color: string; onClick?: () => void;
}) {
  return (
    <Card hover={!!onClick} onClick={onClick} className="relative overflow-hidden">
      <div className={cn('absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10', color)} />
      <div className="flex items-center justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', color)}>
          {icon}
        </div>
        {trend !== undefined && (
          <span className={cn('flex items-center gap-0.5 text-xs font-semibold', trend >= 0 ? 'text-emerald-500' : 'text-rose-500')}>
            {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-ink-900 dark:text-white">{value}</p>
      <p className="text-xs text-ink-400 mt-1">{label}</p>
    </Card>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const isClient = user?.role === 'client';

  const freelancerStats = [
    { icon: <DollarSign className="w-5 h-5 text-white" />, label: 'Total Earnings', value: '$24,580', trend: 12, color: 'bg-gradient-to-br from-primary-500 to-primary-600' },
    { icon: <Briefcase className="w-5 h-5 text-white" />, label: 'Active Projects', value: '7', trend: 8, color: 'bg-gradient-to-br from-accent-500 to-accent-600' },
    { icon: <Clock className="w-5 h-5 text-white" />, label: 'Pending Proposals', value: '12', trend: -3, color: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { icon: <Eye className="w-5 h-5 text-white" />, label: 'Profile Views', value: '1,248', trend: 24, color: 'bg-gradient-to-br from-violet-500 to-fuchsia-500' },
  ];

  const clientStats = [
    { icon: <Briefcase className="w-5 h-5 text-white" />, label: 'Active Jobs', value: '5', trend: 10, color: 'bg-gradient-to-br from-primary-500 to-primary-600' },
    { icon: <Users className="w-5 h-5 text-white" />, label: 'Hired Freelancers', value: '8', trend: 15, color: 'bg-gradient-to-br from-accent-500 to-accent-600' },
    { icon: <DollarSign className="w-5 h-5 text-white" />, label: 'Pending Payments', value: '$3,200', trend: -5, color: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { icon: <CheckCircle2 className="w-5 h-5 text-white" />, label: 'Completed Projects', value: '23', trend: 18, color: 'bg-gradient-to-br from-emerald-500 to-teal-500' },
  ];

  const stats = isClient ? clientStats : freelancerStats;
  const earningsData = [3200, 4100, 3800, 5200, 4800, 6100, 5500, 7200, 6800, 8100, 7600, 9200];
  const activityData = [3, 5, 4, 7, 6, 8, 5, 9, 7, 10, 8, 12];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-ink-400 text-sm mt-1">
            {isClient ? 'Here is what is happening with your projects' : 'Here is your freelance business at a glance'}
          </p>
        </div>
        <Button onClick={() => navigate(isClient ? '/jobs/new' : '/gigs')}>
          {isClient ? 'Post a Job' : 'Create a Gig'}
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white">
                {isClient ? 'Spending Analytics' : 'Monthly Earnings'}
              </h2>
              <p className="text-xs text-ink-400 mt-0.5">Last 12 months</p>
            </div>
            <Badge variant="success"><TrendingUp className="w-3 h-3" /> +24%</Badge>
          </div>
          <LineChart dataPoints={earningsData} labels={['Jan', '', 'Mar', '', 'May', '', 'Jul', '', 'Sep', '', 'Nov', '']} />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white">Project Activity</h2>
              <p className="text-xs text-ink-400 mt-0.5">Monthly breakdown</p>
            </div>
            <Badge variant="primary">2024</Badge>
          </div>
          <MiniBarChart data={activityData} color="accent" />
        </Card>
      </div>

      {/* Recent activity + top gigs */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4">
            {isClient ? 'Recent Job Activity' : 'Recent Orders'}
          </h2>
          <div className="space-y-3">
            {recentActivity(isClient).map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-100/50 dark:hover:bg-ink-800/50 transition-colors">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', a.bg)}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-900 dark:text-ink-50 truncate">{a.title}</p>
                  <p className="text-xs text-ink-400">{a.subtitle}</p>
                </div>
                <span className="text-xs text-ink-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <ActionButton label={isClient ? 'Post a New Job' : 'Create a New Gig'} onClick={() => navigate(isClient ? '/jobs/new' : '/gigs')} />
            <ActionButton label="View Messages" onClick={() => navigate('/chat')} />
            <ActionButton label="Browse Talent" onClick={() => navigate('/freelancers')} />
            <ActionButton label="Explore Gigs" onClick={() => navigate('/gigs')} />
          </div>
        </Card>
      </div>

      {/* Rating summary (freelancer only) */}
      {!isClient && (
        <Card>
          <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4">Performance Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Average Rating', value: '4.9', icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> },
              { label: 'On-Time Delivery', value: '98%', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
              { label: 'Response Rate', value: '100%', icon: <TrendingUp className="w-5 h-5 text-primary-500" /> },
              { label: 'Repeat Clients', value: '42%', icon: <Users className="w-5 h-5 text-accent-500" /> },
            ].map((m) => (
              <div key={m.label} className="text-center p-4 rounded-xl bg-ink-100/50 dark:bg-ink-800/30">
                <div className="flex justify-center mb-2">{m.icon}</div>
                <p className="text-xl font-display font-bold text-ink-900 dark:text-white">{m.value}</p>
                <p className="text-xs text-ink-400 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-ink-700 dark:text-ink-200 bg-ink-100/50 dark:bg-ink-800/30 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
    >
      {label}
      <ChevronRightSmall />
    </button>
  );
}

function ChevronRightSmall() {
  return <span className="text-ink-400">→</span>;
}

function recentActivity(isClient: boolean) {
  if (isClient) {
    return [
      { title: 'New proposal received', subtitle: 'Sarah Chen submitted a proposal', time: '2h ago', icon: <Briefcase className="w-4.5 h-4.5 text-white" />, bg: 'bg-primary-500' },
      { title: 'Milestone approved', subtitle: 'Logo design - Phase 1', time: '5h ago', icon: <CheckCircle2 className="w-4.5 h-4.5 text-white" />, bg: 'bg-emerald-500' },
      { title: 'Payment released', subtitle: '$1,200 to Marcus Rodriguez', time: '1d ago', icon: <DollarSign className="w-4.5 h-4.5 text-white" />, bg: 'bg-accent-500' },
      { title: 'Job posted', subtitle: 'Need a React developer for SaaS', time: '2d ago', icon: <AlertCircle className="w-4.5 h-4.5 text-white" />, bg: 'bg-amber-500' },
    ];
  }
  return [
    { title: 'New order received', subtitle: 'Full-stack web app - Premium', time: '1h ago', icon: <Briefcase className="w-4.5 h-4.5 text-white" />, bg: 'bg-primary-500' },
    { title: 'Payment received', subtitle: '$1,500 from TechFlow Inc', time: '3h ago', icon: <DollarSign className="w-4.5 h-4.5 text-white" />, bg: 'bg-emerald-500' },
    { title: 'New 5-star review', subtitle: 'From John D.', time: '6h ago', icon: <Star className="w-4.5 h-4.5 text-white" />, bg: 'bg-amber-500' },
    { title: 'Proposal accepted', subtitle: 'SEO optimization project', time: '1d ago', icon: <CheckCircle2 className="w-4.5 h-4.5 text-white" />, bg: 'bg-accent-500' },
  ];
}
