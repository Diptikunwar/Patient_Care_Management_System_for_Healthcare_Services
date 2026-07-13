import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Activity, LogOut, Menu, Bell, Search, X } from "lucide-react";
import { clearSession, useSession, type Role } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

const ROLE_LABEL: Record<Role, string> = {
  admin: "Administrator",
  doctor: "Physician",
  patient: "Patient",
};

export function DashboardShell({
  role,
  nav,
  children,
}: {
  role: Role;
  nav: NavItem[];
  children: ReactNode;
}) {
  const { user } = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  const logout = () => {
    clearSession();
    navigate({ to: "/login" });
  };

  const SidebarBody = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Activity className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-base font-semibold tracking-tight">MediCore</div>
          <div className="truncate text-xs text-muted-foreground">{ROLE_LABEL[role]} Portal</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {nav.map((item) => {
          const active = pathname === item.to || (item.to !== `/${role}` && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors " +
                (active
                  ? "bg-primary-soft text-primary font-medium"
                  : "text-sidebar-foreground/80 hover:bg-secondary hover:text-foreground")
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary-soft text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{user?.name ?? "Guest"}</div>
            <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} title="Log out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-sidebar lg:block">
        {SidebarBody}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-sidebar shadow-xl">
            <div className="flex justify-end p-2">
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {SidebarBody}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients, records, appointments…"
              className="h-10 pl-9"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary-soft text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
