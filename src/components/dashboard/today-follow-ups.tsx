"use client";

import React from "react";
import { Clock, Building2, ChevronRight, CalendarDays, CheckCircle2, AlertTriangle } from "lucide-react";
import { FollowUpItem } from "@/types/lead";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { isToday } from "@/lib/date-utils";

interface TodayFollowUpsProps {
  followUps: FollowUpItem[];
  onSelectLead?: (leadId: string) => void;
}

export const TodayFollowUps: React.FC<TodayFollowUpsProps> = ({
  followUps,
  onSelectLead,
}) => {
  // Filter for today's follow-ups and all overdue follow-ups requiring attention
  const urgentFollowUps = followUps.filter((f) => f.isOverdue || isToday(f.rawDate));

  const overdueCount = urgentFollowUps.filter((f) => f.isOverdue).length;
  const todayCount = urgentFollowUps.filter((f) => isToday(f.rawDate)).length;

  return (
    <section
      aria-labelledby="today-followups-heading"
      className="rounded-md border border-cloud-border bg-surface p-5 shadow-[0_1px_2px_rgba(40,42,37,0.03)]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-cloud-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[3px] bg-forest-subtle text-forest border border-forest-border flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                id="today-followups-heading"
                className="font-serif text-base font-bold text-ink tracking-tight"
              >
                Today&apos;s Follow-ups &amp; Priority Actions
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] bg-cloud text-ink-secondary border border-cloud-border">
                {urgentFollowUps.length} pending
              </span>
            </div>
            <p className="text-xs text-ink-secondary mt-0.5">
              Pinned above pipeline. Overdue items are highlighted in crisp crimson for immediate attention.
            </p>
          </div>
        </div>

        {/* Status Breakdown Chips */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          {overdueCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-coral-subtle text-coral-dark border border-coral-border text-[11px] font-bold tracking-wide">
              <AlertTriangle className="w-3 h-3 text-coral-dark" />
              {overdueCount} Overdue
            </span>
          )}
          {todayCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-forest-subtle text-forest border border-forest-border text-[11px] font-semibold tracking-wide">
              <Clock className="w-3 h-3 text-forest" />
              {todayCount} Today
            </span>
          )}
        </div>
      </div>

      {/* Grid of Follow-up Cards */}
      {urgentFollowUps.length === 0 ? (
        <div className="py-6 px-4 text-center rounded-[3px] bg-cloud/50 border border-cloud-border text-xs text-ink-muted flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-forest" />
          <span>All caught up! No overdue follow-ups or pending actions scheduled for today.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {urgentFollowUps.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectLead?.(item.leadId)}
              className={cn(
                "group relative rounded-[3px] p-4 border transition-all cursor-pointer select-none",
                item.isOverdue
                  ? "bg-coral-subtle/60 border-coral-border hover:border-coral-dark"
                  : "bg-surface border-cloud-border hover:border-forest"
              )}
            >
              {/* Header: Lead Name, Company, and Time / Overdue Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "text-sm font-semibold truncate transition-colors",
                        item.isOverdue
                          ? "text-coral-dark group-hover:underline"
                          : "text-ink group-hover:text-forest"
                      )}
                    >
                      {item.leadName}
                    </span>
                    {item.isOverdue ? (
                      <StatusBadge status="Overdue" size="sm" />
                    ) : (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-ink-secondary bg-cloud px-1.5 py-0.5 rounded-[2px] border border-cloud-border">
                        <Clock className="w-3 h-3 text-ink-muted" />
                        {item.scheduledTime}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-muted truncate">
                    <Building2 className="w-3.5 h-3.5 text-ink-subtle shrink-0" />
                    <span className="truncate">{item.company}</span>
                  </div>
                </div>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 transition-all shrink-0 mt-1 group-hover:translate-x-0.5",
                    item.isOverdue ? "text-coral-dark" : "text-ink-subtle group-hover:text-forest"
                  )}
                />
              </div>

              {/* Action item description */}
              <div className="mt-3 pt-2.5 border-t border-cloud-border/70">
                <div className="text-xs font-medium flex items-start gap-1.5">
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-wider shrink-0 mt-0.5",
                      item.isOverdue ? "text-coral-dark font-bold" : "text-ink-muted"
                    )}
                  >
                    Action:
                  </span>
                  <span
                    className={cn(
                      "line-clamp-2 leading-relaxed",
                      item.isOverdue ? "text-coral-dark font-medium" : "text-ink-secondary"
                    )}
                  >
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
