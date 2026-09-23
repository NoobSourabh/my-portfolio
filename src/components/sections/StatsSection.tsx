import type { ReactNode } from 'react';
import { ArrowUp, Heart, PlayCircle, ShoppingBag, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

type StatCardProps = {
  label: string;
  value: string;
  sublabel: string;
  icon: ReactNode;
};

function StatCard({ label, value, sublabel, icon }: StatCardProps) {
  return (
    <Card className="group flex flex-col p-6 hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="text-primary opacity-80">{icon}</span>
      </div>
      <h3 className="mb-1 text-4xl font-extrabold text-foreground">{value}</h3>
      <p className="flex items-center gap-1 text-sm font-medium text-primary">
        <ArrowUp className="h-4 w-4" />
        {sublabel}
      </p>
    </Card>
  );
}

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/40 py-16 transition-colors duration-200">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Audience"
            value="1.2M"
            sublabel="12% vs last month"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            label="Engagement"
            value="5.8%"
            sublabel="Industry Top 5%"
            icon={<Heart className="h-5 w-5" />}
          />
          <StatCard
            label="Avg Views"
            value="450K"
            sublabel="Per Reel"
            icon={<PlayCircle className="h-5 w-5" />}
          />
          <StatCard
            label="Conversion"
            value="2.8%"
            sublabel="CTR Average"
            icon={<ShoppingBag className="h-5 w-5" />}
          />
        </div>
      </Container>
    </section>
  );
}

