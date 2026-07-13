import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  CalendarCheck,
  DollarSign,
  BedDouble,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { PageHeader } from "@/components/dashboard-shell";
import { StatCard, PanelCard } from "@/components/dashboard-widgets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

const visits = [
  { m: "Jan", visits: 1240, admissions: 220 },
  { m: "Feb", visits: 1380, admissions: 240 },
  { m: "Mar", visits: 1520, admissions: 260 },
  { m: "Apr", visits: 1610, admissions: 290 },
  { m: "May", visits: 1780, admissions: 310 },
  { m: "Jun", visits: 1920, admissions: 340 },
  { m: "Jul", visits: 2050, admissions: 360 },
];

const departments = [
  { d: "Cardiology", v: 320 },
  { d: "Pediatrics", v: 260 },
  { d: "Neurology", v: 210 },
  { d: "Ortho", v: 180 },
  { d: "Oncology", v: 140 },
];

const appts = [
  { patient: "Emma Wilson", doctor: "Dr. Chen", dept: "Cardiology", time: "09:00", status: "Confirmed" },
  { patient: "Liam Patel", doctor: "Dr. Ortiz", dept: "Neurology", time: "09:30", status: "Waiting" },
  { patient: "Olivia Brown", doctor: "Dr. Kim", dept: "Pediatrics", time: "10:00", status: "In room" },
  { patient: "Noah Garcia", doctor: "Dr. Chen", dept: "Cardiology", time: "10:30", status: "Confirmed" },
  { patient: "Ava Nguyen", doctor: "Dr. Reeves", dept: "Ortho", time: "11:00", status: "Cancelled" },
];

const statusTone: Record<string, string> = {
  Confirmed: "bg-primary-soft text-primary",
  Waiting: "bg-warning/20 text-warning-foreground",
  "In room": "bg-success/15 text-success",
  Cancelled: "bg-destructive/15 text-destructive",
};

function AdminHome() {
  return (
    <>
      <PageHeader
        title="Operations overview"
        subtitle="Real-time snapshot across departments, staff and patient flow."
        actions={<Button>New report</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active patients" value="2,847" delta="+4.2% vs last week" icon={Users} tone="primary" />
        <StatCard label="Appointments today" value="184" delta="+12 today" icon={CalendarCheck} tone="success" />
        <StatCard label="Revenue (MTD)" value="$482.6K" delta="+8.9% vs plan" icon={DollarSign} tone="warning" />
        <StatCard label="Bed occupancy" value="78%" delta="220 / 282 beds" icon={BedDouble} tone="destructive" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PanelCard
            title="Patient visits"
            action={
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-primary-soft text-primary">Visits</Badge>
                <Badge variant="secondary">Admissions</Badge>
              </div>
            }
          >
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <AreaChart data={visits} margin={{ left: -10, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="v1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="v2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="m" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                  <Area type="monotone" dataKey="visits" stroke="var(--color-chart-1)" fill="url(#v1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="admissions" stroke="var(--color-chart-2)" fill="url(#v2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </PanelCard>
        </div>

        <PanelCard title="By department" action={<Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>}>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={departments} layout="vertical" margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="d" width={80} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="v" fill="var(--color-chart-1)" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PanelCard
            title="Today's appointments"
            action={<Button variant="ghost" size="sm">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appts.map((a) => (
                    <TableRow key={a.patient}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-primary-soft text-primary text-xs">
                              {a.patient.split(" ").map((x) => x[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{a.patient}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{a.doctor}</TableCell>
                      <TableCell className="text-muted-foreground">{a.dept}</TableCell>
                      <TableCell className="text-muted-foreground">{a.time}</TableCell>
                      <TableCell>
                        <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + statusTone[a.status]}>
                          {a.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PanelCard>
        </div>

        <PanelCard title="Recent activity">
          <ul className="space-y-4 text-sm">
            {[
              { t: "Dr. Chen updated lab report for Emma Wilson", ago: "2m ago" },
              { t: "New patient Noah Garcia registered", ago: "18m ago" },
              { t: "Invoice #INV-2381 marked as paid", ago: "1h ago" },
              { t: "Dr. Ortiz added to Neurology rotation", ago: "3h ago" },
              { t: "Weekly compliance report exported", ago: "Yesterday" },
            ].map((x) => (
              <li key={x.t} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="truncate">{x.t}</div>
                  <div className="text-xs text-muted-foreground">{x.ago}</div>
                </div>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </>
  );
}
