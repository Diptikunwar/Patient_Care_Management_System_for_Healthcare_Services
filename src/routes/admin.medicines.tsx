import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Package, AlertTriangle, Pill } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import { PanelCard, StatCard } from "@/components/dashboard-widgets";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MEDICINE_CATALOG, MEDICINE_IMAGES } from "@/lib/prescriptions";

export const Route = createFileRoute("/admin/medicines")({
  component: MedicinesPage,
});

function MedicinesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const categories = useMemo(() => Array.from(new Set(MEDICINE_CATALOG.map((m) => m.category))), []);

  const rows = MEDICINE_CATALOG.filter(
    (m) => (cat === "all" || m.category === cat) && (m.name + m.category).toLowerCase().includes(q.toLowerCase()),
  );

  const outOfStock = MEDICINE_CATALOG.filter((m) => m.stock === 0).length;

  return (
    <>
      <PageHeader title="Medicines" subtitle="Master catalog used across all prescriptions." />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Catalog size" value={String(MEDICINE_CATALOG.length)} icon={Pill} />
        <StatCard label="Categories" value={String(categories.length)} icon={Package} />
        <StatCard label="Rx only" value={String(MEDICINE_CATALOG.filter((m) => m.rxOnly).length)} icon={Pill} tone="warning" />
        <StatCard label="Out of stock" value={String(outOfStock)} icon={AlertTriangle} tone="destructive" />
      </div>

      <PanelCard
        title="Medicine catalog"
        action={
          <div className="flex gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-9 w-44 pl-9" />
            </div>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="h-9 w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={MEDICINE_IMAGES[m.form]}
                        alt={`${m.name} ${m.form}`}
                        loading="lazy"
                        width={512}
                        height={512}
                        className="h-10 w-10 rounded-lg border object-cover"
                      />
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.form} · {m.strength}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.category}</TableCell>
                  <TableCell>${m.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium " +
                        (m.stock === 0
                          ? "bg-destructive/15 text-destructive"
                          : m.stock < 100
                            ? "bg-warning/20 text-warning-foreground"
                            : "bg-success/15 text-success")
                      }
                    >
                      {m.stock === 0 ? "Out of stock" : `${m.stock} units`}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.rxOnly ? "Rx only" : "OTC"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PanelCard>
    </>
  );
}
