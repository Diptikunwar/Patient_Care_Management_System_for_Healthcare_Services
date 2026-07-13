import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Configure your hospital workspace." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PanelCard title="Organization">
          <div className="space-y-4">
            <div className="space-y-2"><Label>Hospital name</Label><Input defaultValue="MediCore General Hospital" /></div>
            <div className="space-y-2"><Label>Address</Label><Input defaultValue="500 Medical Plaza, Boston MA" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+1 (555) 010-2255" /></div>
              <div className="space-y-2"><Label>Support email</Label><Input defaultValue="ops@medicore.health" /></div>
            </div>
            <Button>Save changes</Button>
          </div>
        </PanelCard>
        <PanelCard title="Preferences">
          <div className="space-y-4">
            {[
              ["Email notifications", "Send digest to department heads"],
              ["SMS alerts", "Notify on-call staff via SMS"],
              ["Two-factor auth", "Require 2FA for admin accounts"],
              ["Audit logs", "Retain audit logs for 24 months"],
            ].map(([t, d]) => (
              <div key={t} className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </>
  );
}
