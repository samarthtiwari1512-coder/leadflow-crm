"use client";

import React from "react";
import { Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddNewLead?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddNewLead }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-cloud-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
        {/* Wordmark & Editorial Brand Identity */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[3px] bg-forest flex items-center justify-center text-surface border border-forest select-none">
              <span className="font-serif font-bold text-xs tracking-tight">LF</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-ink tracking-tight">LeadFlow</span>
              <span className="text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-cloud text-ink-secondary border border-cloud-border">
                CRM
              </span>
            </div>
          </div>

          {/* Editorial Divider & Context */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-cloud-border text-xs text-ink-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-forest" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-secondary">
              Pravar AI Assessment
            </span>
            <span className="text-ink-subtle">•</span>
            <span className="font-mono text-[11px] text-ink-muted">Single-Screen CRM</span>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink-secondary bg-cloud px-2.5 py-1 rounded-[3px] border border-cloud-border">
            <Shield className="w-3.5 h-3.5 text-forest" />
            <span className="font-mono text-[11px] font-medium text-ink-secondary">JSON Persistence</span>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-3.5 h-3.5" />}
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
