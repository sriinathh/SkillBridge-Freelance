import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function StarRating({ rating, size = 'sm', showValue, reviewCount, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - (i - 1)));
          return (
            <div key={i} className="relative">
              <Star className={cn(sizes[size], 'text-ink-300 dark:text-ink-700')} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={cn(sizes[size], 'text-amber-400 fill-amber-400')} />
              </div>
            </div>
          );
        })}
      </div>
      {showValue && <span className="font-semibold text-ink-800 dark:text-ink-100 text-sm">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-ink-400 dark:text-ink-500 text-xs">({reviewCount})</span>
      )}
    </div>
  );
}
