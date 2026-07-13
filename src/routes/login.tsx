import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, ShieldCheck, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAs, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — MediCore" },
      { name: "description", content: "Secure sign-in for MediCore administrators, physicians and patients." },
    ],
  }),
  component: LoginPage,
});

const ROLES: { role: Role; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { role: "admin", label: "Admin", desc: "Manage hospital operations", icon: ShieldCheck },
  { role: "doctor", label: "Doctor", desc: "Care for your patients", icon: Stethoscope },
  { role: "patient", label: "Patient", desc: "Track your health journey", icon: User },
];

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginAs(role, email || undefined);
    navigate({ to: `/${user.role}` });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(1 0 0 / 0.25), transparent 40%), radial-gradient(circle at 80% 60%, oklch(1 0 0 / 0.2), transparent 45%)",
        }} />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">MediCore Health</div>
              <div className="text-xs text-primary-foreground/80">Integrated Patient Care Management</div>
            </div>
          </div>
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              One connected platform for every corner of your hospital.
            </h1>
            <p className="text-primary-foreground/85">
              Coordinate admissions, clinical workflows and patient experiences from a single,
              secure workspace built for modern healthcare teams.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                ["120+", "Care teams"],
                ["48k", "Patients served"],
                ["99.99%", "Uptime SLA"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-white/15 bg-white/5 p-3">
                  <div className="text-xl font-semibold">{v}</div>
                  <div className="text-xs text-primary-foreground/80">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} MediCore Health · HIPAA compliant
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold">MediCore Health</div>
              <div className="text-xs text-muted-foreground">Patient Care Management</div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose your role to continue to the right workspace.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {ROLES.map(({ role: r, label, icon: Icon }) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={
                    "flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all " +
                    (active
                      ? "border-primary bg-primary-soft text-primary shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground")
                  }
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {ROLES.find((r) => r.role === role)?.desc}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`${role}@medicore.health`}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="h-11 w-full text-sm font-semibold">
              Sign in as {ROLES.find((r) => r.role === role)?.label}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Protected by role-based access controls and end-to-end encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
