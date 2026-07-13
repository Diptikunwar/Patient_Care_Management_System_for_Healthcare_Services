import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  Receipt,
  FileBarChart,
  Settings,
  UserCircle,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Patients", to: "/admin/patients", icon: Users },
  { label: "Doctors", to: "/admin/doctors", icon: Stethoscope },
  { label: "Appointments", to: "/admin/appointments", icon: CalendarDays },
  { label: "Billing", to: "/admin/billing", icon: Receipt },
  { label: "Reports", to: "/admin/reports", icon: FileBarChart },
  { label: "Settings", to: "/admin/settings", icon: Settings },
  { label: "Profile", to: "/admin/profile", icon: UserCircle },
];

function AdminLayout() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && (!user || user.role !== "admin")) navigate({ to: "/login" });
  }, [ready, user, navigate]);
  if (!ready || !user) return null;
  return (
    <DashboardShell role="admin" nav={NAV}>
      <Outlet />
    </DashboardShell>
  );
}
