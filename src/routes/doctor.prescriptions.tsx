import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/doctor/prescriptions")({
  component: PrescriptionsPage,
});

const rx = [
  { patient: "Emma Wilson", drug: "Lisinopril", dose: "10 mg · once daily", started: "Aug 5", status: "Active" },
  { patient: "Noah Garcia", drug: "Atorvastatin", dose: "40 mg · nightly", started: "Aug 1", status: "Active" },
  { patient: "Sofia Rossi", drug: "Metoprolol", dose: "25 mg · twice daily", started: "Jul 28", status: "Active" },
  { patient: "Marcus Cole", drug: "Aspirin", dose: "81 mg · daily", started: "Jul 20", status: "Renewing" },
];

const tone: Record<string, string> = {
  Active: "bg-success/15 text-success",
  Renewing: "bg-warning/20 text-warning-foreground",
};

function PrescriptionsPage() {
  return (
    <>
      <PageHeader title="Prescriptions" subtitle="Active medications you've prescribed." actions={<Button>New prescription</Button>} />
      <PanelCard title="Active prescriptions">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rx.map((r) => (
                <TableRow key={r.patient + r.drug}>
                  <TableCell className="font-medium">{r.patient}</TableCell>
                  <TableCell>{r.drug}</TableCell>
                  <TableCell className="text-muted-foreground">{r.dose}</TableCell>
                  <TableCell className="text-muted-foreground">{r.started}</TableCell>
                  <TableCell>
                    <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[r.status]}>{r.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PanelCard>
    </>
  );
}
