"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MOCK_ISSUES: Record<
  string,
  Array<{ id: number; title: string; resource: string; severity: string }>
> = {
  auth: [
    {
      id: 1,
      title: "Excessive Admin Permissions",
      resource: "prod-cluster-01",
      severity: "Critical",
    },
    {
      id: 2,
      title: "MFA Disabled for Root",
      resource: "aws-main-account",
      severity: "High",
    },
    {
      id: 3,
      title: "API Key Exposed in Logs",
      resource: "payment-service",
      severity: "Critical",
    },
  ],
  config: [
    {
      id: 4,
      title: "S3 Bucket Publicly Readable",
      resource: "user-assets-backup",
      severity: "High",
    },
    {
      id: 5,
      title: "Default Port 22 Open",
      resource: "bastion-host",
      severity: "High",
    },
  ],
  code: [],
  patch: [
    {
      id: 6,
      title: "Log4j Vulnerability (CVE-2021-44228)",
      resource: "legacy-search-api",
      severity: "Critical",
    },
    {
      id: 7,
      title: "OpenSSL Heartbleed",
      resource: "vpn-gateway",
      severity: "High",
    },
  ],
};

interface CriticalityDetailDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  category: { id: string; label: string } | null;
}

export function CriticalityDetailDialog({
  isOpen,
  onClose,
  category,
}: CriticalityDetailDialogProps) {
  if (!category) return null;

  const issues = MOCK_ISSUES[category.id] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Review: {category.label}</DialogTitle>
          <DialogDescription>
            Detailed list of high criticality occurrences requiring immediate
            attention.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {issues.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start justify-between rounded-lg border p-3 bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm leading-none">
                        {issue.title}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Resource: {issue.resource}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Fix
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <CheckCircle2 className="h-10 w-10 mb-2 text-green-500 opacity-80" />
              <p className="text-sm">
                No critical issues found in this segment.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onClose(false)}>
            Close
          </Button>
          <Button onClick={() => onClose(false)}>Export Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
