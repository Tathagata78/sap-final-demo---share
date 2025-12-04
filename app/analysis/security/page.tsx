import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Server, Clock } from "lucide-react";
import { SecurityEffectivenessChart } from "./components/securityEffectiveChart";
import { SecurityOverTimeChart } from "./components/securityOvertimeChart";
import { SecurityEffectiveness } from "./components/securityEffectiveness";

const SecurityAdvisor = () => {
  const lastUpdated = new Date().toLocaleString();
  const totalAssets = 1243;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-8 space-y-8">
      {/* --- Header Section --- */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          Security Advisor
        </h1>
        <p className="text-muted-foreground">
          Overview of your organization's security posture and effectiveness
          metrics.
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

      {/* --- Charts Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <SecurityEffectivenessChart />
        </div>
        <div className="w-full">
          <SecurityOverTimeChart />
        </div>
      </div>

      {/* --- Detailed Effectiveness Section --- */}
      <div className="w-full">
        <SecurityEffectiveness />
      </div>
      
    </div>
  );
};

export default SecurityAdvisor;
