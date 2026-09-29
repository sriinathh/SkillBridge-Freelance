import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Plus } from 'lucide-react';
import { jobs, categories } from '@/lib/mockData';
import { cn, formatCurrency } from '@/lib/utils';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/Button';
import { navigate } from '@/lib/router';

export function JobsBrowsePage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [expLevel, setExpLevel] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => {
      const matchesSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = !selectedCat || j.category === selectedCat;
      const matchesExp = !expLevel || j.experienceLevel === expLevel;
      return matchesSearch && matchesCat && matchesExp;
    });
    if (sortBy === 'budget-high') result = [...result].sort((a, b) => b.budget.max - a.budget.max);
    if (sortBy === 'budget-low') result = [...result].sort((a, b) => a.budget.min - b.budget.min);
    if (sortBy === 'proposals') result = [...result].sort((a, b) => b.proposalsCount - a.proposalsCount);
    return result;
  }, [search, selectedCat, expLevel, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white mb-2">
            Browse Jobs
          </h1>
          <p className="text-ink-500 dark:text-ink-400">Find your next great project</p>
        </div>
        <Button onClick={() => navigate('/jobs/new')} className="hidden sm:flex">
          <Plus className="w-5 h-5" /> Post a Job
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Filters */}
        <aside className={cn(
          'w-64 shrink-0',
          showFilters ? 'fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm lg:relative lg:bg-transparent lg:z-auto lg:backdrop-blur-none' : 'hidden lg:block'
        )}>
          <div className={cn(
            'glass-strong rounded-2xl p-5 space-y-5 h-fit lg:sticky lg:top-24',
            showFilters && 'absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] rounded-none lg:rounded-2xl lg:w-64 overflow-y-auto'
          )}>
            <div className="flex items-center justify-between lg:hidden">
              <h3 className="font-display font-bold text-ink-900 dark:text-white">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5 text-ink-400" /></button>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink-900 dark:text-ink-50 mb-3">Category</h4>
              <div className="space-y-1">
                <button onClick={() => setSelectedCat('')} className={cn('w-full text-left px-3 py-2 rounded-lg text-sm', !selectedCat ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800')}>
                  All Categories
                </button>
                {categories.map((c) => (
                  <button key={c.id} onClick={() => setSelectedCat(c.id)} className={cn('w-full text-left px-3 py-2 rounded-lg text-sm', selectedCat === c.id ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800')}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink-900 dark:text-ink-50 mb-3">Experience Level</h4>
              <div className="space-y-1">
                {['', 'Entry', 'Intermediate', 'Expert'].map((l) => (
                  <button key={l || 'any'} onClick={() => setExpLevel(l)} className={cn('w-full text-left px-3 py-2 rounded-lg text-sm', expLevel === l ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800')}>
                    {l || 'Any Level'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="w-full h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 pl-11 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-4 text-sm outline-none cursor-pointer focus:border-primary-500">
              <option value="newest">Newest</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="budget-low">Budget: Low to High</option>
              <option value="proposals">Most Proposals</option>
            </select>
            <button onClick={() => setShowFilters(true)} className="lg:hidden h-11 w-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 text-ink-600 dark:text-ink-300" />
            </button>
          </div>

          <p className="text-sm text-ink-400 mb-4">{loading ? 'Loading...' : `${filtered.length} jobs found`}</p>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-strong rounded-2xl p-5 animate-pulse">
                  <div className="flex gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-ink-200 dark:bg-ink-800" />
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-3 bg-ink-200 dark:bg-ink-800 rounded" />
                      <div className="w-48 h-2 bg-ink-200 dark:bg-ink-800 rounded" />
                    </div>
                  </div>
                  <div className="w-3/4 h-4 bg-ink-200 dark:bg-ink-800 rounded mb-2" />
                  <div className="w-full h-3 bg-ink-200 dark:bg-ink-800 rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass-strong rounded-2xl p-16 text-center">
              <p className="text-ink-400 text-lg mb-2">No jobs found</p>
              <Button variant="outline" onClick={() => { setSearch(''); setSelectedCat(''); setExpLevel(''); }}>Clear Filters</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </div>
      </div>

      <button onClick={() => navigate('/jobs/new')} className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-600 text-white shadow-glow flex items-center justify-center z-40">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
