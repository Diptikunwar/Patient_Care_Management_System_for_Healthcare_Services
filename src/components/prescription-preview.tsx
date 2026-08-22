import { Activity } from "lucide-react";
import { MEDICINE_IMAGES, timingLabel, type Prescription } from "@/lib/prescriptions";

export function PrescriptionPreview({ p, compact = false }: { p: Prescription; compact?: boolean }) {
  return (
    <div className="rounded-xl border bg-card p-5 text-sm">
      <div className="flex items-start justify-between gap-4 border-b-2 border-primary pb-3">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display text-base font-bold text-primary">MediCore IPCMS</div>
            <div className="text-[11px] text-muted-foreground">Integrated Patient Care Management</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold">{p.doctor || "—"}</div>
          <div className="text-[11px] text-muted-foreground">{p.doctorTitle}</div>
          <div className="text-[11px] text-muted-foreground">
            {p.code} · {p.issuedAt}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Patient", p.patient || "—"],
          ["Age / Gender", `${p.age || "—"} · ${p.gender || "—"}`],
          ["Height / Weight", `${p.height || "—"} · ${p.weight || "—"}`],
          ["Blood group", p.bloodGroup || "—"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg bg-secondary px-3 py-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</div>
            <div className="truncate text-xs font-semibold">{v}</div>
          </div>
        ))}
      </div>

      <SectionTitle>Diagnosis</SectionTitle>
      <div className="font-medium">{p.diagnosis || "—"}</div>

      <SectionTitle>Medicines</SectionTitle>
      <ul className="divide-y rounded-lg border">
        {p.medicines.length === 0 && (
          <li className="p-3 text-xs text-muted-foreground">No medicines added yet.</li>
        )}
        {p.medicines.map((m) => (
          <li key={m.id} className="flex items-center gap-3 p-3">
            <img
              src={MEDICINE_IMAGES[m.form]}
              alt={`${m.form} medicine`}
              loading="lazy"
              width={512}
              height={512}
              className="h-10 w-10 shrink-0 rounded-lg border object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">
                {m.name || "Unnamed medicine"} {m.dosage && <span className="text-muted-foreground">· {m.dosage}</span>}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {[m.frequency, m.duration, timingLabel(m), m.food].filter(Boolean).join(" · ")}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {!compact && (
        <>
          <SectionTitle>Clinical notes</SectionTitle>
          <div className="rounded-r-lg border-l-2 border-primary bg-secondary/60 px-3 py-2 text-xs">
            {p.notes || "—"}
          </div>
          <div className="mt-6 flex items-end justify-between text-[11px] text-muted-foreground">
            <div>
              Follow-up: <span className="font-semibold text-foreground">{p.followUp || "—"}</span>
              <br />
              Digitally generated prescription.
            </div>
            <div className="w-40 border-t pt-1 text-center text-foreground">{p.doctor || "Physician"}</div>
          </div>
        </>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-widest text-primary">{children}</h4>
  );
}
