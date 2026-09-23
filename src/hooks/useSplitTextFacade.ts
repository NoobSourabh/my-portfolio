import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export type SplitType = 'chars' | 'words' | 'lines';

export interface SplitToken {
  key: string;
  value: string;
  isWhitespace: boolean;
  isLineBreak: boolean;
}

export interface UseSplitTextFacadeOptions {
  text: string;
  splitType?: SplitType;
  delay?: number; // milliseconds between tokens
  duration?: number; // seconds
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

gsap.registerPlugin(useGSAP);

function splitToTokens(text: string, splitType: SplitType): SplitToken[] {
  if (!text) return [];

  if (splitType === 'words') {
    const parts = text.split(/(\s+)/);
    return parts.map((value, idx) => ({
      key: `w-${idx}`,
      value,
      isWhitespace: /^\s+$/.test(value),
      isLineBreak: false,
    }));
  }

  if (splitType === 'lines') {
    const lines = text.split('\n');
    const tokens: SplitToken[] = [];
    lines.forEach((line, lineIdx) => {
      tokens.push({
        key: `l-${lineIdx}`,
        value: line,
        isWhitespace: false,
        isLineBreak: false,
      });
      if (lineIdx !== lines.length - 1) {
        tokens.push({
          key: `lb-${lineIdx}`,
          value: '\n',
          isWhitespace: true,
          isLineBreak: true,
        });
      }
    });
    return tokens;
  }

  // chars
  return Array.from(text).map((value, idx) => ({
    key: `c-${idx}`,
    value,
    isWhitespace: value.trim().length === 0,
    isLineBreak: value === '\n',
  }));
}

export function useSplitTextFacade({
  text,
  splitType = 'chars',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  onAnimationComplete,
}: UseSplitTextFacadeOptions) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const hasAnimatedRef = useRef(false);

  const tokens = useMemo(() => splitToTokens(text, splitType), [text, splitType]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setIsInView(true);
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;
      if (!isInView) return;
      if (hasAnimatedRef.current) return;

      hasAnimatedRef.current = true;

      const prefersReducedMotion =
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

      const nodes = Array.from(el.querySelectorAll<HTMLElement>('[data-split-part="true"]'));
      if (nodes.length === 0) return;

      if (prefersReducedMotion) {
        gsap.set(nodes, to);
        setHasCompleted(true);
        onAnimationComplete?.();
        return;
      }

      gsap.fromTo(
        nodes,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            setHasCompleted(true);
            onAnimationComplete?.();
          },
        },
      );
    },
    {
      scope: containerRef,
      dependencies: [
        isInView,
        text,
        splitType,
        delay,
        duration,
        ease,
        threshold,
        rootMargin,
        onAnimationComplete,
      ],
    },
  );

  return { containerRef, tokens, hasCompleted };
}

