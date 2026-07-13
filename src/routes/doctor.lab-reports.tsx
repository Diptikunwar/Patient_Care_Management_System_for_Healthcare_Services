import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { FlaskConical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/doctor/lab-reports")({
  component: LabsPage,
});

const labs = [
  { patient: "Emma Wilson", test: "Lipid panel", date: "Aug 12", status: "Normal" },
  { patient: "Noah Garcia", test: "Troponin I", date: "Aug 12", status: "Abnormal" },
  { patient: "Sofia Rossi", test: "Thyroid function", date: "Aug 11", status: "Normal" },
  { patient: "Marcus Cole", test: "CBC", date: "Aug 10", status: "Review" },
];

const tone: Record<string, string> = {
  Normal: "bg-success/15 text-success",
  Abnormal: "bg-destructive/15 text-destructive",
  Review: "bg-warning/20 text-warning-foreground",
};

function LabsPage() {
  return (
    <>
      <PageHeader title="Lab reports" subtitle="Latest lab results awaiting your review." />
      <PanelCard title="Recent labs">
        <ul className="divide-y">
          {labs.map((l) => (
            <li key={l.patient + l.test} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <FlaskConical className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium">{l.test} · <span className="text-muted-foreground">{l.patient}</span></div>
                <div className="text-xs text-muted-foreground">{l.date}</div>
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
