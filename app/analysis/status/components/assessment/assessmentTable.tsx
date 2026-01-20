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


type AssessmentJob = {
  id: number;
  name: string;
  type: string;
  assets: number;
  status: string;
  lastRun: string; 
  scheduled: boolean;
  issues: number;
  trend: "up" | "down" | "flat" | null;
};

const assessmentData: AssessmentJob[] = [
  {
    id: 1,
    name: "ATCP_PRD",
    type: "Scheduled",
    assets: 1,
    status: "Success",
    lastRun: "2025-11-30 20:00",
    scheduled: true,
    issues: 61,
    trend: "flat", 
  },
  {
    id: 2,
    name: "EXT_VULN_SCAN",
    type: "On Demand",
    assets: 15,
    status: "Failed",
    lastRun: "2025-11-29 14:30",
    scheduled: false,
    issues: 0, 
    trend: "flat",
  },
  {
    id: 3,
    name: "INT_NET_SEGMENT_A",
    type: "Scheduled",
    assets: 42,
    status: "Success",
    lastRun: "2025-12-01 08:00",
    scheduled: true,
    issues: 124,
    trend: "up", 
  },
  {
    id: 4,
    name: "WEB_APP_PAYMENTS",
    type: "Scheduled",
    assets: 4,
    status: "Success",
    lastRun: "2025-12-02 09:15",
    scheduled: true,
    issues: 12,
    trend: "down", 
  },
];

const getIssueColor = (count: number, status: string) => {
  if (status.toLowerCase() !== "success") return "text-muted-foreground";
  if (count >= 100) return "text-red-600 dark:text-red-500";
  if (count >= 50) return "text-orange-600 dark:text-orange-500";
  if (count > 0) return "text-amber-600 dark:text-amber-500";
  return "text-emerald-600 dark:text-emerald-500";
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

  if (trend === "up") return <ArrowUpRight className="h-4 w-4 text-red-500" />;

  if (trend === "down")
    return <ArrowDownRight className="h-4 w-4 text-emerald-500" />;

  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const AssessmentJobTable = () => {
  const [sortKey, setSortKey] = useState("last_run");

  const sortedJobs = useMemo(() => {
    const data = [...assessmentData];
    switch (sortKey) {
      case "last_run":
        return data.sort(
          (a, b) =>
            new Date(b.lastRun).getTime() - new Date(a.lastRun).getTime()
        );
      case "issues":
        return data.sort((a, b) => b.issues - a.issues);
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
                Assessment Jobs
              </CardTitle>
              <span className="text-xs tracking-wide text-muted-foreground">
                Showing {sortedJobs.length} latest
              </span>
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
                <SelectItem value="last_run" className="text-xs">
                  Last Run
                </SelectItem>
                <SelectItem value="issues" className="text-xs">
                  Issue Count
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
                Issues Found
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
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
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
                    <div>
                      <span className={getIssueColor(job.issues, job.status)}>
                        <span className="text-2xl font-bold">{job.issues}</span>
                        <span className="text-base ml-2">Issues</span>
                      </span>
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
                        {job.lastRun.split(" ")[0]}
                      </span>
                      <span className="text-muted-foreground">
                        {job.lastRun.split(" ")[1]}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground italic"
                >
                  No assessment jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssessmentJobTable;
