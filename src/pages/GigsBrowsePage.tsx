import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react';
import { gigs, categories } from '@/lib/mockData';
import { getPath } from '@/lib/router';
import { cn, formatCurrency } from '@/lib/utils';
import { GigCard } from '@/components/GigCard';
import { GigCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function getQueryParam(key: string): string | null {
  const path = getPath();
  const qIndex = path.indexOf('?');
  if (qIndex === -1) return null;
  const params = new URLSearchParams(path.slice(qIndex + 1));
  return params.get(key);
}

export function GigsBrowsePage() {
  const [search, setSearch] = useState(getQueryParam('q') || '');
  const [selectedCat, setSelectedCat] = useState(getQueryParam('cat') || '');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let result = gigs.filter((g) => {
      const matchesSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = !selectedCat || g.category === selectedCat;
      const matchesRating = g.rating >= minRating;
      const matchesPrice = g.startingPrice <= maxPrice;
      return matchesSearch && matchesCat && matchesRating && matchesPrice;
    });

    switch (sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.startingPrice - b.startingPrice); break;
      case 'price-high': result = [...result].sort((a, b) => b.startingPrice - a.startingPrice); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'newest': result = [...result].reverse(); break;
    }
    return result;
  }, [search, selectedCat, minRating, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCat('');
    setMinRating(0);
    setMaxPrice(3000);
  };

  const activeFilterCount = (selectedCat ? 1 : 0) + (minRating > 0 ? 1 : 0) + (maxPrice < 3000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white mb-2">
          Explore Gigs
        </h1>
        <p className="text-ink-500 dark:text-ink-400">Discover services from talented freelancers worldwide</p>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
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
                <button
                  onClick={() => setSelectedCat('')}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    !selectedCat ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                  )}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCat(c.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      selectedCat === c.id ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-ink-900 dark:text-ink-50 mb-3">Minimum Rating</h4>
              <div className="space-y-1">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      minRating === r ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                    )}
                  >
                    {r === 0 ? 'Any rating' : <><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {r}+ stars</>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-ink-900 dark:text-ink-50 mb-3">Max Budget</h4>
              <input
                type="range"
                min={50}
                max={3000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary-500"
              />
              <div className="flex justify-between text-xs text-ink-400 mt-1">
                <span>$50</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">{formatCurrency(maxPrice)}</span>
              </div>
            </div>

            {activeFilterCount > 0 && (
              <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                Clear All Filters
              </Button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search gigs..."
                className="w-full h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 pl-11 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-4 text-sm outline-none cursor-pointer focus:border-primary-500"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden h-11 w-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 flex items-center justify-center relative"
            >
              <SlidersHorizontal className="w-5 h-5 text-ink-600 dark:text-ink-300" />
              {activeFilterCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white text-[9px] rounded-full flex items-center justify-center">{activeFilterCount}</span>}
            </button>
          </div>

          <p className="text-sm text-ink-400 mb-4">
            {loading ? 'Loading...' : `${filtered.length} gigs found`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <GigCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass-strong rounded-2xl p-16 text-center">
              <p className="text-ink-400 text-lg mb-2">No gigs found</p>
              <p className="text-sm text-ink-400 mb-4">Try adjusting your filters or search terms</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((gig) => <GigCard key={gig.id} gig={gig} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
