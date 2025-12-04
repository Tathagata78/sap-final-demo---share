"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", detected: 186, blocked: 180 },
  { month: "February", detected: 305, blocked: 290 },
  { month: "March", detected: 237, blocked: 230 },
  { month: "April", detected: 73, blocked: 73 },
  { month: "May", detected: 209, blocked: 200 },
  { month: "June", detected: 214, blocked: 210 },
];

const chartConfig = {
  detected: {
    label: "Threats Detected",
    color: "var(--color-chart-1)",
  },
  blocked: {
    label: "Threats Blocked",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

export function SecurityEffectivenessChart() {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <CardTitle>Program Effectiveness</CardTitle>
        <CardDescription>
          Comparison of detected vs. mitigated threats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="detected"
              fill="var(--color-detected)"
              radius={4}
              barSize={18}
            />
            <Bar
              dataKey="blocked"
              fill="var(--color-blocked)"
              radius={4}
              barSize={18}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
