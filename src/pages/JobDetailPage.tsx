import { useState } from 'react';
import { MapPin, Clock, Users, BadgeCheck, ChevronRight, DollarSign, Calendar, Send } from 'lucide-react';
import { getJobById } from '@/lib/mockData';
import { navigate } from '@/lib/router';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

export function JobDetailPage({ id }: { id: string }) {
  const job = getJobById(id);
  const { toast } = useToast();
  const { user } = useAuth();
  const [showProposal, setShowProposal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [quotePrice, setQuotePrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">Job not found</h1>
        <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
      </div>
    );
  }

  const handleProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter || !quotePrice || !deliveryDays) {
      toast('Please fill in all fields', 'error');
      return;
    }
    setShowProposal(false);
    toast('Proposal submitted successfully!');
    setCoverLetter('');
    setQuotePrice('');
    setDeliveryDays('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center gap-1.5 text-sm text-ink-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-primary-500">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate('/jobs')} className="hover:text-primary-500">Jobs</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink-600 dark:text-ink-300 truncate">{job.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Job header */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant={job.experienceLevel === 'Expert' ? 'error' : job.experienceLevel === 'Intermediate' ? 'warning' : 'success'}>
                {job.experienceLevel}
              </Badge>
              <span className="text-xs text-ink-400">Posted {timeAgo(job.postedDate)}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white mb-4 leading-tight">
              {job.title}
            </h1>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed mb-6">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map((s) => <Badge key={s} variant="primary">{s}</Badge>)}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-ink-200 dark:border-ink-800">
              <InfoItem icon={<DollarSign className="w-4 h-4" />} label="Budget" value={`${formatCurrency(job.budget.min)} - ${formatCurrency(job.budget.max)}`} />
              <InfoItem icon={<Calendar className="w-4 h-4" />} label="Deadline" value={job.deadline} />
              <InfoItem icon={<MapPin className="w-4 h-4" />} label="Location" value={job.location} />
              <InfoItem icon={<Users className="w-4 h-4" />} label="Proposals" value={String(job.proposalsCount)} />
            </div>
          </div>

          {/* Client info */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4">About the Client</h2>
            <div className="flex items-center gap-4">
              <Avatar name={job.clientName} src={job.clientAvatar} size="lg" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-ink-900 dark:text-ink-50">{job.clientName}</span>
                  {job.verified && <BadgeCheck className="w-4 h-4 text-primary-500" />}
                </div>
                <p className="text-xs text-ink-400">{job.location} · Member since 2023</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">Verified</Badge>
                  <span className="text-xs text-ink-400">12 jobs posted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-strong rounded-2xl p-6 lg:sticky lg:top-24">
            <div className="text-center mb-6">
              <p className="text-xs uppercase tracking-wide text-ink-400 font-medium mb-1">Budget Range</p>
              <p className="text-2xl font-display font-bold text-ink-900 dark:text-white">
                {formatCurrency(job.budget.min)} - {formatCurrency(job.budget.max)}
              </p>
            </div>
            <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between text-ink-500 dark:text-ink-400">
                <span>Proposals</span>
                <span className="font-semibold text-ink-700 dark:text-ink-200">{job.proposalsCount}</span>
              </div>
              <div className="flex justify-between text-ink-500 dark:text-ink-400">
                <span>Experience</span>
                <span className="font-semibold text-ink-700 dark:text-ink-200">{job.experienceLevel}</span>
              </div>
              <div className="flex justify-between text-ink-500 dark:text-ink-400">
                <span>Deadline</span>
                <span className="font-semibold text-ink-700 dark:text-ink-200">{job.deadline}</span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full mb-3"
              onClick={() => user ? setShowProposal(true) : navigate('/login')}
            >
              <Send className="w-4 h-4" /> Submit Proposal
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/chat')}>
              Message Client
            </Button>
          </div>
        </div>
      </div>

      <Modal open={showProposal} onClose={() => setShowProposal(false)} title="Submit Proposal" size="md">
        <form onSubmit={handleProposal} className="space-y-4">
          <Textarea
            label="Cover Letter"
            placeholder="Explain why you are the best fit for this job..."
            rows={5}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Your Quote ($)"
              type="number"
              placeholder="2500"
              icon={<DollarSign className="w-4 h-4" />}
              value={quotePrice}
              onChange={(e) => setQuotePrice(e.target.value)}
            />
            <Input
              label="Delivery (days)"
              type="number"
              placeholder="14"
              icon={<Clock className="w-4 h-4" />}
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowProposal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1"><Send className="w-4 h-4" /> Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-ink-400 text-xs mb-0.5">{icon} {label}</div>
      <p className="font-semibold text-sm text-ink-700 dark:text-ink-200">{value}</p>
    </div>
  );
}
