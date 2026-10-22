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
      {/* Page Title & Editorial Intro */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
        <div>
          <span className="text-[10px] uppercase font-semibold tracking-widest text-ink-muted block mb-1">
            Executive Pipeline
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Lead Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-2xl">
            Track client relationships, qualify opportunities, and monitor scheduled follow-ups across your institutional accounts.
          </p>
        </div>

        {/* Database Status Tag */}
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-[3px] bg-surface border border-cloud-border text-[11px] font-mono text-ink-secondary">
          <Database className="w-3.5 h-3.5 text-forest shrink-0" />
          <span>Persistent Storage</span>
          <span className="w-1.5 h-1.5 rounded-full bg-forest" />
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Active Leads Card */}
        <div className="p-4 rounded-md bg-surface border border-cloud-border shadow-[0_1px_2px_rgba(40,42,37,0.03)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest block">
              Active Pipeline Leads
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                {stats.activeLeads}
              </span>
              <span className="text-xs text-ink-muted font-sans">
                of {totalLeadsCount} total
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-[3px] bg-forest-subtle text-forest border border-forest-border flex items-center justify-center">
            <Users className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        {/* Today's Follow-ups Card */}
        <div className="p-4 rounded-md bg-surface border border-cloud-border shadow-[0_1px_2px_rgba(40,42,37,0.03)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest block">
              Today&apos;s Follow-ups
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-forest tracking-tight">
                {stats.todayFollowUps}
              </span>
              <span className="text-xs text-forest font-medium">
                Scheduled
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-[3px] bg-sage text-forest border border-sage-border flex items-center justify-center">
            <CalendarCheck className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        {/* Overdue Follow-ups Card - Crisp Editorial Crimson */}
        <div
          className={`p-4 rounded-md border shadow-[0_1px_2px_rgba(40,42,37,0.03)] flex items-center justify-between transition-colors ${
            stats.overdueFollowUps > 0
              ? "bg-coral-subtle border-coral-border"
              : "bg-surface border-cloud-border"
          }`}
        >
          <div className="space-y-1">
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest block ${
                stats.overdueFollowUps > 0 ? "text-coral-dark" : "text-ink-muted"
              }`}
            >
              Overdue Follow-ups
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                  stats.overdueFollowUps > 0 ? "text-coral-dark" : "text-ink"
                }`}
              >
                {stats.overdueFollowUps}
              </span>
              <span
                className={`text-xs font-medium ${
                  stats.overdueFollowUps > 0 ? "text-coral-dark" : "text-ink-muted"
                }`}
              >
                {stats.overdueFollowUps === 1
                  ? "1 action required"
                  : `${stats.overdueFollowUps} actions required`}
              </span>
            </div>
          </div>
          <div
            className={`w-9 h-9 rounded-[3px] flex items-center justify-center ${
              stats.overdueFollowUps > 0
                ? "bg-coral text-surface border border-coral-dark"
                : "bg-cloud text-ink-muted border border-cloud-border"
            }`}
          >
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};
