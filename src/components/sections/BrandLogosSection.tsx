import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

type LogoBlockProps = {
  className?: string;
  label: string;
};

function LogoBlock({ className, label }: LogoBlockProps) {
  return (
    <div className="flex justify-center">
      <div
        className={cn('mask-logo rounded bg-foreground/20', className)}
        aria-label={label}
        role="img"
      />
    </div>
  );
}

export function BrandLogosSection() {
  return (
    <section className="bg-background py-16 transition-colors duration-200" id="work">
      <Container className="text-center">
        <h3 className="mb-10 text-sm font-bold uppercase tracking-widest text-muted-foreground/70">
          Trusted by leading global brands
        </h3>
        <div className="grid grid-cols-2 items-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 md:grid-cols-4 lg:grid-cols-6">
          <LogoBlock className="h-8 w-32" label="Abstract logo shape representing a tech brand" />
          <LogoBlock className="h-8 w-24" label="Abstract logo shape representing a fashion brand" />
          <LogoBlock className="h-10 w-28" label="Abstract logo shape representing a beauty brand" />
          <LogoBlock
            className="h-8 w-32"
            label="Abstract logo shape representing a lifestyle brand"
          />
          <LogoBlock className="h-9 w-24" label="Abstract logo shape representing a drink brand" />
          <LogoBlock className="h-8 w-28" label="Abstract logo shape representing a travel brand" />
        </div>
      </Container>
    </section>
  );
}

