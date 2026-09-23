import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function MediaKitSection() {
  return (
    <section className="bg-muted/40 py-20 transition-colors duration-200" id="media-kit">
      <Container size="narrow">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-background shadow-2xl sm:px-16 sm:py-24 lg:flex lg:items-center lg:justify-between">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Need more details?
              <br />
              <span className="text-primary">Download my Media Kit.</span>
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Get a comprehensive breakdown of audience demographics, detailed case studies, and
              updated rate cards for 2024.
            </p>

            <div className="mt-8 flex gap-4">
              <Button
                className="bg-background text-foreground hover:bg-background/90"
                variant="ghost"
                size="lg"
              >
                Download PDF
              </Button>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex-shrink-0 lg:mt-0 lg:ml-8">
            <div className="flex h-48 w-48 rotate-6 items-center justify-center rounded-xl border border-background/10 bg-gradient-to-br from-primary to-primary/60 shadow-2xl">
              <span className="text-center text-xl font-extrabold tracking-widest text-background/80">
                MEDIA
                <br />
                KIT
                <br />
                2024
              </span>
            </div>
          </div>

          <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/20 blur-3xl" />
        </div>
      </Container>
    </section>
  );
}

