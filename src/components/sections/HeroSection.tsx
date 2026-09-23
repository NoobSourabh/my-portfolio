import { Download, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

function PingDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
  );
}

function FloatingStatCard({ variant }: { variant: 'desktop' | 'mobile' }) {
  if (variant === 'mobile') {
    return (
      <div className="absolute -bottom-4 -right-2 flex items-center gap-3 rounded-xl border border-border bg-background p-3 shadow-xl transition-colors duration-200 animate-bounce [animation-duration:3s]">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Avg. Reach
          </p>
          <p className="text-base font-extrabold text-foreground">3.5M+</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-8 left-8 flex max-w-xs items-center gap-4 rounded-xl border border-border bg-background p-4 shadow-xl transition-colors duration-200">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
        <TrendingUp className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Avg. Reach
        </p>
        <p className="text-xl font-extrabold text-foreground">3.5M+</p>
      </div>
    </div>
  );
}

function PortraitCard({ variant }: { variant: 'desktop' | 'mobile' }) {
  return (
    <div className={cn('relative w-full', variant === 'desktop' ? 'h-full' : 'aspect-[4/5]')}>
      <div
        className={cn(
          'h-full w-full overflow-hidden rounded-2xl bg-muted shadow-2xl',
          'bg-[url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdQdwI1mFiI_HHm-6UIDFO4ebrHr0M0hLkYpKE3P4ITN8zEE3uzJ4T6w8mO0nfnsfunSFPGaKkoIqThsN0EozLa_Q7Caj_rq5GSbmYSulbFKIKXd0diMb0A7LofsGSI2IWtUlCtE6Qmltmnp5gjKDHSWxYt5PNNhhqtFw-Ibgys9uoQJD_y9lzngM47RmSlwcyFT5EwN1p-nvhYPb_yKL5UbsTEXJQ1xbifIgsz913N859RAy6CdgYoCquNNTVA0H0fyyJtWfpm-xN")] bg-cover bg-center',
        )}
        aria-label="Portrait of a professional creator smiling confidently in a modern studio setting"
        role="img"
      />
      <FloatingStatCard variant={variant} />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 transition-colors duration-200 lg:pt-24 lg:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex max-w-2xl flex-col gap-6">
            <Badge className="w-fit">
              <PingDot />
              Available for Q3 Collaborations
            </Badge>

            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Stories that <span className="text-primary">connect</span> &amp; convert.
            </h1>

            <div className="block w-full lg:hidden">
              <PortraitCard variant="mobile" />
            </div>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Hi, I&apos;m Alex. A digital strategist and content creator helping lifestyle brands
              resonate with Gen Z through high-fidelity, authentic storytelling.
            </p>

            <div className="flex w-full flex-col gap-4 pt-4 sm:w-auto sm:flex-row sm:gap-6">
              <a
                href="#contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[hsl(var(--primary))] px-8 font-semibold text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)_/_0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] sm:w-auto"
              >
                Work with Me
              </a>
              <a
                href="#media-kit"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-8 font-semibold text-[hsl(var(--foreground))] transition-all duration-200 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5 shrink-0" />
                Media Kit
              </a>
            </div>
          </div>

          <div className="relative hidden w-full lg:block lg:h-[600px]">
            <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-2xl bg-gradient-to-tr from-primary/20 to-transparent" />
            <PortraitCard variant="desktop" />
          </div>
        </div>
      </Container>
    </section>
  );
}

