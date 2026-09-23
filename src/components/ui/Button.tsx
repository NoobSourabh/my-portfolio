import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function getButtonClassName({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  return cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    variant === 'primary' &&
      'bg-primary text-primary-foreground shadow-md hover:opacity-95',
    variant === 'secondary' &&
      'border border-border bg-muted text-foreground hover:bg-accent hover:text-accent-foreground',
    variant === 'ghost' &&
      'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
    size === 'sm' && 'h-9 rounded-full px-4 text-sm',
    size === 'md' && 'h-11 rounded-full px-6 text-sm',
    size === 'lg' && 'h-12 rounded-full px-8 text-base',
    className,
  );
}

export function Button(props: ButtonProps) {
  const { className, variant = 'primary', size = 'md' } = props;
  const computed = getButtonClassName({ className, variant, size });

  if (props.as === 'a') {
    const { as: _as, ...anchorProps } = props;
    return <a className={computed} {...anchorProps} />;
  }

  const { as: _as, type = 'button', ...buttonProps } = props;
  return (
    <button
      type={type}
      className={computed}
      {...buttonProps}
    />
  );
}

