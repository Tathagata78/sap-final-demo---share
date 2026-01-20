import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  Info,
  Activity,
  BellRing,
  Shield,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IncidentsBySeverity = () => {
  const severityData = [
    {
      level: "Critical",
      incidents: 3,
      alerts: 8,
      icon: ShieldAlert,
      color: "text-red-500 dark:text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor:
        "border-red-500/30 dark:border-red-500/30 hover:border-red-500 dark:hover:border-red-500",
    },
    {
      level: "High",
      incidents: 12,
      alerts: 24,
      icon: AlertTriangle,
      color: "text-yellow-500 dark:text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-600/20",
      borderColor:
        "border-yellow-500/30 dark:border-yellow-500/30 hover:border-yellow-500 dark:hover:border-yellow-500",
    },
    {
      level: "Medium",
      incidents: 45,
      alerts: 156,
      icon: AlertCircle,
      color: "text-green-500 dark:text-green-500",
      bgColor: "bg-green-50 dark:bg-green-600/20",
      borderColor:
        "border-green-500/30 dark:border-green-500/30 hover:border-green-500 dark:hover:border-green-500",
    },
    {
      level: "Low",
      incidents: 8,
      alerts: 342,
      icon: Shield,
      color: "text-blue-500 dark:text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-600/20",
      borderColor:
        "border-blue-500/30 dark:border-blue-500/30 hover:border-blue-500 dark:hover:border-blue-500",
    },
  ];

  const totalEvents = severityData.reduce(
    (acc, item) => acc + item.incidents + item.alerts,
    0
  );

  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <CardTitle className="text-xl font-bold tracking-tight">
                Incidents & Alerts by Severity
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 py-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {severityData.map((item, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-3xl bg-card text-card-foreground transition-all duration-300
                border border-r-6 border-b-6 ${item.borderColor}
              `}
            >
              <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between space-y-0">
                  <span className={`text-lg font-bold ${item.color}`}>
                    {item.level}
                  </span>
                  <div className={`p-2 rounded-full ${item.bgColor}`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <div className="text-3xl font-extrabold">
                    {item.incidents + item.alerts}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase font-medium tracking-wider">
                    Total Events
                  </span>
                </div>

                <div className="flex items-center justify-between border-t pt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.incidents}</span>
                    <span className="text-muted-foreground text-xs">
                      Incidents
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.alerts}</span>
                    <span className="text-muted-foreground text-xs">
                      Alerts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm tracking-wide text-muted-foreground px-2">
          Total {totalEvents} events detected
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentsBySeverity;
