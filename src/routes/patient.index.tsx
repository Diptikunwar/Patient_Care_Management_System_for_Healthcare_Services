import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarPlus, HeartPulse, Activity, Droplet, Thermometer } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/patient/")({
  component: PatientHome,
});

const vitals = [
  { label: "Heart rate", value: "72", unit: "bpm", icon: HeartPulse, tone: "text-destructive" },
  { label: "Blood pressure", value: "118/78", unit: "mmHg", icon: Activity, tone: "text-primary" },
  { label: "Glucose", value: "94", unit: "mg/dL", icon: Droplet, tone: "text-success" },
  { label: "Temperature", value: "98.4", unit: "°F", icon: Thermometer, tone: "text-warning-foreground" },
];

const upcoming = [
  { title: "Cardiology follow-up", doctor: "Dr. Sarah Chen", date: "Wed, Aug 14 · 9:00 AM", room: "Room 204" },
  { title: "Blood work", doctor: "MediCore Lab", date: "Fri, Aug 16 · 8:30 AM", room: "Lab 1" },
];

const goals = [
  { label: "Daily steps", value: 7200, target: 10000 },
  { label: "Water intake", value: 1.6, target: 2.5, unit: "L" },
  { label: "Sleep", value: 6.4, target: 8, unit: "h" },
];

function PatientHome() {
  const { user } = useSession();
  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ")[0] ?? "there"}`}
        subtitle="Here's a summary of your health, appointments and care plan."
        actions={
          <Link to="/patient/book">
            <Button><CalendarPlus className="mr-1.5 h-4 w-4" />Book appointment</Button>
          </Link>
        }
      />

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, oklch(1 0 0 / 0.25), transparent 40%), radial-gradient(circle at 85% 70%, oklch(1 0 0 / 0.2), transparent 45%)",
        }} />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-sm text-primary-foreground/80">Your next visit</div>
            <h2 className="mt-1 text-2xl font-semibold">Cardiology follow-up with Dr. Sarah Chen</h2>
            <p className="mt-1 text-sm text-primary-foreground/85">Wednesday, August 14 · 9:00 AM · Room 204</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="bg-white/15 text-primary-foreground hover:bg-white/25">Reschedule</Button>
            <Button className="bg-white text-primary hover:bg-white/90">Check in</Button>
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {vitals.map((v) => (
          <div key={v.label} className="card-elevated p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{v.label}</div>
              <v.icon className={"h-4 w-4 " + v.tone} />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-semibold tracking-tight">{v.value}</span>
              <span className="text-xs text-muted-foreground">{v.unit}</span>
            </div>
            <div className="mt-1 text-xs text-success">Within normal range</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        <PanelCard title="Upcoming appointments" action={<Link to="/patient/appointments" className="text-sm text-primary hover:underline">See all</Link>}>
          <ul className="divide-y">
            {upcoming.map((a) => (
              <li key={a.title} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <CalendarPlus className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium">{a.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{a.doctor} · {a.date} · {a.room}</div>
                </div>
                <Button variant="ghost" size="sm">Details</Button>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Weekly goals">
          <div className="space-y-4">
            {goals.map((g) => {
              const pct = Math.round((g.value / g.target) * 100);
              return (
                <div key={g.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{g.label}</span>
                    <span className="text-muted-foreground">
                      {g.value}{g.unit ?? ""} / {g.target}{g.unit ?? ""}
                    </span>
                  </div>
                  <Progress value={pct} className="mt-2 h-2" />
                </div>
              );
            })}
          </div>
        </PanelCard>
      </div>
    </>
  );
}
