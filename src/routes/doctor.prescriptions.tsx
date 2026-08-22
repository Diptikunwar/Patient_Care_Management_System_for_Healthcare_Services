import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, FileDown, Pill, CheckCircle2, XCircle, Copy } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard, StatCard } from "@/components/dashboard-widgets";
import { PrescriptionEditor } from "@/components/prescription-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  deletePrescription,
  nextCode,
  newMedicineRow,
  printPrescription,
  savePrescription,
  setPrescriptionStatus,
  usePrescriptions,
  type Prescription,
} from "@/lib/prescriptions";
import { toast } from "sonner";

export const Route = createFileRoute("/doctor/prescriptions")({
  component: PrescriptionsPage,
});

const tone: Record<string, string> = {
  Active: "bg-success/15 text-success",
  Completed: "bg-primary-soft text-primary",
  Cancelled: "bg-destructive/15 text-destructive",
};

function blank(): Prescription {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: crypto.randomUUID(),
    code: nextCode(),
    patient: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "MBBS, MD — Cardiology",
    diagnosis: "",
    notes: "",
    issuedAt: today,
    followUp: "",
    status: "Active",
    medicines: [newMedicineRow()],
  };
}

function PrescriptionsPage() {
  const { items } = usePrescriptions();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<Prescription | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Prescription | null>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (p) =>
          (status === "all" || p.status === status) &&
          (p.patient + p.code + p.diagnosis).toLowerCase().includes(q.toLowerCase()),
      ),
    [items, q, status],
  );

  const active = items.filter((p) => p.status === "Active").length;
  const meds = items.reduce((n, p) => n + p.medicines.length, 0);

  return (
    <>
      <PageHeader
        title="Prescriptions"
        subtitle="Create, edit and manage prescriptions for your patients."
        actions={
          <Button onClick={() => setEditing(blank())}>
            <Plus className="mr-1.5 h-4 w-4" />New prescription
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total issued" value={String(items.length)} icon={Pill} />
        <StatCard label="Active" value={String(active)} icon={CheckCircle2} tone="success" />
        <StatCard label="Completed" value={String(items.filter((p) => p.status === "Completed").length)} icon={CheckCircle2} />
        <StatCard label="Medicines prescribed" value={String(meds)} icon={Pill} tone="warning" />
      </div>

      <PanelCard
        title="All prescriptions"
        action={
          <div className="flex gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-9 w-44 pl-9" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-9 w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                <TableHead>Diagnosis</TableHead>
                <TableHead>Medicines</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                    No prescriptions match your filters.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.code}</TableCell>
                  <TableCell className="font-medium">{p.patient}</TableCell>
                  <TableCell className="text-muted-foreground">{p.diagnosis}</TableCell>
                  <TableCell className="text-muted-foreground">{p.medicines.length}</TableCell>
                  <TableCell className="text-muted-foreground">{p.issuedAt}</TableCell>
                  <TableCell>
                    <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[p.status]}>{p.status}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => setEditing(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Duplicate" onClick={() => {
                        savePrescription({ ...p, id: crypto.randomUUID(), code: nextCode(), status: "Active" });
                        toast.success("Prescription duplicated");
                      }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download PDF" onClick={() => printPrescription(p)}>
                        <FileDown className="h-4 w-4" />
                      </Button>
                      {p.status === "Active" && (
                        <Button variant="ghost" size="icon" title="Mark completed" onClick={() => {
                          setPrescriptionStatus(p.id, "Completed");
                          toast.success(`${p.code} marked completed`);
                        }}>
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </Button>
                      )}
                      {p.status !== "Cancelled" && (
                        <Button variant="ghost" size="icon" title="Cancel" onClick={() => {
                          setPrescriptionStatus(p.id, "Cancelled");
                          toast("Prescription cancelled");
                        }}>
                          <XCircle className="h-4 w-4 text-warning" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => setPendingDelete(p)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PanelCard>

      {editing && (
        <PrescriptionEditor
          key={editing.id}
          open
          onOpenChange={(v) => !v && setEditing(null)}
          initial={editing}
        />
      )}

      <AlertDialog open={!!pendingDelete} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.code}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the prescription for {pendingDelete?.patient}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDelete) deletePrescription(pendingDelete.id);
                toast.success("Prescription deleted");
                setPendingDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
