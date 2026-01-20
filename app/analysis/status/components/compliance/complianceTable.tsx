"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  XCircle,
  CalendarClock,
  Zap,
} from "lucide-react";

type Job = {
  id: number;
  name: string;
  type: string;
  assets: number;
  status: string;
  lastScan: string;
  scheduled: boolean;
  compliance: number;
  trend: "up" | "down" | "flat" | null;
};

const jobsData: Job[] = [
  {
    id: 1,
    name: "GDPR_GCP",
    type: "On Demand",
    assets: 1,
    status: "Success",
    lastScan: "2023-12-07 18:43",
    scheduled: false,
    compliance: 48,
    trend: "flat",
  },
  {
    id: 2,
    name: "PCI_DSS_AWS",
    type: "Scheduled",
    assets: 12,
    status: "Failed",
    lastScan: "2023-12-08 09:00",
    scheduled: true,
    compliance: 82,
    trend: "up",
  },
  {
    id: 3,
    name: "HIPAA_Azure",
    type: "Scheduled",
    assets: 5,
    status: "Success",
    lastScan: "2023-12-08 10:30",
    scheduled: true,
    compliance: 95,
    trend: "down",
  },
  {
    id: 4,
    name: "SOC2_Gen",
    type: "On Demand",
    assets: 3,
    status: "Success",
    lastScan: "2023-12-06 14:15",
    scheduled: false,
    compliance: 12,
    trend: "flat",
  },
];

const getComplianceColor = (score: number) => {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-500";
  if (score >= 50) return "text-amber-600 dark:text-amber-500";
  return "text-rose-600 dark:text-rose-500";
};

const getComplianceBg = (score: number) => {
  if (score >= 80) return "bg-emerald-100 dark:bg-emerald-900/30";
  if (score >= 50) return "bg-amber-100 dark:bg-amber-900/30";
  return "bg-rose-100 dark:bg-rose-900/30";
};

const StatusBadge = ({ status }: { status: string }) => {
  const isSuccess = status.toLowerCase() === "success";
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <XCircle className="h-3 w-3" />
      )}
      {status}
    </div>
  );
};

const TrendIndicator = ({ trend }: { trend: string | null }) => {
  if (!trend) return <span className="text-xs text-muted-foreground">-</span>;
  if (trend === "up")
    return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
  if (trend === "down")
    return <ArrowDownRight className="h-4 w-4 text-rose-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const ComplianceJobTable = () => {
  const [sortKey, setSortKey] = useState("last_scanned");

  const sortedJobs = useMemo(() => {
    const data = [...jobsData];
    switch (sortKey) {
      case "last_scanned":
        return data.sort(
          (a, b) =>
            new Date(b.lastScan).getTime() - new Date(a.lastScan).getTime()
        );
      case "compliance":
        return data.sort((a, b) => b.compliance - a.compliance);
      case "scheduled":
        return data.sort((a, b) => Number(b.scheduled) - Number(a.scheduled));
      case "status":
        return data.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return data;
    }
  }, [sortKey]);

  return (
    <Card className="w-full gap-1">
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <CardTitle className="text-xl font-bold tracking-tight">
                Compliance Jobs
              </CardTitle>
              <span className="text-xs tracking-wide text-muted-foreground">Showing {sortedJobs.length} latest</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              SORT BY:
            </span>
            <Select value={sortKey} onValueChange={setSortKey}>
              <SelectTrigger className="w-auto h-auto text-xs font-semibold">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_scanned" className="text-xs">
                  Last Scanned
                </SelectItem>
                <SelectItem value="compliance" className="text-xs">
                  Compliance Rate
                </SelectItem>
                <SelectItem value="scheduled" className="text-xs">
                  Scheduled Status
                </SelectItem>
                <SelectItem value="status" className="text-xs">
                  Success/Fail
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 py-0">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px] font-semibold text-xs uppercase tracking-wider text-foreground/70">
                Job Name / Assets
              </TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-foreground/70">
                Trigger
              </TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-foreground/70">
                Status
              </TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-foreground/70">
                Compliance
              </TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-foreground/70">
                Trend
              </TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-foreground/70">
                Last Scanned
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedJobs.map((job) => (
              <TableRow
                key={job.id}
                className="group hover:bg-muted/30 transition-colors"
              >
                <TableCell className="py-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground">
                      {job.name}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      {job.assets} Asset{job.assets !== 1 && "s"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    {job.scheduled ? (
                      <CalendarClock className="h-3.5 w-3.5 text-blue-500" />
                    ) : (
                      <Zap className="h-3.5 w-3.5 text-orange-500" />
                    )}
                    {job.type}
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <StatusBadge status={job.status} />
                </TableCell>

                <TableCell className="py-3">
                  <div
                    className={`flex items-center justify-center w-10 h-8 rounded-md font-bold text-sm ${getComplianceBg(
                      job.compliance
                    )} ${getComplianceColor(job.compliance)}`}
                  >
                    {job.compliance}%
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <TrendIndicator trend={job.trend} />
                    <span className="text-[10px] text-muted-foreground uppercase">
                      vs last
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-foreground">
                      {job.lastScan.split(" ")[0]}
                    </span>
                    <span className="text-muted-foreground">
                      {job.lastScan.split(" ")[1]}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ComplianceJobTable;
