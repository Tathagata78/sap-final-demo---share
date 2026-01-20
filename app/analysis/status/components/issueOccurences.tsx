import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  XCircle,
  CheckCircle2,
  FileCheck,
  Layers,
  Bug,
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
    container: "bg-red-50/30 border-red-100/50 dark:bg-red-800/20 dark:border-red-900/20",
    label: "text-red-600 dark:text-red-400",
    count: "text-foreground",
    icon: "text-red-500",
    bar: "bg-red-500",
  },
  resolved: {
    container: "bg-emerald-50/30 border-emerald-100/50 dark:bg-emerald-800/20 dark:border-emerald-900/20",
    label: "text-emerald-600 dark:text-emerald-400",
    count: "text-foreground",
    icon: "text-emerald-500",
    bar: "bg-emerald-500",
  },
  accepted: {
    container: "bg-blue-50/30 border-blue-100/50 dark:bg-blue-800/20 dark:border-blue-900/20",
    label: "text-blue-600 dark:text-blue-400",
    count: "text-foreground",
    icon: "text-blue-500",
    bar: "bg-blue-500",
  },
  default: {
    container: "bg-transparent border-none p-0",
    label: "text-muted-foreground",
    count: "text-blue-600 dark:text-blue-500",
    icon: "text-muted-foreground",
    bar: "bg-blue-600",
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
      className={`group relative flex h-full w-full transition-all duration-300 ${
        isTotal
          ? "flex-row items-center gap-1 pr-4"
          : `flex-col items-start justify-between overflow-hidden rounded-xl border pb-4 pt-1 px-3 ${styles.container}`
      }`}
    >
      {!isTotal && (
        <div
          className={`absolute bottom-0 left-0 h-1 w-full opacity-20 transition-opacity group-hover:opacity-100 ${styles.bar}`}
        />
      )}

      <div
        className={`flex w-full items-center justify-between`}
      >
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
            isTotal ? "text-blue-600 dark:text-blue-500" : styles.label
          }`}
        >
          {label}
        </span>
        {!isTotal && (
          <div className="rounded-lg bg-background/50 p-1.5 backdrop-blur-sm">
            <Icon className={`h-4 w-4 ${styles.icon}`} />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-3">
        <span
          className={`font-bold leading-none tracking-tighter ${
            isTotal
              ? "text-6xl text-blue-600 dark:text-blue-500"
              : `text-3xl ${styles.count}`
          }`}
        >
          {data.count}
        </span>

        {!isTotal && hasPercentage && (
          <div
            className={`flex items-center rounded-full bg-background/50 px-2 py-0.5 text-[10px] font-bold shadow-sm ${trendColor}`}
          >
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
    <Card className="w-full dark:bg-card dark:border-border gap-2 pb-5">
      <CardHeader className="flex flex-row items-center gap-4">
        <Bug className="h-4 w-4 text-red-500" />
        <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Issue Occurrences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
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

          <div>
            <StatColumn
              label="Unresolved"
              data={DATA.unresolved}
              icon={XCircle}
              Icon={XCircle}
              variant="unresolved"
            />
          </div>

          <div>
            <StatColumn
              label="Resolved"
              data={DATA.resolved}
              icon={CheckCircle2}
              Icon={CheckCircle2}
              variant="resolved"
            />
          </div>

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
