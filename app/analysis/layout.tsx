"use client";

import React from "react";
import { AppSidebar } from "@/components/molecules/app-sidebar";
import { SiteHeader } from "@/components/molecules/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(15))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
