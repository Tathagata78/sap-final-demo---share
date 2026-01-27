"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProtectedSystemsCardProps {
  protectedCount?: number;
  total?: number;
  delta?: string;
  className?: string;
}

export function ProtectedSystemsCard({
  protectedCount = 156,
  total = 200,
  delta = "+8.63",
  className,
}: ProtectedSystemsCardProps) {
  const isPositive = delta.startsWith("+");
  const DeltaIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-rose-600 dark:text-rose-400";

  const trendBg = isPositive
    ? "bg-emerald-100/50 dark:bg-emerald-900/20"
    : "bg-rose-100/50 dark:bg-rose-900/20";

  const trendRing = isPositive ? "ring-emerald-600/20" : "ring-rose-600/20";

  const buttonColor = isPositive
    ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
    : "bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500";

  return (
    <Card
      className={cn(
        "w-full max-w-sm shadow-none gap-4 overflow-hidden",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Systems Protected
          </CardTitle>
          <div className="flex items-center text-xs text-muted-foreground">
            <Activity className="mr-1 h-3 w-3" />
            Endpoint Security
          </div>
        </div>
        <div className={cn("p-2 rounded-full", trendBg)}>
          <ShieldCheck className={cn("h-5 w-5", trendColor)} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline space-x-3 justify-between">
          <div className="text-4xl font-bold tracking-tight text-foreground">
            {protectedCount}
            <span className="text-2xl font-medium text-muted-foreground ml-1">
              / {total}
            </span>
          </div>
          <div
            className={cn(
              "flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
              trendBg,
              trendColor,
              trendRing,
            )}
          >
            <DeltaIcon className="mr-1 h-3 w-3" />
            {delta}%
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs cursor-pointer bg-background"
        >
          View Details
        </Button>
        <Button
          size="sm"
          className={cn(
            "w-full text-xs text-white shadow-sm cursor-pointer",
            buttonColor,
          )}
        >
          Take Action
        </Button>
      </CardFooter>
    </Card>
  );
}
