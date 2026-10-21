import React from "react";
import { Users, CalendarCheck, AlertTriangle, Database } from "lucide-react";
import { SummaryStats } from "@/types/lead";

interface SummaryStripProps {
  stats: SummaryStats;
  totalLeadsCount: number;
}

export const SummaryStrip: React.FC<SummaryStripProps> = ({
  stats,
  totalLeadsCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Page Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Lead Management
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Track customer interactions, qualify opportunities, and monitor scheduled follow-ups across your pipeline.
          </p>
        </div>

        {/* Database Status Tag */}
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-md bg-cloud border border-cloud-border text-[11px] font-medium text-ink-muted">
          <Database className="w-3.5 h-3.5 text-blue shrink-0" />
          <span>Persistent Storage Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Summary Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Active Leads Card */}
        <div className="p-4 rounded-xl bg-surface border border-cloud-border shadow-[0_1px_2px_rgba(23,36,58,0.03)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">
              Active Pipeline Leads
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-ink tracking-tight">
                {stats.activeLeads}
              </span>
              <span className="text-xs text-ink-muted">
                of {totalLeadsCount} total
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-subtle text-blue flex items-center justify-center">
            <Users className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {/* Today's Follow-ups Card */}
        <div className="p-4 rounded-xl bg-surface border border-cloud-border shadow-[0_1px_2px_rgba(23,36,58,0.03)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">
              Today&apos;s Follow-ups
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-ink tracking-tight">
                {stats.todayFollowUps}
              </span>
              <span className="text-xs text-emerald-600 font-medium">
                Scheduled
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-mint text-mint-dark flex items-center justify-center">
            <CalendarCheck className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {/* Overdue Follow-ups Card - Coral Accent Reserved for Genuinely Overdue */}
        <div
          className={`p-4 rounded-xl border shadow-[0_1px_2px_rgba(23,36,58,0.03)] flex items-center justify-between transition-colors ${
            stats.overdueFollowUps > 0
              ? "bg-coral-subtle/50 border-coral-border"
              : "bg-surface border-cloud-border"
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-medium text-coral-dark uppercase tracking-wider">
              Overdue Follow-ups
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-coral-dark tracking-tight">
                {stats.overdueFollowUps}
              </span>
              <span className="text-xs text-coral-dark font-medium">
                {stats.overdueFollowUps === 1 ? "1 action required" : `${stats.overdueFollowUps} actions required`}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-coral text-white flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};
