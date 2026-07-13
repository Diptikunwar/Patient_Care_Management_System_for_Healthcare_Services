import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
});

const readmit = [
  { m: "Jan", r: 5.2 },
  { m: "Feb", r: 4.8 },
  { m: "Mar", r: 4.6 },
  { m: "Apr", r: 4.3 },
  { m: "May", r: 4.1 },
  { m: "Jun", r: 3.9 },
  { m: "Jul", r: 3.7 },
];

const payer = [
  { name: "Insurance", value: 62, color: "var(--color-chart-1)" },
  { name: "Self-pay", value: 18, color: "var(--color-chart-2)" },
  { name: "Medicare", value: 14, color: "var(--color-chart-3)" },
  { name: "Other", value: 6, color: "var(--color-chart-4)" },
];

function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports & insights"
        subtitle="Clinical and operational KPIs across your hospital network."
        actions={<Button variant="outline"><Download className="mr-1.5 h-4 w-4" />Export</Button>}
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PanelCard title="Readmission rate (%)">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={readmit}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Line type="monotone" dataKey="r" stroke="var(--color-chart-1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
        <PanelCard title="Payer mix">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={payer} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {payer.map((p) => <Cell key={p.name} fill={p.color} />)}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>
    </>
  );
}
