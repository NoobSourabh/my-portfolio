import React from 'react';
import type {} from 'gsap';
import { cn } from '@/lib/utils';
import { useSplitTextFacade, type SplitType } from '@/hooks/useSplitTextFacade';

type SplitTextAs = 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3';

export interface SplitTextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  text: string;
  as?: SplitTextAs;
  delay?: number; // ms between tokens
  duration?: number; // seconds
  ease?: string;
  splitType?: SplitType;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text,
  as = 'div',
  className,
  style,
  delay,
  duration,
  ease,
  splitType,
  from,
  to,
  threshold,
  rootMargin,
  textAlign,
  onLetterAnimationComplete,
  showCallback,
  ...rest
}: SplitTextProps) {
  const { containerRef, tokens, hasCompleted } = useSplitTextFacade({
    text,
    splitType,
    delay,
    duration,
    ease,
    from,
    to,
    threshold,
    rootMargin,
    onAnimationComplete: onLetterAnimationComplete,
  });

  const Component = as as unknown as React.ElementType;

  return (
    <Component
      ref={containerRef}
      className={cn('transition-colors duration-200', className)}
      style={{ textAlign, ...style }}
      aria-label={text}
      role="text"
      {...rest}
    >
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {tokens.map((token) => {
          if (token.isLineBreak) {
            return <br key={token.key} />;
          }

          return (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={token.key}
              data-split-part="true"
              className={cn(
                'inline-block will-change-transform',
                token.isWhitespace && 'whitespace-pre',
                splitType === 'lines' && 'block',
              )}
            >
              {token.value}
            </span>
          );
        })}
      </span>

      {showCallback && hasCompleted ? (
        <span className="mt-2 block text-xs text-muted-foreground transition-colors duration-200">
          Animation complete
        </span>
      ) : null}
    </Component>
  );
}

