import { createFileRoute } from "@tanstack/react-router";
import { Clock, CheckCircle2, Users, HeartPulse } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { StatCard, PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/doctor/")({
  component: DoctorHome,
});

const schedule = [
  { t: "08:30", patient: "Emma Wilson", reason: "Follow-up · Hypertension", room: "204", status: "Checked-in" },
  { t: "09:15", patient: "Noah Garcia", reason: "New consult · Chest pain", room: "205", status: "Waiting" },
  { t: "10:00", patient: "Sofia Rossi", reason: "ECG review", room: "Lab 1", status: "Confirmed" },
  { t: "11:00", patient: "Marcus Cole", reason: "Post-op check", room: "310", status: "Confirmed" },
  { t: "13:30", patient: "Iris Tanaka", reason: "Medication review", room: "204", status: "Confirmed" },
  { t: "15:00", patient: "James Okafor", reason: "Stress test debrief", room: "Lab 2", status: "Confirmed" },
];

const patients = [
  { name: "Emma Wilson", age: 34, dx: "Hypertension", risk: "Moderate" },
  { name: "Noah Garcia", age: 63, dx: "Coronary Artery Disease", risk: "High" },
  { name: "Sofia Rossi", age: 29, dx: "Arrhythmia", risk: "Low" },
  { name: "Marcus Cole", age: 58, dx: "Post CABG", risk: "Moderate" },
];

const riskTone: Record<string, string> = {
  Low: "bg-success/15 text-success",
  Moderate: "bg-warning/20 text-warning-foreground",
  High: "bg-destructive/15 text-destructive",
};

const statusTone: Record<string, string> = {
  "Checked-in": "bg-success/15 text-success",
  Waiting: "bg-warning/20 text-warning-foreground",
  Confirmed: "bg-primary-soft text-primary",
};

function DoctorHome() {
  const { user } = useSession();
  return (
    <>
      <PageHeader
        title={`Good morning, ${user?.name?.split(" ").slice(-1)[0] ?? "Doctor"}`}
        subtitle="Here's how your day looks so far."
        actions={<Button>Start rounds</Button>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's appointments" value="12" icon={Clock} tone="primary" />
        <StatCard label="Completed" value="4" icon={CheckCircle2} tone="success" />
        <StatCard label="Assigned patients" value="128" icon={Users} tone="primary" />
        <StatCard label="Critical alerts" value="2" icon={HeartPulse} tone="destructive" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        <PanelCard title="Today's schedule" action={<Button variant="ghost" size="sm">Open calendar</Button>}>
          <ul className="divide-y">
            {schedule.map((s) => (
              <li key={s.t + s.patient} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 py-3">
                <div className="text-sm font-semibold text-primary">{s.t}</div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{s.patient}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.reason} · Room {s.room}</div>
                </div>
                <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + statusTone[s.status]}>
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>

        <div className="space-y-4">
          <PanelCard title="Assigned patients">
            <ul className="space-y-3">
              {patients.map((p) => (
                <li key={p.name} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary-soft text-primary text-xs">
                      {p.name.split(" ").map((x) => x[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.name} · {p.age}</div>
                    <div className="truncate text-xs text-muted-foreground">{p.dx}</div>
                  </div>
                  <span className={"inline-flex rounded-full px-2 py-0.5 text-xs font-medium " + riskTone[p.risk]}>
                    {p.risk}
                  </span>
                </li>
              ))}
            </ul>
          </PanelCard>
          <PanelCard title="Recent messages">
            <ul className="space-y-3 text-sm">
              <li><span className="font-medium">Nurse Alicia:</span> <span className="text-muted-foreground">Room 205 vitals updated</span></li>
              <li><span className="font-medium">Lab:</span> <span className="text-muted-foreground">Wilson's troponin panel is ready</span></li>
              <li><span className="font-medium">Dr. Ortiz:</span> <span className="text-muted-foreground">Cross-consult on Garcia?</span></li>
            </ul>
          </PanelCard>
        </div>
      </div>
    </>
  );
}
