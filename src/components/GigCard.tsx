import { Clock, Heart, Share2 } from 'lucide-react';
import type { Gig } from '@/lib/mockData';
import { navigate } from '@/lib/router';
import { formatCurrency } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';

export function GigCard({ gig }: { gig: Gig }) {
  return (
    <div
      onClick={() => navigate(`/gigs/${gig.id}`)}
      className="glass-strong rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={gig.image}
          alt={gig.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
        {gig.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="primary" className="bg-white/90 text-primary-700 backdrop-blur">Featured</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="w-8 h-8 rounded-lg bg-white/90 dark:bg-ink-900/90 backdrop-blur flex items-center justify-center text-ink-600 hover:text-rose-500 transition-colors"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="w-8 h-8 rounded-lg bg-white/90 dark:bg-ink-900/90 backdrop-blur flex items-center justify-center text-ink-600 hover:text-primary-500 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Avatar name={gig.freelancerName} src={gig.freelancerAvatar} size="xs" />
          <span className="text-xs font-medium text-ink-700 dark:text-ink-200 truncate">{gig.freelancerName}</span>
          <Badge variant="accent" className="text-[10px] px-1.5 py-0">{gig.freelancerLevel}</Badge>
        </div>

        <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50 line-clamp-2 leading-snug mb-2 min-h-[2.5rem] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {gig.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={gig.rating} showValue reviewCount={gig.reviewCount} size="sm" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-ink-400 mb-3">
          <Clock className="w-3.5 h-3.5" />
          {gig.deliveryDays} days delivery
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-ink-200 dark:border-ink-800">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-ink-400 font-medium">Starting at</p>
            <p className="text-lg font-bold text-ink-900 dark:text-ink-50">{formatCurrency(gig.startingPrice)}</p>
          </div>
          <span className="text-xs text-ink-400">{gig.inQueue} in queue</span>
        </div>
      </div>
    </div>
  );
}
