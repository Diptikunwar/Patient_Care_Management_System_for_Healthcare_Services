import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/admin/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useSession();
  const initials = (user?.name ?? "A").split(" ").map((x) => x[0]).slice(0, 2).join("");
  return (
    <>
      <PageHeader title="My profile" subtitle="Personal information and account security." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
        <PanelCard title="Overview">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary-soft text-primary text-2xl font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <h3 className="mt-3 text-lg font-semibold">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <span className="mt-3 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              Hospital administrator
            </span>
          </div>
        </PanelCard>
        <PanelCard title="Account details">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Full name</Label><Input defaultValue={user?.name} /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} /></div>
            <div className="space-y-2"><Label>Role</Label><Input defaultValue="Administrator" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+1 (555) 233-9910" /></div>
            <div className="space-y-2 md:col-span-2"><Label>Bio</Label><Input defaultValue="Leading operations at MediCore General." /></div>
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
