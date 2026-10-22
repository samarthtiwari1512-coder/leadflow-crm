"use client";

import React from "react";
import { FilterStatus, Lead } from "@/types/lead";
import { cn } from "@/lib/utils";

interface StatusFilterBarProps {
  currentFilter: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  leads: Lead[];
}

const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "All" },
  { label: "New", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "Qualified", value: "Qualified" },
  { label: "Proposal Sent", value: "Proposal Sent" },
  { label: "Won", value: "Won" },
  { label: "Lost", value: "Lost" },
];

export const StatusFilterBar: React.FC<StatusFilterBarProps> = ({
  currentFilter,
  onFilterChange,
  leads,
}) => {
  // Compute counts for each status badge
  const counts: Record<FilterStatus, number> = {
    All: leads.length,
    New: leads.filter((l) => l.status === "New").length,
    Contacted: leads.filter((l) => l.status === "Contacted").length,
    Qualified: leads.filter((l) => l.status === "Qualified").length,
    "Proposal Sent": leads.filter((l) => l.status === "Proposal Sent").length,
    Won: leads.filter((l) => l.status === "Won").length,
    Lost: leads.filter((l) => l.status === "Lost").length,
  };

  return (
    <div
      role="tablist"
      aria-label="Filter leads by pipeline status"
      className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
    >
      {FILTER_OPTIONS.map((tab) => {
        const isSelected = currentFilter === tab.value;
        const count = counts[tab.value];

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onFilterChange(tab.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-[3px] whitespace-nowrap transition-colors cursor-pointer border select-none outline-none focus-visible:ring-1 focus-visible:ring-forest",
              isSelected
                ? "bg-forest text-surface border-forest font-semibold"
                : "bg-surface text-ink-secondary border-cloud-border hover:bg-cloud hover:text-ink font-medium"
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                "inline-flex items-center justify-center min-w-4.5 h-4 px-1 text-[10px] font-mono rounded-[2px]",
                isSelected
                  ? "bg-white/20 text-surface font-semibold"
                  : "bg-cloud text-ink-muted border border-cloud-border"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
