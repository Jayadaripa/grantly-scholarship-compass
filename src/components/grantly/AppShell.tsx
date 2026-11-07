import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Compass, ClipboardList, Bookmark, FileText, Sparkles, UserRound, Settings,
  Search, Bell, Menu, PanelLeftClose, PanelLeftOpen, LogOut, Home,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Logo, LogoMark } from "./Logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppState } from "@/lib/store";
import { scholarships, deadlineInfo, formatDate } from "@/lib/scholarships";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/explore", label: "Explore Scholarships", icon: Compass },
  { to: "/applications", label: "My Applications", icon: ClipboardList },
  { to: "/saved", label: "Saved Scholarships", icon: Bookmark },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/navigator", label: "AI Navigator", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="space-y-1" aria-label="App">
      {nav.map((n) => {
        const active = path === n.to || (n.to === "/explore" && path.startsWith("/scholarship"));
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={onNavigate}
            title={collapsed ? n.label : undefined}
            className={cn(
              "flex items-center gap-3 rounded-[11px] px-3 py-2.5 text-sm font-medium transition",
              active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              collapsed && "justify-center px-0",
            )}
          >
            <n.icon className={cn("size-[18px] shrink-0", active && "text-primary")} />
            {!collapsed && <span>{n.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { profile } = useAppState();
  const initials = (profile?.fullName || "Guest").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const soon = useMemo(
    () => scholarships.filter((s) => { const d = deadlineInfo(s.deadline); return d.days >= 0 && d.days <= 30; })
      .sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 4),
    [],
  );

  return (
    <div className="flex min-h-screen w-full">
      <aside className={cn("sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex", collapsed ? "w-[72px]" : "w-64")}>
        <div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
          {collapsed ? <Link to="/" aria-label="GRANTLY home"><LogoMark /></Link> : <Logo />}
        </div>
        <div className="flex-1 overflow-y-auto p-3"><NavList collapsed={collapsed} /></div>
        <div className="border-t border-sidebar-border p-3">
          <button onClick={() => setCollapsed(!collapsed)} className={cn("flex w-full items-center gap-3 rounded-[11px] px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary", collapsed && "justify-center px-0")} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <PanelLeftOpen className="size-[18px]" /> : <><PanelLeftClose className="size-[18px]" /> Collapse</>}
          </button>
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-16 items-center border-b border-border px-4"><Logo /></div>
          <div className="p-3"><NavList onNavigate={() => setMobileOpen(false)} /></div>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/85 px-4 backdrop-blur-md sm:px-6">
          <button className="grid size-10 place-items-center rounded-lg hover:bg-secondary md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu className="size-5" />
          </button>
          <form
            className="relative max-w-md flex-1"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/explore", search: { q: q.trim() || undefined } }); }}
            role="search"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search scholarships, providers, courses…" aria-label="Search scholarships" className="h-10 w-full rounded-[11px] border border-border bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-subtle focus:border-primary focus:bg-card focus:outline-none" />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="relative grid size-10 place-items-center rounded-[11px] text-muted-foreground hover:bg-secondary" aria-label="Notifications">
                <Bell className="size-[18px]" />
                {soon.length > 0 && <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary-bright ring-2 ring-card" />}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Deadlines in the next 30 days</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {soon.length === 0 && <p className="px-2 py-3 text-sm text-muted-foreground">Nothing due soon.</p>}
                {soon.map((s) => (
                  <DropdownMenuItem key={s.id} onSelect={() => navigate({ to: "/scholarship/$id", params: { id: s.id } })} className="flex-col items-start gap-0.5">
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="text-xs text-muted-foreground">Closes {formatDate(s.deadline)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-[11px] p-1 pr-2 hover:bg-secondary" aria-label="Account menu">
                <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{initials}</span>
                <span className="hidden text-sm font-medium sm:block">{profile?.fullName.split(" ")[0] ?? "Guest"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-semibold">{profile?.fullName ?? "Guest student"}</p>
                  <p className="truncate text-xs text-muted-foreground">{profile?.email ?? "No profile yet"}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate({ to: profile ? "/profile" : "/onboarding" })}><UserRound className="size-4" /> {profile ? "Profile" : "Create profile"}</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/settings" })}><Settings className="size-4" /> Settings</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/" })}><Home className="size-4" /> Back to home</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate({ to: "/" })}><LogOut className="size-4" /> Exit demo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 animate-in fade-in duration-300">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">{title}</h1>
        {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
      </div>
      {action}
    </div>
  );
}
