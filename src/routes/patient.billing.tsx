import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { StatCard, PanelCard } from "@/components/dashboard-widgets";
import { CreditCard, Wallet, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/patient/billing")({
  component: BillingPage,
});

const invoices = [
  { id: "INV-3021", desc: "Cardiology follow-up", date: "Aug 12", amount: "$85.00", status: "Paid" },
  { id: "INV-3005", desc: "Lipid panel", date: "Aug 12", amount: "$40.00", status: "Pending" },
  { id: "INV-2987", desc: "Annual physical", date: "Feb 10", amount: "$120.00", status: "Paid" },
];

const tone: Record<string, string> = {
  Paid: "bg-success/15 text-success",
  Pending: "bg-warning/20 text-warning-foreground",
  Overdue: "bg-destructive/15 text-destructive",
};

function BillingPage() {
  return (
    <>
      <PageHeader title="Billing" subtitle="Invoices, coverage and payment methods." actions={<Button>Pay balance</Button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Current balance" value="$40.00" icon={Wallet} tone="warning" />
        <StatCard label="Paid this year" value="$1,205" icon={Receipt} tone="success" />
        <StatCard label="Insurance" value="BlueCross PPO" icon={CreditCard} tone="primary" />
      </div>
      <div className="mt-6">
        <PanelCard title="Invoices">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="font-medium">{i.id}</TableCell>
                    <TableCell className="text-muted-foreground">{i.desc}</TableCell>
                    <TableCell className="text-muted-foreground">{i.date}</TableCell>
                    <TableCell>{i.amount}</TableCell>
                    <TableCell>
                      <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[i.status]}>{i.status}</span>
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
