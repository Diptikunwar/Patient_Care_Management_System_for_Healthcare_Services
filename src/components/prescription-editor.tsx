import { useState } from "react";
import { Plus, Trash2, FileDown, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PrescriptionPreview } from "@/components/prescription-preview";
import {
  MEDICINE_CATALOG,
  MEDICINE_IMAGES,
  newMedicineRow,
  printPrescription,
  savePrescription,
  type MedicineForm,
  type Prescription,
} from "@/lib/prescriptions";
import { toast } from "sonner";

export function PrescriptionEditor({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: Prescription;
}) {
  const [draft, setDraft] = useState<Prescription>(initial);
  const set = <K extends keyof Prescription>(k: K, v: Prescription[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const updateMed = (id: string, patch: Partial<Prescription["medicines"][number]>) =>
    setDraft((d) => ({
      ...d,
      medicines: d.medicines.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));

  const save = () => {
    if (!draft.patient.trim()) return toast.error("Patient name is required");
    if (draft.medicines.length === 0) return toast.error("Add at least one medicine");
    savePrescription(draft);
    toast.success(`Prescription ${draft.code} saved`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Prescription · {draft.code}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* editor */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Field label="Patient name"><Input value={draft.patient} onChange={(e) => set("patient", e.target.value)} placeholder="Full name" /></Field>
              <Field label="Age"><Input value={draft.age} onChange={(e) => set("age", e.target.value)} placeholder="34" /></Field>
              <Field label="Gender">
                <Select value={draft.gender} onValueChange={(v) => set("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["Female", "Male", "Non-binary", "Other"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Height"><Input value={draft.height} onChange={(e) => set("height", e.target.value)} placeholder="170 cm" /></Field>
              <Field label="Weight"><Input value={draft.weight} onChange={(e) => set("weight", e.target.value)} placeholder="68 kg" /></Field>
              <Field label="Blood group">
                <Select value={draft.bloodGroup} onValueChange={(v) => set("bloodGroup", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Issue date"><Input type="date" value={draft.issuedAt} onChange={(e) => set("issuedAt", e.target.value)} /></Field>
              <Field label="Follow-up date"><Input type="date" value={draft.followUp} onChange={(e) => set("followUp", e.target.value)} /></Field>
              <Field label="Status">
                <Select value={draft.status} onValueChange={(v) => set("status", v as Prescription["status"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Active", "Completed", "Cancelled"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="Diagnosis">
              <Input value={draft.diagnosis} onChange={(e) => set("diagnosis", e.target.value)} placeholder="e.g. Viral fever" />
            </Field>
            <Field label="Clinical notes">
              <Textarea rows={3} value={draft.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Advice, precautions, lifestyle guidance…" />
            </Field>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Medicines</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDraft((d) => ({ ...d, medicines: [...d.medicines, newMedicineRow()] }))}
                >
                  <Plus className="mr-1.5 h-4 w-4" />Add medicine
                </Button>
              </div>

              <div className="space-y-3">
                {draft.medicines.map((m) => (
                  <div key={m.id} className="rounded-xl border p-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={MEDICINE_IMAGES[m.form]}
                        alt={`${m.form} medicine`}
                        loading="lazy"
                        width={512}
                        height={512}
                        className="h-12 w-12 shrink-0 rounded-lg border object-cover"
                      />
                      <div className="grid flex-1 gap-2 sm:grid-cols-2">
                        <Select
                          value={m.name || undefined}
                          onValueChange={(v) => {
                            const cat = MEDICINE_CATALOG.find((c) => c.name === v);
                            updateMed(m.id, { name: v, form: (cat?.form ?? m.form) as MedicineForm, dosage: cat?.strength ?? m.dosage });
                          }}
                        >
                          <SelectTrigger><SelectValue placeholder="Medicine name" /></SelectTrigger>
                          <SelectContent>
                            {MEDICINE_CATALOG.map((c) => (
                              <SelectItem key={c.id} value={c.name}>{c.name} · {c.strength}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input placeholder="Dosage (500 mg)" value={m.dosage} onChange={(e) => updateMed(m.id, { dosage: e.target.value })} />
                        <Input placeholder="Frequency (2 times daily)" value={m.frequency} onChange={(e) => updateMed(m.id, { frequency: e.target.value })} />
                        <Input placeholder="Duration (1 week)" value={m.duration} onChange={(e) => updateMed(m.id, { duration: e.target.value })} />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setDraft((d) => ({ ...d, medicines: d.medicines.filter((x) => x.id !== m.id) }))}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4 pl-0 sm:pl-15">
                      {(["morning", "afternoon", "night"] as const).map((slot) => (
                        <label key={slot} className="flex items-center gap-2 text-sm capitalize">
                          <Checkbox
                            checked={m.timing[slot]}
                            onCheckedChange={(c) => updateMed(m.id, { timing: { ...m.timing, [slot]: Boolean(c) } })}
                          />
                          {slot}
                        </label>
                      ))}
                      <Select value={m.food} onValueChange={(v) => updateMed(m.id, { food: v as "Before Food" | "After Food" })}>
                        <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Before Food">Before Food</SelectItem>
                          <SelectItem value="After Food">After Food</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={save}><Save className="mr-1.5 h-4 w-4" />Save prescription</Button>
              <Button variant="outline" onClick={() => printPrescription(draft)}>
                <FileDown className="mr-1.5 h-4 w-4" />Download PDF
              </Button>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            </div>
          </div>

          {/* preview */}
          <div className="lg:sticky lg:top-0 lg:self-start">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">PDF preview</div>
            <PrescriptionPreview p={draft} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
