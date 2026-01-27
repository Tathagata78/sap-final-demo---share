"use client";

import { useState } from "react";
import SearchFilter from "../atoms/search-filter";
import { SystemCard, SystemStatus } from "../cards/SystemCard";
import { Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FilterType = "" | "critical" | "protected" | "warning";

const systemsData = [
  {
    title: "SAP ECC 6.0",
    status: "Critical" as SystemStatus,
    version: "ECC 6.0 EHP8",
    vulnerabilities: 5,
    lastPatch: "2024-01-15",
  },
  {
    title: "Oracle Database 19c",
    status: "Critical" as SystemStatus,
    version: "19.3.0.0",
    vulnerabilities: 12,
    lastPatch: "2023-11-20",
  },
  {
    title: "Salesforce CRM",
    status: "Warning" as SystemStatus,
    version: "Spring '24",
    vulnerabilities: 1,
    lastPatch: "2024-02-15",
  },
  {
    title: "Kubernetes Cluster (Prod)",
    status: "Warning" as SystemStatus,
    version: "v1.28.4",
    vulnerabilities: 3,
    lastPatch: "2024-01-05",
  },
  {
    title: "Okta Identity Provider",
    status: "Protected" as SystemStatus,
    version: "SaaS",
    vulnerabilities: 0,
    lastPatch: "N/A",
  },
  {
    title: "Legacy File Server",
    status: "Critical" as SystemStatus,
    version: "Win Server 2012",
    vulnerabilities: 24,
    lastPatch: "2023-06-12",
  },
  {
    title: "Jira Data Center",
    status: "Warning" as SystemStatus,
    version: "9.12.0 LTS",
    vulnerabilities: 2,
    lastPatch: "2024-01-30",
  },
  {
    title: "AWS RDS PostgreSQL",
    status: "Protected" as SystemStatus,
    version: "15.5",
    vulnerabilities: 0,
    lastPatch: "2024-03-01",
  },
];

const SystemDashboardSection = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("");

  const filtered = systemsData.filter((sys) => {
    const statusMatches =
      filter === "" || sys.status.toLowerCase() === filter.toLowerCase();
    const q = search.trim().toLowerCase();
    const searchMatches =
      q === "" ||
      sys.title.toLowerCase().includes(q) ||
      sys.version.toLowerCase().includes(q);
    return statusMatches && searchMatches;
  });

  return (
    <div className="w-full mx-auto">
      <Card className="shadow-none gap-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <CardTitle className="text-xl font-semibold leading-none tracking-wide uppercase">
              Total Systems
            </CardTitle>
          </div>
          <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-1.5">
            Real-time overview of system health, patch compliance, and
            vulnerability status across your landscape.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 space-y-6 pt-2">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {filtered.map((system) => (
                <SystemCard
                  key={system.title}
                  title={system.title}
                  status={system.status}
                  version={system.version}
                  vulnerabilities={system.vulnerabilities}
                  lastPatch={system.lastPatch}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500 dark:text-zinc-400">
              <Database className="h-10 w-10 mb-3 opacity-20" />
              <p>No systems found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDashboardSection;
