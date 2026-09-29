import { useState } from 'react';
import { MapPin, Clock, Mail, Globe, Briefcase, GraduationCap, Award, CheckCircle2, MessageSquare, Heart, Share2, ChevronRight } from 'lucide-react';
import { getFreelancerById, gigs } from '@/lib/mockData';
import { navigate } from '@/lib/router';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';
import { Card } from '@/components/ui/Card';
import { GigCard } from '@/components/GigCard';
import { useToast } from '@/context/ToastContext';

type Tab = 'overview' | 'portfolio' | 'experience' | 'reviews';

export function FreelancerProfilePage({ id }: { id: string }) {
  const freelancer = getFreelancerById(id);
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('overview');

  if (!freelancer) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">Freelancer not found</h1>
        <Button onClick={() => navigate('/freelancers')}>Back to Freelancers</Button>
      </div>
    );
  }

  const freelancerGigs = gigs.filter((g) => g.freelancerId === id);
  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'experience', label: 'Experience' },
    { key: 'reviews', label: 'Reviews' },
  ];

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img src={freelancer.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-20 mb-8 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-full blur-xl" />
            <Avatar name={freelancer.name} src={freelancer.avatar} size="xl" className="ring-4 ring-white dark:ring-ink-950 relative" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white">{freelancer.name}</h1>
            <p className="text-ink-500 dark:text-ink-400 mb-2">{freelancer.title}</p>
            <div className="flex items-center gap-4 flex-wrap text-sm text-ink-400">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {freelancer.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Responds in {freelancer.responseTime}</span>
              <StarRating rating={freelancer.rating} showValue reviewCount={freelancer.reviewCount} size="sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast('Saved to favorites!')} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-500 hover:text-rose-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button onClick={() => toast('Profile link copied!', 'info')} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-500 hover:text-primary-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <Button onClick={() => navigate('/chat')}>
              <MessageSquare className="w-4 h-4" /> Contact
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pb-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 border-b border-ink-200 dark:border-ink-800">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                    tab === t.key
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {tab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-3">About</h2>
                  <p className="text-ink-600 dark:text-ink-300 leading-relaxed">{freelancer.bio}</p>
                </Card>
                <Card>
                  <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((s) => <Badge key={s} variant="primary">{s}</Badge>)}
                  </div>
                </Card>
                {freelancerGigs.length > 0 && (
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4">My Gigs</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {freelancerGigs.map((g) => <GigCard key={g.id} gig={g} />)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'portfolio' && (
              <div className="grid sm:grid-cols-2 gap-4 animate-fade-in">
                {freelancer.portfolio.map((p, i) => (
                  <div key={i} className="glass-strong rounded-2xl overflow-hidden group cursor-pointer">
                    <div className="aspect-video overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-ink-900 dark:text-ink-50">{p.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'experience' && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary-500" /> Work Experience
                  </h2>
                  <div className="space-y-6">
                    {freelancer.experience.map((exp, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-ink-900 dark:text-ink-50">{exp.role}</h3>
                          <p className="text-xs text-primary-600 dark:text-primary-400 mb-1">{exp.company} · {exp.period}</p>
                          <p className="text-sm text-ink-500 dark:text-ink-400">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-accent-500" /> Education
                  </h2>
                  <div className="space-y-4">
                    {freelancer.education.map((edu, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 shrink-0" />
                        <div>
                          <h3 className="font-semibold text-sm text-ink-900 dark:text-ink-50">{edu.degree}</h3>
                          <p className="text-xs text-ink-400">{edu.school} · {edu.period}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                {freelancer.certifications.length > 0 && (
                  <Card>
                    <h2 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" /> Certifications
                    </h2>
                    <div className="space-y-3">
                      {freelancer.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{cert.name}</p>
                            <p className="text-xs text-ink-400">{cert.issuer} · {cert.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="space-y-4 animate-fade-in">
                <Card className="text-center">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <p className="text-4xl font-display font-extrabold text-ink-900 dark:text-white">{freelancer.rating}</p>
                      <StarRating rating={freelancer.rating} size="md" className="justify-center mt-1" />
                      <p className="text-xs text-ink-400 mt-1">{freelancer.reviewCount} reviews</p>
                    </div>
                  </div>
                </Card>
                {gigs.filter((g) => g.freelancerId === id).flatMap((g) => g.reviews).map((r) => (
                  <Card key={r.id}>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar name={r.author} src={r.authorAvatar} size="md" />
                      <div>
                        <p className="font-semibold text-sm text-ink-900 dark:text-ink-50">{r.author}</p>
                        <StarRating rating={r.rating} size="sm" />
                      </div>
                    </div>
                    <p className="text-sm text-ink-600 dark:text-ink-300">{r.comment}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <div className="text-center mb-4">
                <p className="text-xs uppercase tracking-wide text-ink-400 mb-1">Hourly Rate</p>
                <p className="text-3xl font-display font-extrabold text-ink-900 dark:text-white">
                  {formatCurrency(freelancer.hourlyRate)}<span className="text-base text-ink-400">/hr</span>
                </p>
              </div>
              <Button size="lg" className="w-full mb-3" onClick={() => navigate('/chat')}>
                <MessageSquare className="w-4 h-4" /> Contact Me
              </Button>
              <Button variant="outline" className="w-full" onClick={() => freelancerGigs.length > 0 ? navigate(`/gigs/${freelancerGigs[0].id}`) : navigate('/gigs')}>
                View My Gigs
              </Button>
            </Card>

            <Card>
              <h3 className="font-semibold text-sm text-ink-900 dark:text-ink-50 mb-3">Availability</h3>
              <Badge variant={freelancer.availability === 'Full-time' ? 'success' : freelancer.availability === 'Part-time' ? 'warning' : 'error'}>
                {freelancer.availability}
              </Badge>
              <div className="mt-4 space-y-2 text-sm">
                <StatRow label="Completed Projects" value={String(freelancer.completedProjects)} />
                <StatRow label="Total Earnings" value={formatCurrency(freelancer.earnings)} />
                <StatRow label="Response Time" value={freelancer.responseTime} />
                <StatRow label="Rating" value={`${freelancer.rating} / 5.0`} />
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-sm text-ink-900 dark:text-ink-50 mb-3">Languages</h3>
              <div className="space-y-2">
                {freelancer.languages.map((l) => (
                  <div key={l.name} className="flex justify-between text-sm">
                    <span className="text-ink-600 dark:text-ink-300">{l.name}</span>
                    <span className="text-ink-400 text-xs">{l.level}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-sm text-ink-900 dark:text-ink-50 mb-3">Member Status</h3>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-ink-600 dark:text-ink-300">Verified Identity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-ink-600 dark:text-ink-300">Verified Email</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-400 text-xs">{label}</span>
      <span className="font-semibold text-ink-700 dark:text-ink-200 text-xs">{value}</span>
    </div>
  );
}
