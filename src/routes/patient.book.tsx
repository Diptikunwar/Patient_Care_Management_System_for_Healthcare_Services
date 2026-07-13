import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/patient/book")({
  component: BookPage,
});

const times = ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

function BookPage() {
  const [slot, setSlot] = useState("9:00 AM");
  return (
    <>
      <PageHeader title="Book an appointment" subtitle="Pick a specialty, provider and time that works for you." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <PanelCard title="Appointment details">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Specialty</Label>
              <Select defaultValue="cardiology">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="ortho">Orthopedics</SelectItem>
                  <SelectItem value="general">General medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Doctor</Label>
              <Select defaultValue="chen">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="chen">Dr. Sarah Chen</SelectItem>
                  <SelectItem value="ortiz">Dr. Miguel Ortiz</SelectItem>
                  <SelectItem value="kim">Dr. Hana Kim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" defaultValue="2026-08-14" />
            </div>
            <div className="space-y-2">
              <Label>Visit type</Label>
              <Select defaultValue="in-person">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-person</SelectItem>
                  <SelectItem value="tele">Telehealth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Reason for visit</Label>
              <Textarea rows={3} placeholder="Briefly describe your symptoms or reason for the visit." />
            </div>
          </div>

          <div className="mt-6">
            <Label>Available times</Label>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {times.map((t) => {
                const active = slot === t;
                return (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm transition-colors " +
                      (active
                        ? "border-primary bg-primary-soft text-primary font-medium"
                        : "border-border hover:border-primary/40")
                    }
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Summary">
          <dl className="space-y-3 text-sm">
            {[
              ["Specialty", "Cardiology"],
              ["Doctor", "Dr. Sarah Chen"],
              ["Date", "Aug 14, 2026"],
              ["Time", slot],
              ["Type", "In-person"],
              ["Est. copay", "$25"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <Button className="mt-4 w-full">Confirm booking</Button>
        </PanelCard>
      </div>
    </>
  );
}
