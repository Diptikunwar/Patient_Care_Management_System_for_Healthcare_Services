import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, CreditCard, FileText, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { StatCard, PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/admin/billing")({
  component: BillingPage,
});

const invoices = [
  { id: "INV-2381", patient: "Emma Wilson", amount: "$1,240", due: "Aug 20", status: "Paid" },
  { id: "INV-2380", patient: "Liam Patel", amount: "$3,860", due: "Aug 22", status: "Pending" },
  { id: "INV-2379", patient: "Olivia Brown", amount: "$420", due: "Aug 15", status: "Overdue" },
  { id: "INV-2378", patient: "Noah Garcia", amount: "$2,100", due: "Aug 25", status: "Paid" },
  { id: "INV-2377", patient: "Ava Nguyen", amount: "$780", due: "Aug 18", status: "Pending" },
];

const tone: Record<string, string> = {
  Paid: "bg-success/15 text-success",
  Pending: "bg-warning/20 text-warning-foreground",
  Overdue: "bg-destructive/15 text-destructive",
};

function BillingPage() {
  return (
    <>
      <PageHeader
        title="Billing & invoices"
        subtitle="Track hospital revenue, insurance claims and payment status."
        actions={<Button>Create invoice</Button>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (MTD)" value="$482.6K" icon={DollarSign} tone="success" />
        <StatCard label="Outstanding" value="$68.2K" icon={AlertCircle} tone="warning" />
        <StatCard label="Paid invoices" value="1,246" icon={CreditCard} tone="primary" />
        <StatCard label="Claims filed" value="312" icon={FileText} tone="primary" />
      </div>
      <div className="mt-6">
        <PanelCard title="Recent invoices">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="font-medium">{i.id}</TableCell>
                    <TableCell className="text-muted-foreground">{i.patient}</TableCell>
                    <TableCell>{i.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{i.due}</TableCell>
                    <TableCell>
                      <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[i.status]}>
                        {i.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PanelCard>
      </div>
    </>
  );
}
