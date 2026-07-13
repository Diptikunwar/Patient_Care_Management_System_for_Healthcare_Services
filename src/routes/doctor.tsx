import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Pill,
  FlaskConical,
  CalendarClock,
  MessageSquare,
  UserCircle,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/doctor")({
  component: DoctorLayout,
});

const NAV: NavItem[] = [
  { label: "Today", to: "/doctor", icon: LayoutDashboard },
  { label: "My patients", to: "/doctor/patients", icon: Users },
  { label: "Medical records", to: "/doctor/records", icon: ClipboardList },
  { label: "Prescriptions", to: "/doctor/prescriptions", icon: Pill },
  { label: "Lab reports", to: "/doctor/lab-reports", icon: FlaskConical },
  { label: "Schedule", to: "/doctor/schedule", icon: CalendarClock },
  { label: "Messages", to: "/doctor/messages", icon: MessageSquare },
  { label: "Profile", to: "/doctor/profile", icon: UserCircle },
];

function DoctorLayout() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && (!user || user.role !== "doctor")) navigate({ to: "/login" });
  }, [ready, user, navigate]);
  if (!ready || !user) return null;
  return (
    <DashboardShell role="doctor" nav={NAV}>
      <Outlet />
    </DashboardShell>
  );
}
