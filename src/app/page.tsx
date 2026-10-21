import { Suspense } from "react";
import { connection } from "next/server";
import { getLeads, getFollowUps, getSummaryStats } from "@/lib/db";
import { DashboardView } from "@/components/dashboard/dashboard-view";

async function DashboardContent() {
  // Opt in to dynamic request-time data within Suspense boundary
  await connection();

  const [initialLeads, initialFollowUps, initialStats] = await Promise.all([
    getLeads(),
    getFollowUps(),
    getSummaryStats(),
  ]);

  return (
    <DashboardView
      initialLeads={initialLeads}
      initialFollowUps={initialFollowUps}
      initialStats={initialStats}
    />
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cloud flex items-center justify-center p-6 text-sm text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue animate-pulse" />
            <span>Loading LeadFlow Dashboard...</span>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
