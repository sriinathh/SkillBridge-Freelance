import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} />;
}

export function GigCardSkeleton() {
  return (
    <div className="glass-strong rounded-2xl overflow-hidden">
      <Skeleton className="w-full h-44 rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-24 h-3" />
        </div>
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-20 h-6" />
        </div>
      </div>
    </div>
  );
}
