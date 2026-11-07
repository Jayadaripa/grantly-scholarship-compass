import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui";
import { useAppState } from "@/lib/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Scholarships" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const { profile } = useAppState();
  const startTo = profile ? "/dashboard" : "/onboarding";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground data-[status=active]:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm"><Link to={startTo}>{profile ? "Dashboard" : "Sign In"}</Link></Button>
          <Button asChild size="sm"><Link to={startTo}>Get Started</Link></Button>
        </div>
        <button className="grid size-10 place-items-center rounded-lg md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-card px-4 pb-4 md:hidden animate-in slide-in-from-top-2 fade-in">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary">{l.label}</Link>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button asChild variant="outline"><Link to={startTo}>{profile ? "Dashboard" : "Sign In"}</Link></Button>
            <Button asChild><Link to={startTo}>Get Started</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo tagline />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Discover scholarships, understand eligibility, and manage your applications — all in one place.
          </p>
        </div>
        <FooterCol title="Product" items={[["/explore", "Explore Scholarships"], ["/how-it-works", "How It Works"], ["/navigator", "GRANTLY AI"]]} />
        <FooterCol title="Company" items={[["/about", "About"], ["/contact", "Contact"]]} />
        <FooterCol title="Legal" items={[["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]]} />
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © 2026 GRANTLY · Hackathon prototype. All scholarships shown are demonstration data, not verified opportunities.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map(([to, label]) => (
          <li key={to}><Link to={to} className="text-sm text-muted-foreground hover:text-primary">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{title}</h1>
        <div className="mt-8 space-y-5 text-[15px] leading-7 text-muted-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">{children}</div>
      </section>
    </MarketingLayout>
  );
}
