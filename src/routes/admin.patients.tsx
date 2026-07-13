import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, Filter } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard } from "@/components/dashboard-widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/patients")({
  component: PatientsPage,
});

const rows = [
  { name: "Emma Wilson", id: "P-10245", age: 34, gender: "Female", doctor: "Dr. Chen", status: "Active", last: "Aug 12" },
  { name: "Liam Patel", id: "P-10246", age: 51, gender: "Male", doctor: "Dr. Ortiz", status: "Admitted", last: "Aug 12" },
  { name: "Olivia Brown", id: "P-10247", age: 8, gender: "Female", doctor: "Dr. Kim", status: "Active", last: "Aug 11" },
  { name: "Noah Garcia", id: "P-10248", age: 63, gender: "Male", doctor: "Dr. Chen", status: "Follow-up", last: "Aug 11" },
  { name: "Ava Nguyen", id: "P-10249", age: 27, gender: "Female", doctor: "Dr. Reeves", status: "Discharged", last: "Aug 10" },
  { name: "Ethan Wright", id: "P-10250", age: 45, gender: "Male", doctor: "Dr. Ortiz", status: "Active", last: "Aug 10" },
];

const tone: Record<string, string> = {
  Active: "bg-primary-soft text-primary",
  Admitted: "bg-warning/20 text-warning-foreground",
  "Follow-up": "bg-accent text-accent-foreground",
  Discharged: "bg-success/15 text-success",
};

function PatientsPage() {
  return (
    <>
      <PageHeader
        title="Patient management"
        subtitle="Browse, filter and manage every patient record in one place."
        actions={
          <Button><Plus className="mr-1.5 h-4 w-4" />Add patient</Button>
        }
      />
      <PanelCard
        title="All patients"
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search patients" className="h-9 w-56 pl-9" />
            </div>
            <Button variant="outline" size="sm"><Filter className="mr-1.5 h-4 w-4" />Filter</Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Primary doctor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-soft text-primary text-xs">
                          {r.name.split(" ").map((x) => x[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{r.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.id}</TableCell>
                  <TableCell className="text-muted-foreground">{r.age}</TableCell>
                  <TableCell className="text-muted-foreground">{r.gender}</TableCell>
                  <TableCell className="text-muted-foreground">{r.doctor}</TableCell>
                  <TableCell>
                    <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + tone[r.status]}>
                      {r.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.last}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PanelCard>
    </>
  );
}
