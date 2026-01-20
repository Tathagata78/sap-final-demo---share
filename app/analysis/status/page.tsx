import { Button } from "@/components/ui/button";
import { Download, Server, Clock, TrendingUpDown } from "lucide-react";
import StatusInventory from "./components/statusInventory";
import IssueTrendChart from "./components/issueTrendChart";
import IncidentsAlertsCard from "./components/incedentsAlert";
import IssueOccurrencesCard from "./components/issueOccurences";
import ComplianceJobTable from "./components/compliance/complianceTable";
import AssessmentJobTable from "./components/assessment/assessmentTable";
import IncidentsBySeverity from "./components/incidentsSeverity";

const StatusTrends = () => {
  const lastUpdated = new Date().toLocaleString();
  const totalAssets = 1608;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground px-2 py-4 space-y-4">
      {/* --- Header Section --- */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <TrendingUpDown className="h-8 w-8 text-primary" />
          Status and Trends
        </h1>
        <p className="text-muted-foreground">
          Overview of your organization's status analysis and trending metrics.
        </p>
      </div>

      {/* --- Stats & Action Bar --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg bg-card shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium">{lastUpdated}</span>
          </div>

          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total Assets:</span>
            <span className="font-medium">{totalAssets.toLocaleString()}</span>
          </div>
        </div>

        <div>
          <Button variant="outline" className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* --- Main Dashboard Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 h-full">
          <StatusInventory />
        </div>
        <div className="lg:col-span-3 h-full">
          <IssueTrendChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 h-full">
          <IncidentsAlertsCard newIncidents={4} />
        </div>
        <div className="lg:col-span-3 h-full">
          <IssueOccurrencesCard />
        </div>
      </div>

      {/* --- Compliance Jobs Section --- */}
      <div className="w-full">
        <ComplianceJobTable />
      </div>

      {/* --- Assessment Jobs Section --- */}
      <div className="w-full">
        <AssessmentJobTable />
      </div>

      {/* --- Severity Status Section --- */}
      <div className="w-full">
        <IncidentsBySeverity />
      </div>
    </div>
  );
};

export default StatusTrends;
