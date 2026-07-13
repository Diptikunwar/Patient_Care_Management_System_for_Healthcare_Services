import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/admin/appointments")({
  component: AppointmentsPage,
});

const items = [
  { patient: "Emma Wilson", doctor: "Dr. Chen", type: "Consultation", date: "Aug 14, 9:00 AM", status: "Confirmed" },
  { patient: "Liam Patel", doctor: "Dr. Ortiz", type: "Follow-up", date: "Aug 14, 9:30 AM", status: "Waiting" },
  { patient: "Olivia Brown", doctor: "Dr. Kim", type: "Vaccination", date: "Aug 14, 10:00 AM", status: "In room" },
  { patient: "Noah Garcia", doctor: "Dr. Chen", type: "Consultation", date: "Aug 14, 10:30 AM", status: "Confirmed" },
  { patient: "Ava Nguyen", doctor: "Dr. Reeves", type: "Physio", date: "Aug 14, 11:00 AM", status: "Cancelled" },
  { patient: "Ethan Wright", doctor: "Dr. Ortiz", type: "MRI review", date: "Aug 14, 11:30 AM", status: "Confirmed" },
];

const tone: Record<string, string> = {
  Confirmed: "bg-primary-soft text-primary",
  Waiting: "bg-warning/20 text-warning-foreground",
  "In room": "bg-success/15 text-success",
  Cancelled: "bg-destructive/15 text-destructive",
};

function AppointmentsPage() {
  return (
    <>
      <PageHeader
        title="Appointments"
        subtitle="Schedule, monitor and reassign hospital-wide appointments."
        actions={<Button>New appointment</Button>}
      />
      <div className="mb-4">
        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This week</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <PanelCard title="Schedule">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((r) => (
                <TableRow key={r.patient + r.date}>
                  <TableCell className="font-medium">{r.patient}</TableCell>
                  <TableCell className="text-muted-foreground">{r.doctor}</TableCell>
                  <TableCell className="text-muted-foreground">{r.type}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell>
                    <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[r.status]}>
                      {r.status}
                    </span>
                  </TableCell>
                  <TableCell><Button variant="ghost" size="sm">Manage</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PanelCard>
    </>
  );
}
