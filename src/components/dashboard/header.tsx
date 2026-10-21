"use client";

import React from "react";
import { TrendingUp, Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddNewLead?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddNewLead }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-cloud-border bg-surface/95 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Wordmark & Brand Identity */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center shadow-xs">
              <TrendingUp className="w-4 h-4 text-blue stroke-[2.5]" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-ink tracking-tight">LeadFlow</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cloud text-ink-muted border border-cloud-border">
                CRM
              </span>
            </div>
          </div>

          {/* Environment/Assessment status indicator */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-cloud-border text-xs text-ink-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Pravar AI Assessment</span>
            <span className="text-ink-subtle">•</span>
            <span className="font-mono text-[11px] text-ink-subtle">Part 2</span>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink-muted bg-cloud px-2.5 py-1.5 rounded-md border border-cloud-border">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium text-ink-secondary">JSON Storage</span>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={onAddNewLead}
            id="add-lead-header-btn"
            aria-label="Add New Lead"
          >
            <span>Add New Lead</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
