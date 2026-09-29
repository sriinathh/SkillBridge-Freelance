import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-strong rounded-2xl shadow-card dark:shadow-card-dark p-6',
        hover && 'transition-all duration-300 hover:shadow-glow hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
