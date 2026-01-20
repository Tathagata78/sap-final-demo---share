import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface IncidentsAlertsProps {
  newIncidents: number;
}

const IncidentsAlertsCard = ({ newIncidents }: IncidentsAlertsProps) => {
  const isZero = newIncidents === 0;
  const changeText = isZero ? "NO CHANGE" : `${newIncidents} CHANGE`;

  const statusColor = isZero
    ? "text-green-600 dark:text-green-500"
    : "text-red-600 dark:text-red-500";

  return (
    <Card className="w-full max-w-sm dark:bg-card dark:border-border gap-4">
      <CardHeader className="flex flex-row items-center gap-4">
        {isZero ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-500" />
        )}
        <CardTitle className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Incidents & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-4">
          <span className={`text-4xl font-bold ${statusColor}`}>
            {newIncidents}
          </span>
          <span className="text-xl font-semibold text-foreground">New</span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mt-3">
            <span className="font-medium text-foreground mr-1">
              {changeText}
            </span>{" "}
            vs last quarter
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentsAlertsCard;
