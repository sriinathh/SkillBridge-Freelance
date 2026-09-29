import { useState, useMemo } from 'react';
import { Search, Star } from 'lucide-react';
import { freelancers, categories } from '@/lib/mockData';
import { cn, formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { navigate } from '@/lib/router';

export function FreelancersBrowsePage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let result = freelancers.filter((f) => {
      const matchesSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.title.toLowerCase().includes(search.toLowerCase()) || f.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesRating = f.rating >= minRating;
      return matchesSearch && matchesRating;
    });
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'projects') result = [...result].sort((a, b) => b.completedProjects - a.completedProjects);
    if (sortBy === 'earnings') result = [...result].sort((a, b) => b.earnings - a.earnings);
    return result;
  }, [search, minRating, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white mb-2">
          Top Freelancers
        </h1>
        <p className="text-ink-500 dark:text-ink-400">Hire vetted experts from around the world</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, skill, or title..."
            className="w-full h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 pl-11 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-4 text-sm outline-none cursor-pointer focus:border-primary-500">
          <option value={0}>Any Rating</option>
          <option value={4}>4.0+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
          <option value={4.8}>4.8+ Stars</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-4 text-sm outline-none cursor-pointer focus:border-primary-500">
          <option value="rating">Top Rated</option>
          <option value="projects">Most Projects</option>
          <option value="earnings">Highest Earnings</option>
        </select>
      </div>

      <p className="text-sm text-ink-400 mb-4">{filtered.length} freelancers found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((f) => (
          <Card key={f.id} hover onClick={() => navigate(`/freelancers/${f.id}`)}>
            <div className="flex items-start gap-4 mb-4">
              <Avatar name={f.name} src={f.avatar} size="lg" online={f.availability === 'Full-time'} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-ink-900 dark:text-ink-50 truncate">{f.name}</h3>
                <p className="text-xs text-ink-400 line-clamp-1 mb-1">{f.title}</p>
                <Badge variant="accent">{f.level}</Badge>
              </div>
            </div>
            <StarRating rating={f.rating} showValue reviewCount={f.reviewCount} className="mb-3" />
            <div className="flex flex-wrap gap-1.5 mb-4">
              {f.skills.slice(0, 3).map((s) => <Badge key={s} variant="default" className="text-[11px]">{s}</Badge>)}
              {f.skills.length > 3 && <Badge variant="default" className="text-[11px]">+{f.skills.length - 3}</Badge>}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-ink-200 dark:border-ink-800">
              <div>
                <p className="text-[10px] uppercase text-ink-400">Rate</p>
                <p className="text-sm font-bold text-ink-900 dark:text-ink-50">{formatCurrency(f.hourlyRate)}/hr</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-ink-400 text-right">Projects</p>
                <p className="text-sm font-bold text-ink-900 dark:text-ink-50 text-right">{f.completedProjects}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
