import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";

export const Route = createFileRoute("/doctor/schedule")({
  component: SchedulePage,
});

const days = ["Mon 11", "Tue 12", "Wed 13", "Thu 14", "Fri 15", "Sat 16", "Sun 17"];
const hours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];

// Sparse events map: `${day}-${hour}` → label
const events: Record<string, { label: string; tone: string }> = {
  "Mon 11-9 AM": { label: "Rounds", tone: "bg-primary-soft text-primary" },
  "Mon 11-11 AM": { label: "Consult · Cole", tone: "bg-accent text-accent-foreground" },
  "Tue 12-10 AM": { label: "Surgery", tone: "bg-warning/25 text-warning-foreground" },
  "Wed 13-9 AM": { label: "Clinic", tone: "bg-primary-soft text-primary" },
  "Wed 13-2 PM": { label: "Teaching", tone: "bg-accent text-accent-foreground" },
  "Thu 14-8 AM": { label: "Rounds", tone: "bg-primary-soft text-primary" },
  "Thu 14-1 PM": { label: "ECG lab", tone: "bg-success/15 text-success" },
  "Fri 15-11 AM": { label: "Clinic", tone: "bg-primary-soft text-primary" },
  "Sat 16-9 AM": { label: "On call", tone: "bg-destructive/15 text-destructive" },
};

function SchedulePage() {
  return (
    <>
      <PageHeader title="Weekly schedule" subtitle="Your clinic, surgery and on-call blocks for the week." />
      <PanelCard title="This week">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] text-xs font-medium text-muted-foreground">
              <div />
              {days.map((d) => <div key={d} className="p-2 text-center">{d}</div>)}
            </div>
            {hours.map((h) => (
              <div key={h} className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] border-t">
                <div className="p-2 text-xs text-muted-foreground">{h}</div>
                {days.map((d) => {
                  const ev = events[`${d}-${h}`];
                  return (
                    <div key={d + h} className="min-h-[52px] border-l p-1.5">
                      {ev && (
                        <div className={"h-full rounded-md px-2 py-1 text-xs font-medium " + ev.tone}>
                          {ev.label}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </PanelCard>
    </>
  );
}
