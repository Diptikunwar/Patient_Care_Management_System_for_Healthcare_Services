import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/doctor/records")({
  component: RecordsPage,
});

const records = [
  { patient: "Emma Wilson", note: "Adjusted lisinopril dosage, follow-up in 2 weeks", date: "Aug 12" },
  { patient: "Noah Garcia", note: "Ordered coronary CT angiography, scheduled Aug 20", date: "Aug 12" },
  { patient: "Sofia Rossi", note: "Holter monitor placed, review in 48 hours", date: "Aug 11" },
  { patient: "Marcus Cole", note: "Wound healing well, sutures removed", date: "Aug 10" },
];

function RecordsPage() {
  return (
    <>
      <PageHeader title="Medical records" subtitle="Recent chart entries for patients under your care." />
      <PanelCard title="Chart notes">
        <ul className="divide-y">
          {records.map((r) => (
            <li key={r.patient + r.date} className="flex items-start gap-3 py-4">
              <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate font-medium">{r.patient}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <p className="text-sm text-muted-foreground">{r.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </PanelCard>
    </>
  );
}
