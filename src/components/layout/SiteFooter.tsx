import { BadgeCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40 py-12 transition-colors duration-200">
      <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-extrabold tracking-tight">ALEX.CREATOR</span>
        </div>

        <p className="text-center text-sm leading-5 text-muted-foreground">
          © 2024 Alex Creator Portfolio. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

