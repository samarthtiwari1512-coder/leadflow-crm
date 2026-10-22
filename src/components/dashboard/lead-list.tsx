"use client";

import React from "react";
import {
  Search,
  Building2,
  Clock,
  ChevronRight,
  FilterX,
  MessageSquare,
  ArrowUpDown,
} from "lucide-react";
import { Lead } from "@/types/lead";
import { StatusBadge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/date-utils";

interface LeadListProps {
  leads: Lead[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectLead: (lead: Lead) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export const LeadList: React.FC<LeadListProps> = ({
  leads,
  searchQuery,
  onSearchChange,
  onSelectLead,
  onResetFilters,
  isFiltered,
}) => {
  return (
    <div className="space-y-3.5">
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input for lead names */}
        <div className="w-full sm:max-w-md">
          <Input
            id="lead-search-input"
            type="search"
            placeholder="Search leads by contact name or company..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="w-4 h-4 text-ink-muted" aria-hidden="true" />}
            aria-label="Search leads"
          />
        </div>

        {/* Counter and sorting indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-ink-muted">
          <span>
            Showing <strong className="text-ink font-semibold">{leads.length}</strong> {leads.length === 1 ? "lead" : "leads"}
          </span>
          <div className="h-3 w-px bg-cloud-border hidden sm:block" />
          <span className="inline-flex items-center gap-1 text-[11px] text-ink-secondary">
            <ArrowUpDown className="w-3 h-3 text-ink-muted" />
            Sorted by recent activity
          </span>
        </div>
      </div>

      {/* Main Leads Container */}
      {leads.length === 0 ? (
        /* Empty State */
        <div className="rounded-md border border-cloud-border bg-surface p-12 text-center shadow-[0_1px_2px_rgba(40,42,37,0.03)]">
          <div className="mx-auto w-10 h-10 rounded-[3px] bg-cloud border border-cloud-border flex items-center justify-center text-ink-muted mb-3">
            <FilterX className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-ink">
            No leads match your criteria
          </h3>
          <p className="mt-1 text-xs text-ink-muted max-w-sm mx-auto">
            {searchQuery
              ? `We couldn't find any leads matching "${searchQuery}". Try checking the spelling or resetting your filters.`
              : "No leads found in this pipeline stage."}
          </p>
          {isFiltered && (
            <div className="mt-4">
              <Button variant="secondary" size="sm" onClick={onResetFilters}>
                Reset all filters
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Lead List / Table Layout */
        <div className="rounded-md border border-cloud-border bg-surface shadow-[0_1px_2px_rgba(40,42,37,0.03)] overflow-hidden divide-y divide-cloud-border">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-2.5 bg-cloud/60 border-b border-cloud-border text-[10px] font-semibold uppercase tracking-widest text-ink-muted select-none">
            <div className="col-span-4">Contact &amp; Organization</div>
            <div className="col-span-5">Latest Context &amp; Notes</div>
            <div className="col-span-3 text-right">Last Activity</div>
          </div>

          {leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => onSelectLead(lead)}
              className="group p-4 sm:px-5 sm:py-4 hover:bg-cloud/40 transition-colors cursor-pointer select-none"
            >
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 lg:items-center">
                {/* Left side: Contact Name, Company & Status */}
                <div className="min-w-0 lg:col-span-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-ink group-hover:text-forest transition-colors">
                      {lead.name}
                    </h3>
                    <StatusBadge status={lead.status} size="sm" />
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 text-xs text-ink-muted">
                    <Building2 className="w-3.5 h-3.5 text-ink-subtle shrink-0" />
                    <span
                      className="font-medium text-ink-secondary truncate"
                      title={lead.company}
                    >
                      {lead.company}
                    </span>
                    {lead.role && (
                      <span className="hidden sm:inline text-ink-muted truncate">
                        • {lead.role}
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle: Last Discussion Note */}
                <div className="min-w-0 lg:col-span-5">
                  <div className="flex items-start gap-2 bg-cloud/40 rounded-[2px] p-2.5 border border-cloud-border/70">
                    <MessageSquare className="w-3.5 h-3.5 text-ink-muted shrink-0 mt-0.5" />
                    <div className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                      <span className="font-semibold text-ink text-[10px] uppercase tracking-wider mr-1">
                        Latest:
                      </span>
                      {lead.lastDiscussionNote}
                    </div>
                  </div>
                </div>

                {/* Right side: Activity time & navigation chevron */}
                <div className="flex items-center justify-between lg:justify-end gap-3 lg:col-span-3 pt-1 lg:pt-0 border-t lg:border-t-0 border-cloud-border/50">
                  <div className="flex items-center gap-1 text-xs text-ink-muted font-mono">
                    <Clock className="w-3 h-3 text-ink-subtle" />
                    <span>{formatRelativeTime(lead.lastContactedAt)}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-forest opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
