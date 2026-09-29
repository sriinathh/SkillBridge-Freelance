import { MapPin, Clock, Users, BadgeCheck } from 'lucide-react';
import type { Job } from '@/lib/mockData';
import { navigate } from '@/lib/router';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export function JobCard({ job }: { job: Job }) {
  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="glass-strong rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:shadow-glow hover:border-primary-300 dark:hover:border-primary-700"
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={job.clientName} src={job.clientAvatar} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-ink-800 dark:text-ink-100 truncate">{job.clientName}</span>
            {job.verified && <BadgeCheck className="w-4 h-4 text-primary-500 shrink-0" />}
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-400">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(job.postedDate)}</span>
          </div>
        </div>
        <Badge variant={job.experienceLevel === 'Expert' ? 'error' : job.experienceLevel === 'Intermediate' ? 'warning' : 'success'}>
          {job.experienceLevel}
        </Badge>
      </div>

      <h3 className="font-semibold text-ink-900 dark:text-ink-50 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {job.title}
      </h3>
      <p className="text-sm text-ink-500 dark:text-ink-400 line-clamp-2 mb-3">{job.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.slice(0, 4).map((s) => (
          <Badge key={s} variant="default" className="text-[11px]">{s}</Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-ink-200 dark:border-ink-800">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-ink-400 font-medium">Budget</p>
          <p className="text-sm font-bold text-ink-900 dark:text-ink-50">
            {formatCurrency(job.budget.min)} - {formatCurrency(job.budget.max)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-400">
          <Users className="w-3.5 h-3.5" />
          {job.proposalsCount} proposals
        </div>
      </div>
    </div>
  );
}
