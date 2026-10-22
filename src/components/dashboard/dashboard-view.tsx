"use client";

import React, { useState, useMemo } from "react";
import { FilterStatus, Lead, FollowUpItem, SummaryStats } from "@/types/lead";
import { Header } from "@/components/dashboard/header";
import { SummaryStrip } from "@/components/dashboard/summary-strip";
import { StatusFilterBar } from "@/components/dashboard/status-filter-bar";
import { TodayFollowUps } from "@/components/dashboard/today-follow-ups";
import { LeadList } from "@/components/dashboard/lead-list";
import { LeadDetailModal } from "@/components/dashboard/lead-detail-modal";
import { AddLeadModal } from "@/components/dashboard/add-lead-modal";

interface DashboardViewProps {
  initialLeads: Lead[];
  initialFollowUps: FollowUpItem[];
  initialStats: SummaryStats;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  initialLeads,
  initialFollowUps,
  initialStats,
}) => {
  // Persistent data states
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(initialFollowUps);
  const [stats, setStats] = useState<SummaryStats>(initialStats);

  // Search and filter states
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [activeLeadModal, setActiveLeadModal] = useState<Lead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState<boolean>(false);

  // Filter leads by status and search query
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Status match
      const matchesStatus =
        selectedStatus === "All" || lead.status === selectedStatus;

      // Search match (name or company)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        lead.name.toLowerCase().includes(query) ||
        (lead.company && lead.company.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [leads, selectedStatus, searchQuery]);

  // Reset filters handler
  const handleResetFilters = () => {
    setSelectedStatus("All");
    setSearchQuery("");
  };

  // Called when a new lead is created
  const handleLeadCreated = (
    newLead: Lead,
    updatedFollowUps?: FollowUpItem[],
    updatedStats?: SummaryStats
  ) => {
    setLeads((prev) => [newLead, ...prev]);

    if (updatedFollowUps) {
      setFollowUps(updatedFollowUps);
    }
    if (updatedStats) {
      setStats(updatedStats);
    } else {
      // Recompute stats if not supplied
      setStats((prev) => ({
        ...prev,
        activeLeads: prev.activeLeads + (newLead.status !== "Lost" && newLead.status !== "Won" ? 1 : 0),
        totalLeads: (prev.totalLeads || leads.length) + 1,
      }));
    }
  };

  // Called when a lead is updated (status change or note added)
  const handleLeadUpdated = (
    updatedLead: Lead,
    updatedFollowUps?: FollowUpItem[],
    updatedStats?: SummaryStats
  ) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    );

    // Keep active modal updated
    if (activeLeadModal && activeLeadModal.id === updatedLead.id) {
      setActiveLeadModal(updatedLead);
    }

    if (updatedFollowUps) {
      setFollowUps(updatedFollowUps);
    }
    if (updatedStats) {
      setStats(updatedStats);
    }
  };

  // Select lead by ID (e.g. from follow-up card click)
  const handleSelectLeadById = (leadId: string) => {
    const found = leads.find((l) => l.id === leadId);
    if (found) {
      setActiveLeadModal(found);
    }
  };

  const isFiltered = selectedStatus !== "All" || searchQuery.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col bg-cloud text-ink font-sans">
      {/* 1. Header with brand wordmark and Add New Lead action */}
      <Header onAddNewLead={() => setIsAddLeadOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* 2. Page Introduction & Summary Strip */}
        <SummaryStrip
          stats={stats}
          totalLeadsCount={leads.length}
        />

        {/* 3. Today's Follow-ups Section */}
        <TodayFollowUps
          followUps={followUps}
          onSelectLead={handleSelectLeadById}
        />

        {/* 4. Complete Leads Pipeline Section with Status Filters and Search */}
        <section aria-labelledby="all-leads-heading" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted block mb-0.5">
                Institutional Accounts
              </span>
              <h2
                id="all-leads-heading"
                className="font-serif text-base font-bold text-ink tracking-tight"
              >
                Pipeline Opportunities
              </h2>
              <p className="text-xs text-ink-secondary">
                Filter and manage accounts currently progressing through your sales cycle
              </p>
            </div>

            {/* Status Filters Bar */}
            <StatusFilterBar
              currentFilter={selectedStatus}
              onFilterChange={setSelectedStatus}
              leads={leads}
            />
          </div>

          {/* Search Bar + Lead List Layout */}
          <LeadList
            leads={filteredLeads}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectLead={setActiveLeadModal}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
          />
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-cloud-border py-4 bg-surface text-center text-xs text-ink-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-serif font-medium text-ink">LeadFlow CRM • Editorial Portfolio Edition</span>
          <span className="font-mono text-[11px] text-ink-muted">
            Pravar AI Assessment • Part 2 Active
          </span>
        </div>
      </footer>

      {/* Modals */}
      {activeLeadModal && (
        <LeadDetailModal
          key={activeLeadModal.id}
          lead={activeLeadModal}
          onClose={() => setActiveLeadModal(null)}
          onLeadUpdated={handleLeadUpdated}
        />
      )}

      {isAddLeadOpen && (
        <AddLeadModal
          key="add-lead-modal-active"
          isOpen={isAddLeadOpen}
          onClose={() => setIsAddLeadOpen(false)}
          onLeadCreated={handleLeadCreated}
        />
      )}
    </div>
  );
};
