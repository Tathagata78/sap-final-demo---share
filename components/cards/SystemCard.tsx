"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TriangleAlert,
  Timer,
  ShieldCheck,
  ChevronRight,
  Activity,
  CalendarClockIcon,
  Server,
} from "lucide-react";
import SystemDetailsDialog from "./systemDetailsDialog";

export type SystemStatus = "Critical" | "Warning" | "Protected";

interface SystemCardProps {
  title: string;
  status: SystemStatus;
  version: string;
  vulnerabilities: number;
  lastPatch: string;
}

const statusConfig = {
  Critical: {
    icon: TriangleAlert,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/60",
    gradientFrom: "from-rose-500/90",
  },
  Warning: {
    icon: Timer,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/60",
    gradientFrom: "from-amber-500/90",
  },
  Protected: {
    icon: ShieldCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/60",
    gradientFrom: "from-emerald-500/90",
  },
};

export function SystemCard({
  title,
  status,
  version,
  vulnerabilities,
  lastPatch,
}: SystemCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="w-full max-w-sm group relative overflow-hidden gap-0 shadow-none">
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-1 bg-linear-to-r to-transparent",
            config.gradientFrom,
            "opacity-80",
          )}
        />

        <CardHeader className="px-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
                <Server className={cn("h-4 w-4", config.color)} />
                {title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 pt-2 pb-6 text-muted-foreground">
          <div className="flex justify-center">
            <div className="flex gap-2 items-baseline">
              <span
                className={cn(
                  "text-4xl font-bold tracking-tight",
                  "text-slate-900 dark:text-white",
                )}
              >
                {vulnerabilities}
              </span>
              <span className={cn("text-sm font-medium mb-1", config.color)}>
                Vulnerabilities
              </span>
            </div>
          </div>

          {/* <p className="text-xs mt-1 mb-6">Detected security exposures</p>

          <div className="w-full h-1.5 rounded-full bg-muted mb-6 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full opacity-80",
                config.color.replace("text-", "bg-"),
              )}
              style={{
                width:
                  status === "Protected"
                    ? "100%"
                    : status === "Warning"
                      ? "60%"
                      : "30%",
              }}
            />
          </div> */}

          <div className="flex flex-col justify-between mt-2 gap-2 items-center">
            <div className="flex gap-1 items-baseline">
              <div className="flex gap-2">
                <Activity className="h-3 w-3" />
                <span className="text-[10px] uppercase font-semibold tracking-wide">
                  Version ~
                </span>
              </div>
              <span className="text-sm font-medium text-accent-foreground">
                {version}
              </span>
            </div>

            <div className="flex gap-1 items-baseline">
              <div className="flex gap-2">
                <CalendarClockIcon className="h-3 w-3" />
                <span className="text-[10px] uppercase font-semibold tracking-wide">
                  Last Patch ~
                </span>
              </div>
              <span className="text-sm font-medium text-accent-foreground">
                {lastPatch}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-4 justify-between items-center flex">
          <div
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset",
                config.bgColor,
                config.color,
                config.borderColor,
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              <span>{status}</span>
            </div>
          <Button
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <span className="text-xs font-semibold">View Details</span>
          </Button>
        </CardFooter>
      </Card>

      <SystemDetailsDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        status={status}
        version={version}
        vulnerabilities={vulnerabilities}
        lastPatch={lastPatch}
      />
    </>
  );
}
