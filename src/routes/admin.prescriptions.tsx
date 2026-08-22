import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Eye, FileDown, Pill, Users, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard, StatCard } from "@/components/dashboard-widgets";
import { PrescriptionPreview } from "@/components/prescription-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { printPrescription, usePrescriptions, type Prescription } from "@/lib/prescriptions";

export const Route = createFileRoute("/admin/prescriptions")({
  component: AdminPrescriptions,
});

const tone: Record<string, string> = {
  Active: "bg-success/15 text-success",
  Completed: "bg-primary-soft text-primary",
  Cancelled: "bg-destructive/15 text-destructive",
};

function AdminPrescriptions() {
  const { items } = usePrescriptions();
  const [q, setQ] = useState("");
  const [doctor, setDoctor] = useState("all");
  const [viewing, setViewing] = useState<Prescription | null>(null);

  const doctors = useMemo(() => Array.from(new Set(items.map((p) => p.doctor))), [items]);
  const filtered = useMemo(
    () =>
      items.filter(
        (p) =>
          (doctor === "all" || p.doctor === doctor) &&
          (p.patient + p.code + p.diagnosis + p.doctor).toLowerCase().includes(q.toLowerCase()),
      ),
    [items, q, doctor],
  );

  return (
    <>
      <PageHeader
        title="Prescriptions"
        subtitle="Read-only oversight of every prescription issued across the hospital."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Prescriptions" value={String(items.length)} icon={Pill} />
        <StatCard label="Active" value={String(items.filter((p) => p.status === "Active").length)} icon={ShieldCheck} tone="success" />
        <StatCard label="Prescribing doctors" value={String(doctors.length)} icon={Users} />
        <StatCard label="Patients covered" value={String(new Set(items.map((p) => p.patient)).size)} icon={Users} tone="warning" />
      </div>

      <PanelCard
        title="All issued prescriptions"
        action={
          <div className="flex gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-9 w-44 pl-9" />
            </div>
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger className="h-9 w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All doctors</SelectItem>
                {doctors.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.code}</TableCell>
                  <TableCell className="font-medium">{p.patient}</TableCell>
                  <TableCell className="text-muted-foreground">{p.doctor}</TableCell>
                  <TableCell className="text-muted-foreground">{p.diagnosis}</TableCell>
                  <TableCell className="text-muted-foreground">{p.issuedAt}</TableCell>
                  <TableCell>
                    <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[p.status]}>{p.status}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="View" onClick={() => setViewing(p)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download PDF" onClick={() => printPrescription(p)}>
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">No records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </PanelCard>

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewing?.code} · view only</DialogTitle>
          </DialogHeader>
          {viewing && (
            <>
              <PrescriptionPreview p={viewing} />
              <Button variant="outline" onClick={() => printPrescription(viewing)}>
                <FileDown className="mr-1.5 h-4 w-4" />Download PDF
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
