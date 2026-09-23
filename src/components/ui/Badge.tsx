import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
        'bg-primary/10 text-primary',
        className,
      )}
      {...props}
    />
  );
}

