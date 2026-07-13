import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { FlaskConical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/patient/lab-reports")({
  component: LabsPage,
});

const labs = [
  { test: "Lipid panel", date: "Aug 12, 2026", status: "Normal", note: "Total 182 mg/dL" },
  { test: "HbA1c", date: "Aug 12, 2026", status: "Normal", note: "5.4%" },
  { test: "CBC", date: "Feb 10, 2026", status: "Normal", note: "All values in range" },
  { test: "Thyroid function", date: "Feb 10, 2026", status: "Review", note: "TSH slightly elevated" },
];

const tone: Record<string, string> = {
  Normal: "bg-success/15 text-success",
  Review: "bg-warning/20 text-warning-foreground",
  Abnormal: "bg-destructive/15 text-destructive",
};

function LabsPage() {
  return (
    <>
      <PageHeader title="Lab reports" subtitle="Your test results in one place." />
      <PanelCard title="Results">
        <ul className="divide-y">
          {labs.map((l) => (
            <li key={l.test + l.date} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <FlaskConical className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium">{l.test}</div>
                <div className="truncate text-xs text-muted-foreground">{l.date} · {l.note}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[l.status]}>{l.status}</span>
                <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
              </div>
            </li>
          ))}
        </ul>
      </PanelCard>
    </>
  );
}
