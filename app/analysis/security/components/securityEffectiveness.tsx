"use client";

import { useState } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Filter,
  Timer,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

interface ResolutionMetric {
  category: Severity;
  time: number;
  unit: string;
  slaPercentage: number;
}

interface AgingMetric {
  id: string;
  days: number;
  category: Severity;
  trend: number;
  trendDir: "up" | "down";
}

const resolutionData: ResolutionMetric[] = [
  { category: "CRITICAL", time: 4, unit: "Hours", slaPercentage: 85 },
  { category: "HIGH", time: 2, unit: "Days", slaPercentage: 60 },
  { category: "MEDIUM", time: 5, unit: "Days", slaPercentage: 45 },
  { category: "LOW", time: 12, unit: "Days", slaPercentage: 90 },
  { category: "CRITICAL", time: 3, unit: "Hours", slaPercentage: 55 },
  { category: "CRITICAL", time: 6, unit: "Hours", slaPercentage: 95 },
  { category: "LOW", time: 1, unit: "Days", slaPercentage: 15 },
  { category: "LOW", time: 4, unit: "Days", slaPercentage: 30 },
];

const agingData: AgingMetric[] = [
  { id: "1", days: 675, category: "CRITICAL", trend: 3, trendDir: "up" },
  { id: "2", days: 420, category: "HIGH", trend: 5, trendDir: "up" },
  { id: "3", days: 120, category: "MEDIUM", trend: 12, trendDir: "down" },
  { id: "4", days: 45, category: "LOW", trend: 2, trendDir: "up" },
  { id: "5", days: 12, category: "CRITICAL", trend: 0, trendDir: "down" },
  { id: "6", days: 95, category: "HIGH", trend: 1, trendDir: "up" },
];

const severityConfig = {
  CRITICAL: { label: "Critical", color: "hsl(0, 84%, 60%)" },
  HIGH: { label: "High", color: "hsl(24.6, 95%, 53.1%)" },
  MEDIUM: { label: "Medium", color: "hsl(142.1, 76.2%, 36.3%)" },
  LOW: { label: "Low", color: "hsl(217.2, 91.2%, 59.8%)" },
};

const getAgingConfig = (category: string) => {
  switch (category) {
    case "CRITICAL":
      return {
        text: "text-red-500",
        progress: "bg-red-500",
      };
    case "HIGH":
      return {
        text: "text-amber-500",
        progress: "bg-amber-500",
      };
    case "MEDIUM":
      return {
        text: "text-green-500",
        progress: "bg-green-500",
      };
    case "LOW":
      return {
        text: "text-blue-500",
        progress: "bg-blue-500",
      };
    default:
      return {
        text: "text-zinc-500",
        progress: "bg-zinc-500",
      };
  }
};

function ResolutionRadialCard({ item }: { item: ResolutionMetric }) {
  const config = severityConfig[item.category];

  const chartData = [
    {
      name: "usage",
      visitors: item.slaPercentage,
      fill: config.color,
    },
  ];

  const chartConfig = {
    visitors: { label: "SLA Used" },
  } satisfies ChartConfig;

  const endAngle = 90 - (360 * item.slaPercentage) / 100;

  return (
    <Card className="flex flex-col shadow-none border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-0 pt-2 pb-4 gap-2">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[150px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle}
            innerRadius={50}
            outerRadius={70}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-zinc-100 dark:first:fill-zinc-800 last:fill-transparent"
              polarRadius={[60, 20]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-zinc-900 dark:fill-zinc-100 text-3xl font-bold"
                        >
                          {item.time}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-zinc-500 dark:fill-zinc-400 text-xs"
                        >
                          {item.unit}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col p-0">
        <span
          style={{ color: config.color }}
          className="font-bold uppercase tracking-wide text-sm"
        >
          {config.label}
        </span>
      </CardFooter>
    </Card>
  );
}

export function SecurityEffectiveness() {
  const [resFilter, setResFilter] = useState<string>("ALL");
  const [ageFilter, setAgeFilter] = useState<string>("0");

  const filteredResolution =
    resFilter === "ALL"
      ? resolutionData
      : resolutionData.filter((item) => item.category === resFilter);

  const filteredAging = agingData.filter(
    (item) => item.days > parseInt(ageFilter, 10)
  );

  return (
    <Card className="w-full bg-slate-50/50 dark:bg-black/20 gap-2">
      <CardHeader className="px-5 bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-primary rounded-full" />
          <CardTitle className="text-base font-semibold tracking-wider uppercase">
            Effectiveness Metrics
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="px-5 py-0 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Clock className="h-4 w-4 text-zinc-400" />
              Avg. Time to Resolve
            </h4>

            <div className="w-fit">
              <Select defaultValue="ALL" onValueChange={setResFilter}>
                <SelectTrigger className="h-fit text-xs bg-white dark:bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <Filter className="h-3 w-3 opacity-50" />
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="ALL">All Categories</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {filteredResolution.map((item, index) => (
              <ResolutionRadialCard
                key={`${item.category}-${index}`}
                item={item}
              />
            ))}
          </div>

          {filteredResolution.length === 0 && (
            <div className="text-xs text-muted-foreground italic py-1">
              No resolution data matches filter.
            </div>
          )}
        </div>

        {/* --- Aging Section --- */}
        <div className="px-5 py-4 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-zinc-400" />
              Vulnerability Aging
            </h4>

            <div className="w-fit">
              <Select defaultValue="0" onValueChange={setAgeFilter}>
                <SelectTrigger className="h-8 text-xs bg-white dark:bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <Filter className="h-3 w-3 opacity-50" />
                    <SelectValue placeholder="Days" />
                  </div>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="0">Any Duration</SelectItem>
                  <SelectItem value="30">More than 30 Days</SelectItem>
                  <SelectItem value="60">More than 60 Days</SelectItem>
                  <SelectItem value="90">More than 90 Days</SelectItem>
                  <SelectItem value="180">More than 180 Days</SelectItem>
                  <SelectItem value="365">More than 1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filteredAging.map((item) => {
              const config = getAgingConfig(item.category);
              const riskPercentage = Math.min((item.days / 365) * 100, 100);

              return (
                <div
                  key={item.id}
                  className="
                    group relative flex flex-col justify-between 
                    bg-white dark:bg-zinc-900 
                    border border-zinc-200 dark:border-zinc-800
                    rounded-md overflow-hidden
                  "
                >
                  <div className="p-4 flex flex-col h-full gap-3">
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex items-baseline justify-between">
                        <div className="gap-1 items-baseline flex">
                          <span
                            className={`text-3xl font-black tracking-tighter ${config.text}`}
                          >
                            {item.days}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">
                            days
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 pt-1">
                          <div
                            className={`flex items-center gap-0.5 text-sm font-bold ${
                              item.trendDir === "up"
                                ? "text-red-600 dark:text-red-500"
                                : "text-green-600 dark:text-green-500"
                            }`}
                          >
                            {item.trendDir === "up" ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            <span>{item.trend}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                          <span>Risk Level</span>
                          <span>{Math.round(riskPercentage)}%</span>
                        </div>
                        <Progress
                          value={riskPercentage}
                          className="h-1.5 bg-zinc-200 dark:bg-zinc-800"
                        >
                          <div
                            className={`h-full w-full flex-1 transition-all ${config.progress}`}
                            style={{
                              transform: `translateX(-${
                                100 - (riskPercentage || 0)
                              }%)`,
                            }}
                          />
                        </Progress>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <span
                        className={`font-bold uppercase tracking-wide text-sm ${config.text}`}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAging.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center border rounded-lg border-dashed border-zinc-200 dark:border-zinc-800">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-2">
                <Timer className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                No aging vulnerabilities found
              </p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
