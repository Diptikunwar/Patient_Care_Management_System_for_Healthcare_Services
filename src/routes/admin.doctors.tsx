import { createFileRoute } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/doctors")({
  component: DoctorsPage,
});

const doctors = [
  { name: "Dr. Sarah Chen", dept: "Cardiology", patients: 128, rating: 4.9, status: "On duty" },
  { name: "Dr. Miguel Ortiz", dept: "Neurology", patients: 96, rating: 4.8, status: "On duty" },
  { name: "Dr. Hana Kim", dept: "Pediatrics", patients: 142, rating: 4.9, status: "In surgery" },
  { name: "Dr. Ben Reeves", dept: "Orthopedics", patients: 74, rating: 4.7, status: "Off" },
  { name: "Dr. Priya Shah", dept: "Oncology", patients: 58, rating: 4.9, status: "On duty" },
  { name: "Dr. Marcus Lee", dept: "ER", patients: 210, rating: 4.6, status: "On call" },
];

const tone: Record<string, string> = {
  "On duty": "bg-success/15 text-success",
  "In surgery": "bg-warning/20 text-warning-foreground",
  "On call": "bg-primary-soft text-primary",
  Off: "bg-muted text-muted-foreground",
};

function DoctorsPage() {
  return (
    <>
      <PageHeader
        title="Doctor management"
        subtitle="Care team roster, availability and specialties."
        actions={<Button><Plus className="mr-1.5 h-4 w-4" />Invite doctor</Button>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {doctors.map((d) => (
          <div key={d.name} className="card-elevated p-5">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary-soft text-primary text-sm font-semibold">
                  {d.name.split(" ").slice(-1)[0][0]}
                  {d.name.split(" ")[1]?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold">{d.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{d.dept}</p>
              </div>
              <Badge className={tone[d.status] + " border-0"}>{d.status}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-secondary p-3">
                <div className="text-xs text-muted-foreground">Patients</div>
                <div className="text-lg font-semibold">{d.patients}</div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="text-xs text-muted-foreground">Rating</div>
                <div className="flex items-center gap-1 text-lg font-semibold">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  {d.rating}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Schedule</Button>
              <Button size="sm" className="flex-1">View profile</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
