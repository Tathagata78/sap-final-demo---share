"use client";

import { useState } from "react";
import {
  Info,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CoverageAssetsDialog } from "./coverageAssetsDialog";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const ModuleGauge = ({
  label,
  current,
  total,
  color,
  colorHex,
}: {
  label: string;
  current: number;
  total: number;
  color: string;
  colorHex: string;
}) => {
  const percentage = Math.round((current / total) * 100);
  const data = [{ value: current, fill: colorHex }];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 text-slate-100 dark:text-zinc-800">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            barSize={8}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, total]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: "currentColor" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-lg sm:text-xl font-bold ${color}`}>
            {percentage}%
          </span>
        </div>
      </div>

      {/* Legend / Info */}
      <div className="text-center">
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">
          {label}
        </div>
        <div className="text-xs sm:text-sm font-medium text-foreground">
          <span className={color}>{current}</span>
          <span className="text-muted-foreground/60 mx-1">/</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
};

export function CoverageCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleOpenDialog = (title: string) => {
    setDialogTitle(title);
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full bg-slate-50/50 dark:bg-black/20 shadow-sm border-slate-200/60 dark:border-zinc-800 gap-2">
        <CardHeader className="px-4 pt-2 bg-white/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <CardTitle className="text-base font-semibold tracking-wider uppercase text-foreground">
              Coverage Overview
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Top Section: Undiscovered & Unlicensed */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200/60 dark:border-zinc-800">
            <div className="p-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200/60 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center">
                  Undiscovered Assets
                </h3>
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-muted-foreground/70 hover:text-primary transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="w-fit text-xs">
                      <p>
                        Assets detected on the network but not yet fully managed
                        or inventoried.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Stacked Vertical Layout */}
              <div className="flex flex-col gap-3">
                {/* Linked to Solman */}
                <div className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/50 transition-all hover:border-blue-200 dark:hover:border-blue-800/50">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-br from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600 min-w-6 text-center">
                      6
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase">
                      Linked to Solman
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer"
                    onClick={() => handleOpenDialog("Linked to Solman Details")}
                  >
                    View
                    <ChevronRight className="h-3 w-3 ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>

                {/* Hana Tenants */}
                <div className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/50 transition-all hover:border-violet-200 dark:hover:border-violet-800/50">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-br from-violet-600 to-violet-400 dark:from-violet-400 dark:to-violet-600 min-w-6 text-center">
                      9
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase">
                      Hana Tenants
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/10 hover:bg-violet-100 dark:hover:bg-violet-900/30 cursor-pointer"
                    onClick={() => handleOpenDialog("Hana Tenants Details")}
                  >
                    View
                    <ChevronRight className="h-3 w-3 ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section: Unlicensed */}
            <div className="p-4 flex flex-col h-full bg-slate-50/50 dark:bg-zinc-900/20">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center">
                      Unlicensed For Assets
                    </h3>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500/80 hover:text-amber-600 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="w-fit text-xs">
                          <p>
                            Assets that currently do not have a valid license
                            assigned.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-br from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400">
                      2
                    </span>
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Requires Attention
                    </span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-medium h-9 cursor-pointer border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/10 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/20 hover:border-amber-300 transition-all"
                    onClick={() => handleOpenDialog("Unlicensed Assets List")}
                  >
                    Resolve Issues
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* New Bottom Section: Modules Not Run */}
          <div className="p-4 bg-white/30 dark:bg-zinc-950/30">
            {/* Header for Modules Section */}
            <div className="flex flex-col gap-1 mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center">
                  Modules Not Run (By Category)
                </h3>
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Layers className="h-3.5 w-3.5 text-muted-foreground/70 hover:text-primary transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="w-fit text-xs">
                      <p>
                        Breakdown of specific modules that failed to execute
                        during the last synchronization cycle.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Total Count Displayed Inline */}
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Total Impacted Modules:
                </span>
                <span className="text-base font-black text-foreground">
                  4,646
                </span>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              <ModuleGauge
                label="Authorization"
                current={1680}
                total={1686}
                color="text-green-500"
                colorHex="#22c55e"
              />
              <ModuleGauge
                label="Configuration"
                current={720}
                total={1350}
                color="text-blue-500"
                colorHex="#3b82f6"
              />
              <ModuleGauge
                label="Code Issues"
                current={1096}
                total={1096}
                color="text-red-500"
                colorHex="#ef4444"
              />
              <ModuleGauge
                label="Missing Patches"
                current={232}
                total={514}
                color="text-amber-500"
                colorHex="#f59e0b"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CoverageAssetsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogTitle}
      />
    </>
  );
}
