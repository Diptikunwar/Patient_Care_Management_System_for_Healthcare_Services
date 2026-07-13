import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";

export const Route = createFileRoute("/patient/history")({
  component: HistoryPage,
});

const timeline = [
  { date: "Aug 12, 2026", title: "Cardiology follow-up", body: "BP 118/78. Continue current medications. Follow-up in 4 weeks.", doctor: "Dr. Sarah Chen" },
  { date: "Jul 22, 2026", title: "Lipid panel", body: "Total cholesterol 182 mg/dL — within target range.", doctor: "MediCore Lab" },
  { date: "Feb 10, 2026", title: "Annual physical", body: "Overall health good. Discussed diet and exercise plan.", doctor: "Dr. Marcus Lee" },
  { date: "Nov 04, 2025", title: "Flu vaccination", body: "Seasonal influenza vaccine administered.", doctor: "Nurse Alicia" },
  { date: "Jul 22, 2025", title: "Cardiology consult", body: "Started on lisinopril 10 mg for stage 1 hypertension.", doctor: "Dr. Sarah Chen" },
];

function HistoryPage() {
  return (
    <>
      <PageHeader title="Medical history" subtitle="A chronological view of your visits, tests and treatments." />
      <PanelCard title="Timeline">
        <ol className="relative ml-3 border-l">
          {timeline.map((t) => (
            <li key={t.date + t.title} className="mb-6 ml-6 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-background bg-primary" />
              <div className="text-xs text-muted-foreground">{t.date} · {t.doctor}</div>
              <div className="mt-0.5 font-medium">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ol>
      </PanelCard>
    </>
  );
}
