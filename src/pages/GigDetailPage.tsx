import { useState } from 'react';
import { Clock, Heart, Share2, ChevronRight, Check, MessageSquare, ThumbsUp, ChevronDown } from 'lucide-react';
import { getGigById, getFreelancerById } from '@/lib/mockData';
import { navigate } from '@/lib/router';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';
import { useToast } from '@/context/ToastContext';

export function GigDetailPage({ id }: { id: string }) {
  const gig = getGigById(id);
  const { toast } = useToast();
  const [selectedPkg, setSelectedPkg] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!gig) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">Gig not found</h1>
        <Button onClick={() => navigate('/gigs')}>Back to Gigs</Button>
      </div>
    );
  }

  const freelancer = getFreelancerById(gig.freelancerId);
  const pkg = gig.packages[selectedPkg];
  const gallery = [gig.image, ...gig.gallery];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-ink-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-primary-500">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate('/gigs')} className="hover:text-primary-500">Gigs</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink-600 dark:text-ink-300 truncate">{gig.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title + actions */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white leading-tight">
                {gig.title}
              </h1>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toast('Added to favorites!')} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-500 hover:text-rose-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button onClick={() => toast('Link copied!', 'info')} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-500 hover:text-primary-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <StarRating rating={gig.rating} showValue reviewCount={gig.reviewCount} size="md" />
              <span className="text-sm text-ink-400 flex items-center gap-1">
                <Clock className="w-4 h-4" /> {gig.deliveryDays} day delivery
              </span>
              <Badge variant="primary">{gig.inQueue} in queue</Badge>
            </div>
          </div>

          {/* Gallery */}
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="aspect-video bg-ink-100 dark:bg-ink-800">
              <img src={gallery[activeImage]} alt={gig.title} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all',
                      activeImage === i ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white mb-4">About This Gig</h2>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed">{gig.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {gig.tags.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
            </div>
          </div>

          {/* Seller */}
          {freelancer && (
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white mb-4">About The Seller</h2>
              <div className="flex items-start gap-4">
                <Avatar name={freelancer.name} src={freelancer.avatar} size="xl" />
                <div className="flex-1">
                  <button onClick={() => navigate(`/freelancers/${freelancer.id}`)} className="font-display font-bold text-lg text-ink-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {freelancer.name}
                  </button>
                  <p className="text-sm text-ink-500 dark:text-ink-400 mb-2">{freelancer.title}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <StarRating rating={freelancer.rating} showValue size="sm" />
                    <Badge variant="accent">{freelancer.level}</Badge>
                    <span className="text-xs text-ink-400">Responds in {freelancer.responseTime}</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/chat')}>
                    <MessageSquare className="w-4 h-4" /> Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* FAQs */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white mb-4">FAQs</h2>
            <div className="space-y-2">
              {gig.faqs.map((faq, i) => (
                <div key={i} className="border-b border-ink-200 dark:border-ink-800 last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-3 text-left"
                  >
                    <span className="font-medium text-sm text-ink-900 dark:text-ink-50">{faq.q}</span>
                    <ChevronDown className={cn('w-5 h-5 text-ink-400 transition-transform', openFaq === i && 'rotate-180')} />
                  </button>
                  {openFaq === i && (
                    <p className="pb-3 text-sm text-ink-500 dark:text-ink-400">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">Reviews</h2>
              <StarRating rating={gig.rating} showValue reviewCount={gig.reviewCount} size="md" />
            </div>
            <div className="space-y-4">
              {gig.reviews.map((review) => (
                <div key={review.id} className="border-b border-ink-200 dark:border-ink-800 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar name={review.author} src={review.authorAvatar} size="sm" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-ink-900 dark:text-ink-50">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-xs text-ink-400">{timeAgo(review.date)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-300 mb-2">{review.comment}</p>
                  <button className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-primary-500 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pricing packages */}
        <div className="lg:col-span-1">
          <div className="glass-strong rounded-2xl overflow-hidden lg:sticky lg:top-24">
            {/* Package tabs */}
            <div className="flex border-b border-ink-200 dark:border-ink-800">
              {gig.packages.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPkg(i)}
                  className={cn(
                    'flex-1 py-3 text-sm font-semibold transition-colors',
                    selectedPkg === i
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 border-b-2 border-primary-500'
                      : 'text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800/50'
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="p-6">
              <p className="text-sm text-ink-500 dark:text-ink-400 mb-1">{pkg.description}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-display font-extrabold text-ink-900 dark:text-white">
                  {formatCurrency(pkg.price)}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-ink-500 dark:text-ink-400 mb-4 pb-4 border-b border-ink-200 dark:border-ink-800">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {pkg.delivery} days</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> {pkg.revisions} revisions</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-200">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="w-full mb-3"
                onClick={() => toast('Order placed! Redirecting to checkout...', 'info')}
              >
                Continue ({formatCurrency(pkg.price)})
              </Button>
              <Button variant="outline" size="md" className="w-full" onClick={() => navigate('/chat')}>
                <MessageSquare className="w-4 h-4" /> Contact Seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
