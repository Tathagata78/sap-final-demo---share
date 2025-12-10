import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  AlertOctagon,
  XCircle,
  CheckCircle2,
  FileCheck,
  Layers,
} from "lucide-react";

interface MetricData {
  count: number;
  percentageChange: number;
}

const DATA = {
  unresolved: { count: 14, percentageChange: 12 },
  resolved: { count: 45, percentageChange: -5 },
  accepted: { count: 8, percentageChange: 2 },
};

const totalCount =
  DATA.unresolved.count + DATA.resolved.count + DATA.accepted.count;

const VARIANTS = {
  unresolved: {
    container:
      "bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900/50",
    label: "text-red-700 dark:text-red-500",
    count: "text-accent-foreground",
    icon: "text-red-500",
  },
  resolved: {
    container:
      "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50",
    label: "text-emerald-700 dark:text-emerald-500",
    count: "text-accent-foreground",
    icon: "text-emerald-500",
  },
  accepted: {
    container:
      "bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50",
    label: "text-blue-700 dark:text-blue-500",
    count: "text-accent-foreground",
    icon: "text-blue-500",
  },
  default: {
    container: "bg-transparent border-none p-0",
    label: "text-muted-foreground",
    count: "text-foreground",
    icon: "text-muted-foreground",
  },
};

const StatColumn = ({
  label,
  data,
  isTotal = false,
  variant = "default",
  Icon,
}: {
  label: string;
  data: MetricData | { count: number };
  icon: any;
  isTotal?: boolean;
  variant?: keyof typeof VARIANTS;
  Icon: any;
}) => {
  const percentageChange =
    "percentageChange" in data ? data.percentageChange : 0;
  const hasPercentage = "percentageChange" in data;

  const isPositive = percentageChange > 0;
  const isNeutral = percentageChange === 0;

  const styles = VARIANTS[variant];

  const trendColor = isNeutral
    ? "text-muted-foreground"
    : variant !== "default"
    ? styles.label 
    : isPositive
    ? "text-green-600 dark:text-green-500"
    : "text-red-600 dark:text-red-500";

  return (
    <div
      className={`flex h-full w-full ${
        isTotal
          ? "flex-row items-center gap-2 px-4" 
          : `flex-col items-start justify-between rounded-xl border p-4 ${styles.container}`
      }`}
    >
      <div
        className={`flex w-full items-center justify-between ${
          isTotal ? "mb-0 w-auto" : "mb-3"
        }`}
      >
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            isTotal ? "text-blue-600 dark:text-blue-500" : styles.label
          }`}
        >
          {label}
        </span>
        {!isTotal && <Icon className={`h-4 w-4 ${styles.icon}`} />}
      </div>

      <div className="flex items-baseline space-x-2">
        <span
          className={`font-bold leading-none tracking-tight ${
            isTotal
              ? "text-5xl text-blue-600 dark:text-blue-500"
              : `text-3xl ${styles.count}`
          }`}
        >
          {data.count}
        </span>

        {!isTotal && hasPercentage && (
          <div className={`flex items-center text-xs font-bold ${trendColor}`}>
            {isNeutral ? (
              <Minus className="mr-0.5 h-3 w-3" />
            ) : isPositive ? (
              <ArrowUp className="mr-0.5 h-3 w-3" />
            ) : (
              <ArrowDown className="mr-0.5 h-3 w-3" />
            )}
            <span>{Math.abs(percentageChange)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

const IssueOccurrencesCard = () => {
  return (
    <Card className="w-full shadow-md dark:bg-card dark:border-border gap-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Issue Occurrences
        </CardTitle>
        <AlertOctagon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {/* 1. TOTAL ISSUES (Kept clean/minimal) */}
          <div className="flex items-center justify-center md:justify-start">
            <StatColumn
              label="Total Issues"
              data={{ count: totalCount }}
              icon={Layers}
              Icon={Layers}
              isTotal={true}
              variant="default"
            />
          </div>

          {/* 2. Unresolved (Red Theme) */}
          <div>
            <StatColumn
              label="Unresolved"
              data={DATA.unresolved}
              icon={XCircle}
              Icon={XCircle}
              variant="unresolved"
            />
          </div>

          {/* 3. Resolved (Green/Emerald Theme) */}
          <div>
            <StatColumn
              label="Resolved"
              data={DATA.resolved}
              icon={CheckCircle2}
              Icon={CheckCircle2}
              variant="resolved"
            />
          </div>

          {/* 4. Accepted (Blue Theme) */}
          <div>
            <StatColumn
              label="Accepted"
              data={DATA.accepted}
              icon={FileCheck}
              Icon={FileCheck}
              variant="accepted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueOccurrencesCard;
