"use client";

import React from "react";
import { Clock, Building2, ChevronRight, CalendarDays, CheckCircle2, AlertTriangle } from "lucide-react";
import { FollowUpItem } from "@/types/lead";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TodayFollowUpsProps {
  followUps: FollowUpItem[];
  onSelectLead?: (leadId: string) => void;
}

export const TodayFollowUps: React.FC<TodayFollowUpsProps> = ({
  followUps,
  onSelectLead,
}) => {
  // Filter for today's follow-ups and all overdue follow-ups requiring attention
  const urgentFollowUps = followUps.filter((f) => f.isOverdue || f.scheduledTime.includes("Today"));

  const overdueCount = urgentFollowUps.filter((f) => f.isOverdue).length;
  const todayCount = urgentFollowUps.filter((f) => !f.isOverdue).length;

  return (
    <section
      aria-labelledby="today-followups-heading"
      className="rounded-2xl border border-cloud-border bg-white p-5 shadow-[0_1px_3px_rgba(23,36,58,0.03)]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-cloud-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-subtle text-blue flex items-center justify-center">
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="today-followups-heading"
              className="text-sm font-semibold text-ink flex items-center gap-2 flex-wrap"
            >
              <span>Today&apos;s Follow-ups &amp; Priority Actions</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cloud font-medium text-ink-muted border border-cloud-border">
                {urgentFollowUps.length} pending
              </span>
            </h2>
            <p className="text-xs text-ink-muted">
              Pinned above the pipeline. Overdue items are highlighted in red for immediate attention.
            </p>
          </div>
        </div>

        {/* Status Breakdown Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          {overdueCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-coral-subtle text-coral-dark border border-coral-border font-semibold">
              <AlertTriangle className="w-3 h-3 text-coral" />
              {overdueCount} Overdue
            </span>
          )}
          {todayCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-subtle text-blue border border-blue-border font-medium">
              <Clock className="w-3 h-3 text-blue" />
              {todayCount} Today
            </span>
          )}
        </div>
      </div>

      {/* Grid of Follow-up Cards */}
      {urgentFollowUps.length === 0 ? (
        <div className="py-6 px-4 text-center rounded-xl bg-cloud/40 border border-dashed border-cloud-border text-xs text-ink-muted flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All caught up! No overdue follow-ups or pending actions scheduled for today.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {urgentFollowUps.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectLead?.(item.leadId)}
              className={cn(
                "group relative rounded-xl p-4 border transition-all cursor-pointer select-none",
                "hover:shadow-xs",
                item.isOverdue
                  ? "bg-coral-subtle/50 border-coral text-coral-dark hover:border-coral-dark"
                  : "bg-surface border-cloud-border hover:border-slate-300"
              )}
            >
              {/* Header: Lead Name, Company, and Time / Overdue Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      "text-sm font-semibold truncate transition-colors",
                      item.isOverdue ? "text-coral-dark group-hover:underline" : "text-ink group-hover:text-blue"
                    )}>
                      {item.leadName}
                    </span>
                    {item.isOverdue ? (
                      <StatusBadge status="Overdue" size="sm" />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-muted bg-cloud px-2 py-0.5 rounded-full border border-cloud-border">
                        <Clock className="w-3 h-3 text-ink-subtle" />
                        {item.scheduledTime}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-muted truncate">
                    <Building2 className="w-3 h-3 text-ink-subtle shrink-0" />
                    <span className="truncate">{item.company}</span>
                  </div>
                </div>

                <ChevronRight className={cn(
                  "w-4 h-4 transition-all shrink-0 mt-1 group-hover:translate-x-0.5",
                  item.isOverdue ? "text-coral" : "text-ink-subtle group-hover:text-blue"
                )} />
              </div>

              {/* Action item description */}
              <div className="mt-3 pt-2.5 border-t border-cloud-border/70">
                <div className="text-xs font-medium flex items-start gap-1.5">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5",
                    item.isOverdue ? "text-coral-dark" : "text-ink-subtle"
                  )}>
                    Action:
                  </span>
                  <span className={cn(
                    "line-clamp-2 leading-relaxed",
                    item.isOverdue ? "text-coral-dark font-medium" : "text-ink-secondary"
                  )}>
                    {item.nextAction}
                  </span>
                </div>
              </div>

              {/* Latest context preview */}
              {item.notes && (
                <div className="mt-1.5 text-[11px] text-ink-muted italic truncate">
                  Latest context: {item.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
