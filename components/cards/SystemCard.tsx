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
import {  TriangleAlert, Timer, ShieldCheck } from "lucide-react";
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
    badgeClass:
      "text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/20",
    vulnerabilityClass: "text-rose-600 dark:text-rose-400 font-semibold",
  },
  Warning: {
    icon: Timer,
    badgeClass:
      "bg-yellow-100/50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
    vulnerabilityClass: "text-yellow-600 dark:text-yellow-400 font-semibold",
  },
  Protected: {
    icon: ShieldCheck,
    badgeClass:
      "bg-green-100/50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    vulnerabilityClass: "text-green-600 dark:text-green-400 font-semibold",
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
  const BadgeIcon = config.icon;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="w-full max-w-sm py-4 shadow-none ">
        <CardHeader className="px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {title}
            </CardTitle>

            <div className={cn("rounded-full p-2", config.badgeClass)}>
              <BadgeIcon className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-y-2 text-xs pb-2 px-4">
          <span className="text-slate-500 dark:text-slate-400">Version:</span>
          <span className="font-medium text-right text-slate-700 dark:text-slate-100">
            {version}
          </span>

          <span className="text-slate-500 dark:text-slate-400">
            Vulnerabilities:
          </span>
          <span
            className={cn("font-medium text-right", config.vulnerabilityClass)}
          >
            {vulnerabilities}
          </span>

          <span className="text-slate-500 dark:text-slate-400">
            Last Patch:
          </span>
          <span className="font-medium text-right text-slate-700 dark:text-slate-100">
            {lastPatch}
          </span>
        </CardContent>

        <CardFooter className="px-4">
          <Button
            variant="outline"
            className="w-full text-xs cursor-pointer"
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            Know More
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
