"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
  { label: "Q1 2025", effectiveness: 58, coverage: 82 },
  { label: "Q2 2025", effectiveness: 61, coverage: 86 },
  { label: "Q3 2025", effectiveness: 63, coverage: 89 },
  { label: "You Today", effectiveness: 66, coverage: 92 },
];

const chartConfig = {
  effectiveness: {
    label: "Effectiveness",
    color: "var(--color-chart-1)",
  },
  coverage: {
    label: "Coverage",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

export function SecurityOverTimeChart() {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <CardTitle>Security Program Over Time</CardTitle>
        <CardDescription>
          Historical trend of program effectiveness and coverage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[300px] w-full chart-bg"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              tickCount={6}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="effectiveness"
              type="natural"
              stroke="var(--color-effectiveness)"
              strokeWidth={2}
              dot={{ fill: "var(--color-effectiveness)" }}
              activeDot={{ r: 6 }}
              name="Effectiveness"
            />
            <Line
              dataKey="coverage"
              type="natural"
              stroke="var(--color-coverage)"
              strokeWidth={2}
              dot={{ fill: "var(--color-coverage)" }}
              activeDot={{ r: 6 }}
              name="Coverage"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
