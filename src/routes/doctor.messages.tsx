import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export const Route = createFileRoute("/doctor/messages")({
  component: MessagesPage,
});

const threads = [
  { name: "Nurse Alicia", last: "Room 205 vitals updated", unread: 2, active: true },
  { name: "Emma Wilson", last: "Should I take my meds tonight?", unread: 1 },
  { name: "Dr. Ortiz", last: "Cross-consult on Garcia?", unread: 0 },
  { name: "Lab Team", last: "Wilson's troponin ready", unread: 0 },
  { name: "Sofia Rossi", last: "Thanks for the follow-up!", unread: 0 },
];

const messages = [
  { from: "Nurse Alicia", text: "Room 205 vitals: BP 128/82, HR 76", mine: false, time: "9:02" },
  { from: "You", text: "Thanks. Any chest pain reported?", mine: true, time: "9:04" },
  { from: "Nurse Alicia", text: "None currently. Patient is stable.", mine: false, time: "9:05" },
  { from: "You", text: "Great, I'll be by in 10 minutes.", mine: true, time: "9:06" },
];

function MessagesPage() {
  return (
    <>
      <PageHeader title="Messages" subtitle="Coordinate with your care team and patients." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        <PanelCard title="Inbox">
          <ul className="-mx-2 space-y-1">
            {threads.map((t) => (
              <li key={t.name}>
                <button
                  className={
                    "grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg p-2 text-left transition-colors " +
                    (t.active ? "bg-primary-soft" : "hover:bg-secondary")
                  }
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {t.name.split(" ").map((x) => x[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{t.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{t.last}</div>
                  </div>
                  {t.unread > 0 && (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                      {t.unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Nurse Alicia">
          <div className="flex h-[420px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <div key={i} className={"flex " + (m.mine ? "justify-end" : "justify-start")}>
                  <div
                    className={
                      "max-w-[75%] rounded-2xl px-3 py-2 text-sm " +
                      (m.mine ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground")
                    }
                  >
                    {m.text}
                    <div className={"mt-1 text-[10px] " + (m.mine ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Input placeholder="Write a message…" className="h-10" />
              <Button size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </PanelCard>
      </div>
    </>
  );
}
