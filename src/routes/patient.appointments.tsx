import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, Video } from "lucide-react";

export const Route = createFileRoute("/patient/appointments")({
  component: AppointmentsPage,
});

const upcoming = [
  { title: "Cardiology follow-up", doctor: "Dr. Sarah Chen", date: "Wed, Aug 14 · 9:00 AM", type: "In-person" },
  { title: "Blood work", doctor: "MediCore Lab", date: "Fri, Aug 16 · 8:30 AM", type: "In-person" },
  { title: "Nutrition consult", doctor: "Dr. Priya Shah", date: "Tue, Aug 20 · 2:00 PM", type: "Telehealth" },
];

const past = [
  { title: "Annual physical", doctor: "Dr. Marcus Lee", date: "Feb 10, 2026", type: "In-person" },
  { title: "Cardiology consult", doctor: "Dr. Sarah Chen", date: "Jul 22, 2025", type: "In-person" },
];

function AppointmentsPage() {
  return (
    <>
      <PageHeader title="My appointments" subtitle="Manage upcoming and past visits." />
      <Tabs defaultValue="upcoming" className="mb-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PanelCard title="Upcoming">
          <ul className="divide-y">
            {upcoming.map((a) => (
              <li key={a.title} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  {a.type === "Telehealth" ? <Video className="h-4 w-4" /> : <CalendarDays className="h-4 w-4" />}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium">{a.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{a.doctor} · {a.date}</div>
                </div>
                <Button variant="ghost" size="sm">Manage</Button>
              </li>
            ))}
          </ul>
        </PanelCard>
        <PanelCard title="Past">
          <ul className="divide-y">
            {past.map((a) => (
              <li key={a.title} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium">{a.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{a.doctor} · {a.date}</div>
                </div>
                <Button variant="ghost" size="sm">Summary</Button>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </>
  );
}
