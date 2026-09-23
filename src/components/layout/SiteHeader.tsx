import { useState } from 'react';
import { BadgeCheck, Menu, Moon, Sun, X } from 'lucide-react';
import { useThemeFacade } from '@/hooks/useThemeFacade';
import { Container } from '@/components/ui/Container';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
] as const;

export function SiteHeader() {
  const { isDark, toggleTheme } = useThemeFacade();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-7 w-7 text-primary" />
          <span className="text-xl font-extrabold tracking-tight">ALEX.CREATOR</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              href={href}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <IconButton
            label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </IconButton>

          <a
            className="hidden items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
            href="#contact"
          >
            Work with Me
          </a>

          <IconButton
            label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </IconButton>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border bg-background transition-all duration-200 md:hidden',
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-accent hover:text-primary"
              href={href}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a
            className="rounded-lg bg-[hsl(var(--primary))] px-4 py-3 text-center text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-colors duration-200 hover:opacity-95"
            href="#contact"
            onClick={closeMenu}
          >
            Work with Me
          </a>
        </nav>
      </div>
    </header>
  );
}

