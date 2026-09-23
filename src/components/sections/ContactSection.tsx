import type { ReactNode } from 'react';
import { Instagram, Mail, MessageCircle, Music, Youtube } from 'lucide-react';
import { useContactFormFacade } from '@/hooks/useContactFormFacade';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

function ContactMethod({
  icon,
  title,
  value,
  href,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/40 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <a className="text-lg font-extrabold text-foreground hover:text-primary" href={href}>
          {value}
        </a>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactSection() {
  const { values, status, setField, submit, reset } = useContactFormFacade();

  return (
    <section className="py-20 transition-colors duration-200 lg:py-32" id="contact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="mb-6 text-4xl font-extrabold text-foreground">
              Let&apos;s create something amazing.
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Ready to elevate your brand? Fill out the form or reach out directly via email. I
              typically respond within 24 hours.
            </p>

            <div className="space-y-6">
              <ContactMethod
                icon={<Mail className="h-5 w-5 text-foreground" />}
                title="Email Me"
                value="hello@alexcreator.com"
                href="mailto:hello@alexcreator.com"
              />
              <ContactMethod
                icon={<MessageCircle className="h-5 w-5 text-foreground" />}
                title="WhatsApp"
                value="+1 (555) 000-0000"
                href="#"
              />
            </div>

            <div className="mt-12">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground/70">
                Follow Me
              </h4>
              <div className="flex gap-3">
                <a href="#" aria-label="Instagram">
                  <IconButton label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </IconButton>
                </a>
                <a href="#" aria-label="TikTok">
                  <IconButton label="TikTok">
                    <Music className="h-5 w-5" />
                  </IconButton>
                </a>
                <a href="#" aria-label="YouTube">
                  <IconButton label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </IconButton>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="p-8 shadow-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="First name" htmlFor="first-name">
                    <Input
                      id="first-name"
                      name="first-name"
                      placeholder="Jane"
                      value={values.firstName}
                      onChange={(e) => setField('firstName', e.target.value)}
                    />
                  </Field>

                  <Field label="Last name" htmlFor="last-name">
                    <Input
                      id="last-name"
                      name="last-name"
                      placeholder="Doe"
                      value={values.lastName}
                      onChange={(e) => setField('lastName', e.target.value)}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Brand / Company" htmlFor="company">
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your Brand Name"
                        value={values.company}
                        onChange={(e) => setField('company', e.target.value)}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="Message" htmlFor="message">
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your campaign goals..."
                        rows={4}
                        value={values.message}
                        onChange={(e) => setField('message', e.target.value)}
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-end gap-3 sm:flex-row sm:justify-between">
                  {status === 'submitted' ? (
                    <p className="text-sm font-medium text-primary">
                      Message queued (demo). I&apos;ll get back to you soon.
                    </p>
                  ) : (
                    <span />
                  )}

                  <div className="flex w-full justify-end gap-3 sm:w-auto">
                    {status === 'submitted' ? (
                      <Button variant="secondary" onClick={reset}>
                        Reset
                      </Button>
                    ) : null}
                    <Button className="w-full sm:w-auto" type="submit">
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

