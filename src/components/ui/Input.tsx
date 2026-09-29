import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export function Input({ label, icon, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">{icon}</div>}
        <input
          className={cn(
            'w-full h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-4 text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none',
            icon && 'pl-11',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">{label}</label>}
      <textarea
        className={cn(
          'w-full rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none',
          error && 'border-rose-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, className, children, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">{label}</label>}
      <select
        className={cn(
          'w-full h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-4 text-sm text-ink-900 dark:text-ink-50 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none cursor-pointer',
          error && 'border-rose-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
