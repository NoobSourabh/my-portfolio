import type { ReactNode } from 'react';
import { CheckCircle, Film, Handshake, Megaphone } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';

type Service = {
  title: string;
  description: string;
  icon: ReactNode;
  bullets: string[];
};

function ServiceCard({ title, description, icon, bullets }: Service) {
  return (
    <Card className="group relative p-8 hover:border-primary/50 hover:shadow-md">
      <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity duration-200 group-hover:opacity-20">
        <span className="text-primary">{icon}</span>
      </div>

      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-extrabold text-foreground">{title}</h3>
      <p className="mb-6 text-muted-foreground">{description}</p>

      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
            {b}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ServicesSection() {
  const services: Service[] = [
    {
      title: 'Sponsored Reels',
      description:
        'High-production value short-form video content optimized for the Instagram algorithm. Includes scripting, filming, and editing.',
      icon: <Film className="h-6 w-6" />,
      bullets: ['9:16 Vertical Format', 'Trending Audio Research'],
    },
    {
      title: 'UGC Production',
      description:
        "Authentic, relatable content created specifically for your brand's owned channels. Perfect for paid ad creatives.",
      icon: <Megaphone className="h-6 w-6" />,
      bullets: ['Whitelisting Available', 'Rapid Turnaround'],
    },
    {
      title: 'Brand Ambassadorship',
      description:
        'Long-term partnerships that build deep trust with my audience. Includes a mix of Reels, Stories, and exclusive codes.',
      icon: <Handshake className="h-6 w-6" />,
      bullets: ['3-12 Month Contracts', 'Exclusive Category Lock'],
    },
  ];

  return (
    <section className="py-20 transition-colors duration-200 lg:py-28" id="services">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl">
            How we can collaborate
          </h2>
          <p className="text-lg text-muted-foreground">
            Tailored content packages designed to meet your specific marketing goals, from brand
            awareness to direct conversion.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}

