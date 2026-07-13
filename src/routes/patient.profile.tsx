import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/patient/profile")({
  component: PatientProfile,
});

function PatientProfile() {
  const { user } = useSession();
  const initials = (user?.name ?? "P").split(" ").map((x) => x[0]).slice(0, 2).join("");
  return (
    <>
      <PageHeader title="My profile" subtitle="Personal details, insurance and emergency contact." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
        <PanelCard title="Overview">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary-soft text-primary text-2xl font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <h3 className="mt-3 text-lg font-semibold">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">Patient · MRN P-10245</p>
            <div className="mt-3 flex gap-2 text-xs">
              <span className="rounded-full bg-primary-soft px-3 py-1 font-medium text-primary">Blood type O+</span>
              <span className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground">Non-smoker</span>
            </div>
          </div>
        </PanelCard>
        <div className="space-y-4">
          <PanelCard title="Personal details">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Full name</Label><Input defaultValue={user?.name} /></div>
              <div className="space-y-2"><Label>Date of birth</Label><Input defaultValue="1991-04-22" type="date" /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} /></div>
              <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+1 (555) 402-7789" /></div>
              <div className="space-y-2 md:col-span-2"><Label>Address</Label><Input defaultValue="221B Baker Street, Boston MA" /></div>
            </div>
          </PanelCard>
          <PanelCard title="Insurance & emergency">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Insurance provider</Label><Input defaultValue="BlueCross PPO" /></div>
              <div className="space-y-2"><Label>Member ID</Label><Input defaultValue="BC-8827-4419" /></div>
              <div className="space-y-2"><Label>Emergency contact</Label><Input defaultValue="Alex Rivera" /></div>
              <div className="space-y-2"><Label>Contact phone</Label><Input defaultValue="+1 (555) 883-1201" /></div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </PanelCard>
        </div>
      </div>
    </>
  );
}
