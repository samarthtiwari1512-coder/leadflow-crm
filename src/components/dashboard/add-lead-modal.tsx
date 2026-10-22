"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Loader2,
  Plus,
} from "lucide-react";
import { Lead, LeadStatus, FollowUpItem, SummaryStats } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated: (lead: Lead, followUps?: FollowUpItem[], stats?: SummaryStats) => void;
}

const ALL_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export const AddLeadModal: React.FC<AddLeadModalProps> = ({
  isOpen,
  onClose,
  onLeadCreated,
}) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [initialNote, setInitialNote] = useState("");
  const [scheduleFollowUp, setScheduleFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpAction, setFollowUpAction] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Lead contact name is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        company: company.trim() || undefined,
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        status,
        initialNote: initialNote.trim() || undefined,
        followUpDate: scheduleFollowUp && followUpDate ? new Date(followUpDate).toISOString() : null,
        followUpAction: scheduleFollowUp ? followUpAction.trim() || initialNote.trim().slice(0, 80) : null,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create lead");
      }

      const data = await res.json();
      onLeadCreated(data.lead, data.followUps, data.stats);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error creating lead";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-lead-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Surface */}
      <div className="relative w-full max-w-lg rounded-md bg-surface border border-cloud-border shadow-xl flex flex-col z-10 overflow-hidden max-h-[90vh]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-cloud-border flex items-center justify-between bg-cloud/50 shrink-0">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted block mb-0.5">
                New Opportunity
              </span>
              <h3 id="add-lead-title" className="font-serif text-lg font-bold text-ink">
                Add New Lead
              </h3>
              <p className="text-xs text-ink-secondary">
                Create a new pipeline record for your team
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-[3px] text-ink-muted hover:text-ink hover:bg-cloud border border-transparent hover:border-cloud-border transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Lead Name (Required) */}
            <div>
              <label
                htmlFor="lead-name-input"
                className="block text-[10px] font-semibold text-ink-secondary uppercase tracking-widest mb-1.5"
              >
                Lead Contact Name <span className="text-coral">*</span>
              </label>
              <Input
                id="lead-name-input"
                placeholder="e.g. Sarah Jenkins"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="w-3.5 h-3.5 text-ink-muted" />}
                autoFocus
              />
            </div>

            {/* Company Name (Optional) */}
            <div>
              <label
                htmlFor="lead-company-input"
                className="block text-[10px] font-semibold text-ink-secondary uppercase tracking-widest mb-1.5"
              >
                Company Name <span className="text-ink-muted font-normal">(Optional)</span>
              </label>
              <Input
                id="lead-company-input"
                placeholder="e.g. Apex Global Payments"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                icon={<Building2 className="w-3.5 h-3.5 text-ink-muted" />}
              />
            </div>

            {/* Email & Phone in 2-col (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="lead-email-input"
                  className="block text-[10px] font-semibold text-ink-secondary uppercase tracking-widest mb-1.5"
                >
                  Work Email <span className="text-ink-muted font-normal">(Optional)</span>
                </label>
                <Input
                  id="lead-email-input"
                  type="email"
                  placeholder="s.jenkins@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-3.5 h-3.5 text-ink-muted" />}
                />
              </div>

              <div>
                <label
                  htmlFor="lead-phone-input"
                  className="block text-[10px] font-semibold text-ink-secondary uppercase tracking-widest mb-1.5"
                >
                  Phone Number <span className="text-ink-muted font-normal">(Optional)</span>
                </label>
                <Input
                  id="lead-phone-input"
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={<Phone className="w-3.5 h-3.5 text-ink-muted" />}
                />
              </div>
            </div>

            {/* Status Selector - Defaults to New */}
            <div>
              <label
                htmlFor="lead-status-select"
                className="block text-[10px] font-semibold text-ink-secondary uppercase tracking-widest mb-1.5"
              >
                Initial Pipeline Stage
              </label>
              <select
                id="lead-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                className="w-full h-9 rounded-[3px] border border-cloud-border bg-surface px-3 py-1.5 text-xs text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest cursor-pointer"
              >
                {ALL_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Discussion Note (Optional) */}
            <div>
              <label
                htmlFor="lead-initial-note"
                className="block text-[10px] font-semibold text-ink-secondary uppercase tracking-widest mb-1.5"
              >
                Initial Discussion Note <span className="text-ink-muted font-normal">(Optional)</span>
              </label>
              <textarea
                id="lead-initial-note"
                rows={2}
                placeholder="Meeting notes, initial lead requirements, or referral context..."
                value={initialNote}
                onChange={(e) => setInitialNote(e.target.value)}
                className="w-full rounded-[3px] border border-cloud-border bg-surface p-2.5 text-xs text-ink placeholder:text-ink-subtle outline-none focus:border-forest focus:ring-1 focus:ring-forest"
              />
            </div>

            {/* Schedule Follow-up Option */}
            <div className="pt-2 border-t border-cloud-border/70 space-y-2">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={scheduleFollowUp}
                  onChange={(e) => setScheduleFollowUp(e.target.checked)}
                  className="w-3.5 h-3.5 rounded-[2px] text-forest focus:ring-forest border-cloud-border cursor-pointer"
                />
                <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-forest" />
                  Schedule an initial follow-up date
                </span>
              </label>

              {scheduleFollowUp && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-[3px] bg-cloud/50 border border-cloud-border text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-secondary mb-1">
                      Follow-up Date &amp; Time *
                    </label>
                    <input
                      type="datetime-local"
                      required={scheduleFollowUp}
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full h-8 px-2 text-xs rounded-[3px] border border-cloud-border bg-surface text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-secondary mb-1">
                      Next Action Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Introductory discovery call"
                      value={followUpAction}
                      onChange={(e) => setFollowUpAction(e.target.value)}
                      className="w-full h-8 px-2.5 text-xs rounded-[3px] border border-cloud-border bg-surface text-ink placeholder:text-ink-subtle outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                    />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="text-xs text-coral-dark font-medium flex items-center gap-1.5 p-2 rounded-[3px] bg-coral-subtle border border-coral-border">
                <AlertCircle className="w-4 h-4 shrink-0 text-coral-dark" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3.5 border-t border-cloud-border flex items-center justify-end gap-2.5 bg-cloud/30 shrink-0">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              icon={
                isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )
              }
            >
              {isSubmitting ? "Creating..." : "Create Lead"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
