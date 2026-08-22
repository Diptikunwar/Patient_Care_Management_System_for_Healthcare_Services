import { useEffect, useState } from "react";
import tabletImg from "@/assets/med-tablet.jpg";
import capsuleImg from "@/assets/med-capsule.jpg";
import syrupImg from "@/assets/med-syrup.jpg";
import inhalerImg from "@/assets/med-inhaler.jpg";
import injectionImg from "@/assets/med-injection.jpg";

export type MedicineForm = "Tablet" | "Capsule" | "Syrup" | "Inhaler" | "Injection";

export type CatalogMedicine = {
  id: string;
  name: string;
  form: MedicineForm;
  category: string;
  strength: string;
  price: number;
  stock: number;
  rxOnly: boolean;
};

export const MEDICINE_IMAGES: Record<MedicineForm, string> = {
  Tablet: tabletImg,
  Capsule: capsuleImg,
  Syrup: syrupImg,
  Inhaler: inhalerImg,
  Injection: injectionImg,
};

export const MEDICINE_CATALOG: CatalogMedicine[] = [
  { id: "m1", name: "Paracetamol", form: "Tablet", category: "Analgesic", strength: "500 mg", price: 2.4, stock: 1240, rxOnly: false },
  { id: "m2", name: "Amoxicillin", form: "Capsule", category: "Antibiotic", strength: "250 mg", price: 6.8, stock: 480, rxOnly: true },
  { id: "m3", name: "Lisinopril", form: "Tablet", category: "Antihypertensive", strength: "10 mg", price: 4.2, stock: 320, rxOnly: true },
  { id: "m4", name: "Atorvastatin", form: "Tablet", category: "Statin", strength: "20 mg", price: 5.5, stock: 260, rxOnly: true },
  { id: "m5", name: "Amlodipine", form: "Tablet", category: "Antihypertensive", strength: "5 mg", price: 3.1, stock: 0, rxOnly: true },
  { id: "m6", name: "Cetirizine", form: "Tablet", category: "Antihistamine", strength: "10 mg", price: 1.9, stock: 890, rxOnly: false },
  { id: "m7", name: "Ambroxol", form: "Syrup", category: "Cough & cold", strength: "100 ml", price: 4.9, stock: 150, rxOnly: false },
  { id: "m8", name: "Salbutamol", form: "Inhaler", category: "Respiratory", strength: "100 mcg", price: 12.5, stock: 74, rxOnly: true },
  { id: "m9", name: "Ceftriaxone", form: "Injection", category: "Antibiotic", strength: "1 g", price: 18.0, stock: 42, rxOnly: true },
  { id: "m10", name: "Amitriptyline", form: "Tablet", category: "Neurology", strength: "25 mg", price: 7.3, stock: 96, rxOnly: true },
  { id: "m11", name: "Metformin", form: "Tablet", category: "Antidiabetic", strength: "500 mg", price: 2.9, stock: 640, rxOnly: true },
  { id: "m12", name: "Omeprazole", form: "Capsule", category: "Gastro", strength: "20 mg", price: 3.6, stock: 410, rxOnly: false },
];

export type Timing = { morning: boolean; afternoon: boolean; night: boolean };

export type PrescribedMedicine = {
  id: string;
  name: string;
  form: MedicineForm;
  dosage: string;
  frequency: string;
  duration: string;
  timing: Timing;
  food: "Before Food" | "After Food";
  notes?: string;
};

export type PrescriptionStatus = "Active" | "Completed" | "Cancelled";

export type Prescription = {
  id: string;
  code: string;
  patient: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  bloodGroup: string;
  doctor: string;
  doctorTitle: string;
  diagnosis: string;
  notes: string;
  issuedAt: string;
  followUp: string;
  status: PrescriptionStatus;
  medicines: PrescribedMedicine[];
};

export type PatientUpload = {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  dataUrl: string;
};

const KEY = "ipcms.prescriptions";
const UPLOAD_KEY = "ipcms.patient-uploads";

export function emptyTiming(): Timing {
  return { morning: false, afternoon: false, night: false };
}

export function newMedicineRow(): PrescribedMedicine {
  return {
    id: crypto.randomUUID(),
    name: "",
    form: "Tablet",
    dosage: "",
    frequency: "",
    duration: "",
    timing: emptyTiming(),
    food: "After Food",
  };
}

export function timingLabel(m: PrescribedMedicine) {
  const parts = [
    m.timing.morning ? "Morning" : null,
    m.timing.afternoon ? "Afternoon" : null,
    m.timing.night ? "Night" : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "As advised";
}

const SEED: Prescription[] = [
  {
    id: "p1",
    code: "RX-2026-0148",
    patient: "Emma Wilson",
    age: "34",
    gender: "Female",
    height: "166 cm",
    weight: "62 kg",
    bloodGroup: "O+",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "MBBS, MD — Cardiology",
    diagnosis: "Stage 1 hypertension",
    notes: "Reduce sodium intake. Home BP log twice daily.",
    issuedAt: "2026-08-05",
    followUp: "2026-09-05",
    status: "Active",
    medicines: [
      { id: "pm1", name: "Lisinopril", form: "Tablet", dosage: "10 mg", frequency: "1 time daily", duration: "1 month", timing: { morning: true, afternoon: false, night: false }, food: "After Food" },
      { id: "pm2", name: "Amlodipine", form: "Tablet", dosage: "5 mg", frequency: "1 time daily", duration: "1 month", timing: { morning: false, afternoon: false, night: true }, food: "After Food" },
    ],
  },
  {
    id: "p2",
    code: "RX-2026-0151",
    patient: "Noah Garcia",
    age: "51",
    gender: "Male",
    height: "178 cm",
    weight: "88 kg",
    bloodGroup: "B+",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "MBBS, MD — Cardiology",
    diagnosis: "Hyperlipidemia",
    notes: "Repeat lipid panel in 8 weeks.",
    issuedAt: "2026-08-01",
    followUp: "2026-09-26",
    status: "Active",
    medicines: [
      { id: "pm3", name: "Atorvastatin", form: "Tablet", dosage: "40 mg", frequency: "1 time daily", duration: "2 months", timing: { morning: false, afternoon: false, night: true }, food: "After Food" },
    ],
  },
  {
    id: "p3",
    code: "RX-2026-0139",
    patient: "Jamie Rivera",
    age: "29",
    gender: "Non-binary",
    height: "172 cm",
    weight: "68 kg",
    bloodGroup: "A+",
    doctor: "Dr. Sarah Chen",
    doctorTitle: "MBBS, MD — Cardiology",
    diagnosis: "Viral fever",
    notes: "Hydration, rest for 3 days. Return if fever persists beyond 72 hours.",
    issuedAt: "2026-07-28",
    followUp: "2026-08-04",
    status: "Completed",
    medicines: [
      { id: "pm4", name: "Paracetamol", form: "Tablet", dosage: "500 mg", frequency: "2 times daily", duration: "1 week", timing: { morning: false, afternoon: true, night: true }, food: "After Food" },
      { id: "pm5", name: "Cetirizine", form: "Tablet", dosage: "10 mg", frequency: "1 time daily", duration: "5 days", timing: { morning: false, afternoon: false, night: true }, food: "After Food" },
      { id: "pm6", name: "Ambroxol", form: "Syrup", dosage: "10 ml", frequency: "3 times daily", duration: "5 days", timing: { morning: true, afternoon: true, night: true }, food: "After Food" },
    ],
  },
  {
    id: "p4",
    code: "RX-2026-0155",
    patient: "Sofia Rossi",
    age: "44",
    gender: "Female",
    height: "160 cm",
    weight: "58 kg",
    bloodGroup: "AB+",
    doctor: "Dr. Miguel Ortiz",
    doctorTitle: "MBBS, DM — Neurology",
    diagnosis: "Chronic migraine",
    notes: "Track triggers in headache diary.",
    issuedAt: "2026-08-09",
    followUp: "2026-10-09",
    status: "Active",
    medicines: [
      { id: "pm7", name: "Amitriptyline", form: "Tablet", dosage: "25 mg", frequency: "1 time daily", duration: "2 months", timing: { morning: false, afternoon: false, night: true }, food: "After Food" },
    ],
  },
];

function read(): Prescription[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw) as Prescription[];
  } catch {
    return SEED;
  }
}

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

function write(items: Prescription[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  emit();
}

export function listPrescriptions(): Prescription[] {
  return read();
}

export function nextCode(): string {
  const n = read().length + 156;
  return `RX-2026-0${n}`;
}

export function savePrescription(p: Prescription) {
  const items = read();
  const idx = items.findIndex((x) => x.id === p.id);
  if (idx >= 0) items[idx] = p;
  else items.unshift(p);
  write(items);
}

export function deletePrescription(id: string) {
  write(read().filter((p) => p.id !== id));
}

export function setPrescriptionStatus(id: string, status: PrescriptionStatus) {
  write(read().map((p) => (p.id === id ? { ...p, status } : p)));
}

export function usePrescriptions() {
  const [items, setItems] = useState<Prescription[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    setReady(true);
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return { items, ready };
}

/* ---------- patient uploaded reports ---------- */

const uploadListeners = new Set<() => void>();

function readUploads(): PatientUpload[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(UPLOAD_KEY) ?? "[]") as PatientUpload[];
  } catch {
    return [];
  }
}

function writeUploads(items: PatientUpload[]) {
  window.localStorage.setItem(UPLOAD_KEY, JSON.stringify(items));
  uploadListeners.forEach((l) => l());
}

export function addUpload(u: PatientUpload) {
  writeUploads([u, ...readUploads()]);
}

export function removeUpload(id: string) {
  writeUploads(readUploads().filter((u) => u.id !== id));
}

export function useUploads() {
  const [items, setItems] = useState<PatientUpload[]>([]);
  useEffect(() => {
    const sync = () => setItems(readUploads());
    sync();
    uploadListeners.add(sync);
    return () => {
      uploadListeners.delete(sync);
    };
  }, []);
  return items;
}

/* ---------- printable document / PDF ---------- */

export function prescriptionHtml(p: Prescription): string {
  const rows = p.medicines
    .map(
      (m, i) => `<tr>
        <td>${i + 1}</td>
        <td><strong>${escapeHtml(m.name)}</strong><div class="sub">${escapeHtml(m.form)}</div></td>
        <td>${escapeHtml(m.dosage)}</td>
        <td>${escapeHtml(m.frequency)}</td>
        <td>${escapeHtml(m.duration)}</td>
        <td>${escapeHtml(timingLabel(m))}<div class="sub">${escapeHtml(m.food)}</div></td>
      </tr>`,
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8" />
  <title>${escapeHtml(p.code)} — MediCore Prescription</title>
  <style>
    *{box-sizing:border-box} body{font-family:Inter,Segoe UI,system-ui,sans-serif;color:#1a2233;margin:0;padding:40px;background:#fff}
    .head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #2f5fe0;padding-bottom:16px}
    .brand{font-size:22px;font-weight:800;color:#2f5fe0;letter-spacing:-.02em}
    .muted{color:#6b7280;font-size:12px}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:24px 0}
    .box{background:#f4f7fd;border-radius:10px;padding:10px 12px}
    .box .l{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#6b7280}
    .box .v{font-size:13px;font-weight:600;margin-top:2px}
    h2{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#2f5fe0;margin:20px 0 8px}
    table{width:100%;border-collapse:collapse;font-size:12px}
    th{background:#eef3fd;text-align:left;padding:8px;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#41506b}
    td{padding:10px 8px;border-bottom:1px solid #e6eaf2;vertical-align:top}
    .sub{color:#6b7280;font-size:10px}
    .note{background:#f9fafb;border-left:3px solid #2f5fe0;padding:10px 12px;font-size:12px;border-radius:0 8px 8px 0}
    .foot{margin-top:48px;display:flex;justify-content:space-between;align-items:flex-end;font-size:11px;color:#6b7280}
    .sign{border-top:1px solid #9aa4b8;padding-top:6px;width:200px;text-align:center}
  </style></head><body>
  <div class="head">
    <div>
      <div class="brand">MediCore IPCMS</div>
      <div class="muted">Integrated Patient Care Management</div>
    </div>
    <div style="text-align:right">
      <div style="font-weight:700">${escapeHtml(p.doctor)}</div>
      <div class="muted">${escapeHtml(p.doctorTitle)}</div>
      <div class="muted">${escapeHtml(p.code)} · ${escapeHtml(p.issuedAt)}</div>
    </div>
  </div>
  <div class="grid">
    <div class="box"><div class="l">Patient</div><div class="v">${escapeHtml(p.patient)}</div></div>
    <div class="box"><div class="l">Age / Gender</div><div class="v">${escapeHtml(p.age)} · ${escapeHtml(p.gender)}</div></div>
    <div class="box"><div class="l">Height / Weight</div><div class="v">${escapeHtml(p.height)} · ${escapeHtml(p.weight)}</div></div>
    <div class="box"><div class="l">Blood group</div><div class="v">${escapeHtml(p.bloodGroup)}</div></div>
  </div>
  <h2>Diagnosis</h2>
  <div style="font-size:13px;font-weight:600">${escapeHtml(p.diagnosis)}</div>
  <h2>Medicines</h2>
  <table><thead><tr><th>#</th><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th><th>Timing</th></tr></thead>
  <tbody>${rows || `<tr><td colspan="6" class="muted">No medicines listed</td></tr>`}</tbody></table>
  <h2>Clinical notes</h2>
  <div class="note">${escapeHtml(p.notes || "—")}</div>
  <div class="foot">
    <div>Follow-up: <strong>${escapeHtml(p.followUp || "—")}</strong><br/>This is a digitally generated prescription.</div>
    <div class="sign">${escapeHtml(p.doctor)}</div>
  </div>
  </body></html>`;
}

function escapeHtml(s: string) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);
}

export function printPrescription(p: Prescription) {
  const w = window.open("", "_blank", "width=880,height=1000");
  if (!w) return;
  w.document.write(prescriptionHtml(p));
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 350);
}
