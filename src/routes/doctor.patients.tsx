import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/doctor/patients")({
  component: MyPatients,
});

const patients = [
  { name: "Emma Wilson", age: 34, dx: "Hypertension", next: "Aug 14", tags: ["Follow-up"] },
  { name: "Noah Garcia", age: 63, dx: "Coronary Artery Disease", next: "Aug 14", tags: ["High risk"] },
  { name: "Sofia Rossi", age: 29, dx: "Arrhythmia", next: "Aug 15", tags: ["ECG"] },
  { name: "Marcus Cole", age: 58, dx: "Post CABG", next: "Aug 16", tags: ["Post-op"] },
  { name: "Iris Tanaka", age: 41, dx: "Type 2 Diabetes", next: "Aug 18", tags: ["Chronic"] },
  { name: "James Okafor", age: 47, dx: "Stress test pending", next: "Aug 19", tags: ["Cardio"] },
];

function MyPatients() {
  return (
    <>
      <PageHeader
        title="My patients"
        subtitle="Patients currently under your care."
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search patients" className="h-9 w-56 pl-9" />
          </div>
        }
      />
      <PanelCard title="Panel">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {patients.map((p) => (
            <div key={p.name} className="rounded-xl border p-4 transition-colors hover:border-primary/40">
              <div className="flex items-start gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarFallback className="bg-primary-soft text-primary text-xs">
                    {p.name.split(" ").map((x) => x[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="truncate text-xs text-muted-foreground">Age {p.age} · {p.dx}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="bg-primary-soft text-primary">{t}</Badge>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Next: {p.next}</span>
                <Button variant="ghost" size="sm">Open chart</Button>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </>
  );
}
