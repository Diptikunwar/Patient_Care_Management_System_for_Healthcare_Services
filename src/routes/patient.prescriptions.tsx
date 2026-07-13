import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/patient/prescriptions")({
  component: RxPage,
});

const rx = [
  { drug: "Lisinopril", dose: "10 mg · once daily", refills: 2, doctor: "Dr. Chen" },
  { drug: "Atorvastatin", dose: "20 mg · nightly", refills: 3, doctor: "Dr. Chen" },
  { drug: "Multivitamin", dose: "1 tab · daily", refills: 5, doctor: "Self-care" },
];

function RxPage() {
  return (
    <>
      <PageHeader title="My prescriptions" subtitle="Active medications, refills and instructions." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rx.map((r) => (
          <div key={r.drug} className="card-elevated p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold">{r.drug}</div>
                <div className="text-xs text-muted-foreground">{r.dose}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-secondary p-3">
                <div className="text-xs text-muted-foreground">Refills</div>
                <div className="font-semibold">{r.refills}</div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="text-xs text-muted-foreground">Prescribed by</div>
                <div className="font-semibold">{r.doctor}</div>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full">Request refill</Button>
          </div>
        ))}
      </div>
    </>
  );
}
