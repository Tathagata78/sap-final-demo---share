"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { BarChart3, Filter } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// Import Shadcn Chart Components
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// --- Dummy Data ---
const DATA = [
  { date: "Nov 01", occurrences: 12, assets: 8 },
  { date: "Nov 05", occurrences: 18, assets: 12 },
  { date: "Nov 10", occurrences: 10, assets: 7 },
  { date: "Nov 15", occurrences: 25, assets: 18 },
  { date: "Nov 20", occurrences: 20, assets: 15 },
  { date: "Nov 25", occurrences: 32, assets: 22 },
  { date: "Nov 30", occurrences: 28, assets: 19 },
];

// --- Chart Configuration ---
const chartConfig = {
  occurrences: {
    label: "All Issues",
    color: "oklch(0.6 0.118 184.704)",
  },
  assets: {
    label: "Affected Assets",
    color: " oklch(0.646 0.222 41.116)",
  },
} satisfies ChartConfig;

export const IssueTrendChart = () => {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <Card className="h-full border bg-card flex flex-col gap-2 pb-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold">
              Issue Trends
            </CardTitle>
            <CardDescription>
              Comparative analysis of All Issues vs. Affected Assets.
            </CardDescription>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-fit h-8 text-xs">
                <Filter className="w-3 h-3 text-muted-foreground" />
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d" className="text-xs">
                  Last 7 Days
                </SelectItem>
                <SelectItem value="30d"  className="text-xs">Last 30 Days</SelectItem>
                <SelectItem value="90d"  className="text-xs">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex w-full py-0">
        {/* Shadcn Chart Container */}
        <ChartContainer config={chartConfig} className="max-h-[225px] w-full">
          <LineChart
            accessibilityLayer
            data={DATA}
            margin={{
              left: 12,
              right: 12,
              top: 6,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={1} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} className="pt-5" />

            {/* Line 1: Occurrences */}
            <Line
              dataKey="occurrences"
              type="monotone"
              stroke="var(--color-occurrences)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--color-occurrences)",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
                fill: "var(--color-occurrences)",
              }}
            />

            {/* Line 2: Assets */}
            <Line
              dataKey="assets"
              type="monotone"
              stroke="var(--color-assets)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--color-assets)",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
                fill: "var(--color-assets)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default IssueTrendChart;
