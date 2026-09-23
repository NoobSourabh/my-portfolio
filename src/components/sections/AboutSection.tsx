import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export function AboutSection() {
  return (
    <section className="py-20 transition-colors duration-200" id="about">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl">About Alex</h2>
          <p className="text-lg text-muted-foreground">
            I help lifestyle brands reach Gen Z with authentic storytelling, high-fidelity visuals,
            and performance-focused strategy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Strategy
            </p>
            <p className="mt-2 text-muted-foreground">
              Content that maps to your funnel—awareness to conversion—with clear creative angles.
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Production
            </p>
            <p className="mt-2 text-muted-foreground">
              Scripting, filming, editing—delivered in formats that match platform best practices.
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Performance
            </p>
            <p className="mt-2 text-muted-foreground">
              Iterative creative testing and reporting so you can scale what works.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

