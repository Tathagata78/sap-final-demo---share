"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Settings,
  FileCode,
  AlertTriangle,
  AlertCircle,
  Calendar,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CriticalityDetailDialog } from "./criticalityDetailsDialog";

interface Segment {
  id: string;
  label: string;
  count: number;
  icon: React.ElementType;
  colorClass: string;
}

export default function CriticalityOccurrence() {
  const [filterDays, setFilterDays] = useState("any");
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  const segments: Segment[] = [
    {
      id: "auth",
      label: "Authorization",
      count: 74,
      icon: ShieldAlert,
      colorClass:
        "text-rose-500 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400",
    },
    {
      id: "config",
      label: "Configuration",
      count: 10,
      icon: Settings,
      colorClass:
        "text-orange-500 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-400",
    },
    {
      id: "code",
      label: "Code Issues",
      count: 0,
      icon: FileCode,
      colorClass:
        "text-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400",
    },
    {
      id: "patch",
      label: "Missing Patches",
      count: 14,
      icon: AlertTriangle,
      colorClass:
        "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 dark:text-yellow-400",
    },
  ];

  const totalIssues = 98;

  const getSegment = (id: string) => segments.find((s) => s.id === id);

  const renderSegmentCard = (id: string) => {
    const segment = getSegment(id);
    if (!segment) return null;

    return (
      <div
        onClick={() => setSelectedSegment(segment)}
        className="cursor-pointer group flex items-center justify-between rounded-md border bg-card p-5"
      >
        {/* Left Side: Count & Label */}
        <div className="flex flex-col space-y-3">
          <span
            className={`text-4xl font-bold leading-none ${
              segment.count > 0
                ? "text-foreground"
                : "text-slate-300 dark:text-slate-700"
            }`}
          >
            {segment.count}
          </span>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {segment.label}
          </span>
        </div>

        {/* Right Side: Icon */}
        <div
          className={`rounded-full p-2.5 ${segment.colorClass} bg-opacity-90 dark:bg-opacity-80`}
        >
          <segment.icon className="h-5 w-5" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="w-full bg-slate-50/50 dark:bg-black/20 shadow-sm dark:shadow-none gap-2">
        <CardHeader className="px-5 py-2 bg-white/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <CardTitle className="text-base font-semibold tracking-wider uppercase text-foreground">
              Criticality Occurrences
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="flex flex-col gap-2 px-5">
            {/* Filter Row */}
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-zinc-400" />
                Vulnerabilities requiring remediation
              </h4>

              <div className="w-fit">
                <Select value={filterDays} onValueChange={setFilterDays}>
                  <SelectTrigger className="h-8 text-xs bg-white dark:bg-zinc-900 w-fit">
                    <div>
                      <SelectValue placeholder="Duration" />
                    </div>
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="any">More than any</SelectItem>
                    <SelectItem value="30">More than 30 days</SelectItem>
                    <SelectItem value="60">More than 60 days</SelectItem>
                    <SelectItem value="90">More than 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Total Card */}
              <div className="md:col-span-2 rounded-lg bg-white border border-slate-200 p-5 flex flex-row items-center justify-between dark:bg-zinc-900 dark:border-slate-800">
                <div className="space-y-3">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total Critical Issues
                  </div>
                  <div className="text-6xl font-extrabold tracking-tighter text-foreground leading-none">
                    {totalIssues}
                  </div>
                </div>

                <div className="w-1/2 flex flex-col items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    Severity Distribution
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-red-500 to-orange-500 w-[85%]" />
                  </div>
                </div>
              </div>

              {/* Segment Cards */}
              {renderSegmentCard("code")}
              {renderSegmentCard("auth")}
              {renderSegmentCard("config")}
              {renderSegmentCard("patch")}
            </div>
          </div>
        </CardContent>
      </Card>

      <CriticalityDetailDialog
        isOpen={!!selectedSegment}
        onClose={() => setSelectedSegment(null)}
        category={selectedSegment}
      />
    </>
  );
}
