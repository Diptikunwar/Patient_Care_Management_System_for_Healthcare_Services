import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/doctor/profile")({
  component: DoctorProfile,
});

function DoctorProfile() {
  const { user } = useSession();
  const initials = (user?.name ?? "D").split(" ").map((x) => x[0]).slice(0, 2).join("");
  return (
    <>
      <PageHeader title="Physician profile" subtitle="Your professional information visible to patients and staff." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
        <PanelCard title="Public profile">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary-soft text-primary text-2xl font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <h3 className="mt-3 text-lg font-semibold">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">Cardiology · MediCore General</p>
            <div className="mt-3 flex gap-2 text-xs">
              <span className="rounded-full bg-primary-soft px-3 py-1 font-medium text-primary">12 yrs exp</span>
              <span className="rounded-full bg-success/15 px-3 py-1 font-medium text-success">Accepting patients</span>
            </div>
          </div>
        </PanelCard>
        <PanelCard title="Professional details">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Full name</Label><Input defaultValue={user?.name} /></div>
            <div className="space-y-2"><Label>Specialty</Label><Input defaultValue="Cardiology" /></div>
            <div className="space-y-2"><Label>License #</Label><Input defaultValue="MD-4472-9821" /></div>
            <div className="space-y-2"><Label>NPI</Label><Input defaultValue="1093847521" /></div>
            <div className="space-y-2 md:col-span-2"><Label>Bio</Label><Input defaultValue="Interventional cardiologist focused on preventive care." /></div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </PanelCard>
      </div>
    </>
  );
}
