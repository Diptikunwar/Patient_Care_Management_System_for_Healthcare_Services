import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Home,
  CalendarPlus,
  CalendarDays,
  FileHeart,
  Pill,
  FlaskConical,
  Receipt,
  UserCircle,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/patient")({
  component: PatientLayout,
});

const NAV: NavItem[] = [
  { label: "My health", to: "/patient", icon: Home },
  { label: "Book appointment", to: "/patient/book", icon: CalendarPlus },
  { label: "Appointments", to: "/patient/appointments", icon: CalendarDays },
  { label: "Medical history", to: "/patient/history", icon: FileHeart },
  { label: "Prescriptions", to: "/patient/prescriptions", icon: Pill },
  { label: "Lab reports", to: "/patient/lab-reports", icon: FlaskConical },
  { label: "Billing", to: "/patient/billing", icon: Receipt },
  { label: "Profile", to: "/patient/profile", icon: UserCircle },
];

function PatientLayout() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && (!user || user.role !== "patient")) navigate({ to: "/login" });
  }, [ready, user, navigate]);
  if (!ready || !user) return null;
  return (
    <DashboardShell role="patient" nav={NAV}>
      <Outlet />
    </DashboardShell>
  );
}
