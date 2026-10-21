"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Calendar,
  Send,
  AlertCircle,
  CalendarCheck,
  Check,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Lead, LeadStatus, FollowUpItem, SummaryStats } from "@/types/lead";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDetailedDateTime, formatRelativeTime, formatFollowUpDisplay, isOverdue } from "@/lib/date-utils";

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onLeadUpdated: (lead: Lead, followUps?: FollowUpItem[], stats?: SummaryStats) => void;
}

const ALL_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onLeadUpdated,
}) => {
  // Local form state for adding a discussion note
  const [noteContent, setNoteContent] = useState("");
  const [scheduleFollowUp, setScheduleFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpAction, setFollowUpAction] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  // Status updating state
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (lead) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lead, onClose]);

  if (!lead) return null;

  // Handle status update
  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (newStatus === lead.status || isUpdatingStatus) return;

    setIsUpdatingStatus(true);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      const data = await res.json();
      onLeadUpdated(data.lead, data.followUps, data.stats);
      setStatusMessage(`Status updated to ${newStatus}`);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating status";
      setStatusMessage(`Error: ${message}`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle adding a new discussion note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) {
      setNoteError("Please enter a discussion note.");
      return;
    }

    setIsSubmittingNote(true);
    setNoteError(null);

    try {
      const payload = {
        content: noteContent.trim(),
        followUpDate: scheduleFollowUp && followUpDate ? new Date(followUpDate).toISOString() : null,
        followUpAction: scheduleFollowUp ? followUpAction.trim() || noteContent.trim().slice(0, 80) : null,
      };

      const res = await fetch(`/api/leads/${lead.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add discussion note");
      }

      const data = await res.json();
      onLeadUpdated(data.lead, data.followUps, data.stats);

      // Clear note form
      setNoteContent("");
      setScheduleFollowUp(false);
      setFollowUpDate("");
      setFollowUpAction("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving discussion note";
      setNoteError(message);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const hasNextFollowUp = Boolean(lead.nextFollowUpDate);
  const followUpIsOverdue = hasNextFollowUp && isOverdue(lead.nextFollowUpDate);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-surface border border-cloud-border shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-cloud-border bg-cloud/50 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3
                  id="lead-modal-title"
                  className="text-lg font-bold text-ink tracking-tight truncate"
                >
                  {lead.name}
                </h3>
                <StatusBadge status={lead.status} size="sm" />
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-ink-muted flex-wrap">
                <div className="flex items-center gap-1 text-ink-secondary font-medium">
                  <Building2 className="w-3.5 h-3.5 text-ink-subtle shrink-0" />
                  <span>{lead.company || "Independent"}</span>
                </div>
                {lead.role && <span>• {lead.role}</span>}
                {lead.dealValue && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-ink">{lead.dealValue}</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-ink-subtle hover:text-ink hover:bg-cloud border border-transparent hover:border-cloud-border transition-colors cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Change Selector & Next Follow-up Pill */}
          <div className="mt-4 pt-3 border-t border-cloud-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Status Selector */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="lead-stage-select"
                className="text-xs font-semibold text-ink uppercase tracking-wider shrink-0"
              >
                Pipeline Stage:
              </label>
              <div className="relative inline-flex items-center">
                <select
                  id="lead-stage-select"
                  value={lead.status}
                  disabled={isUpdatingStatus}
                  onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                  className="h-8 pl-2.5 pr-8 text-xs font-semibold rounded-md border border-cloud-border bg-surface text-ink outline-none hover:border-slate-300 focus:border-blue focus:ring-2 focus:ring-blue/15 disabled:opacity-50 cursor-pointer"
                >
                  {ALL_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {isUpdatingStatus && (
                  <Loader2 className="w-3.5 h-3.5 text-blue animate-spin absolute right-2 pointer-events-none" />
                )}
              </div>
              {statusMessage && (
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {statusMessage}
                </span>
              )}
            </div>

            {/* Next Follow-up Indicator */}
            {hasNextFollowUp && (
              <div
                className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border ${
                  followUpIsOverdue
                    ? "bg-coral-subtle border-coral-border text-coral-dark font-medium"
                    : "bg-blue-subtle/70 border-blue-border text-blue"
                }`}
              >
                {followUpIsOverdue ? (
                  <AlertCircle className="w-3.5 h-3.5 text-coral shrink-0" />
                ) : (
                  <CalendarCheck className="w-3.5 h-3.5 text-blue shrink-0" />
                )}
                <span>
                  Next Follow-up: <strong>{formatFollowUpDisplay(lead.nextFollowUpDate)}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Contact Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-cloud/40 border border-cloud-border text-xs">
            <div className="flex items-center gap-2 text-ink-secondary truncate">
              <Mail className="w-3.5 h-3.5 text-ink-subtle shrink-0" />
              <span className="text-ink-muted">Email:</span>
              <a
                href={`mailto:${lead.email}`}
                className="font-mono text-ink hover:text-blue hover:underline truncate"
              >
                {lead.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-ink-secondary truncate">
              <Phone className="w-3.5 h-3.5 text-ink-subtle shrink-0" />
              <span className="text-ink-muted">Phone:</span>
              <span className="font-mono text-ink">
                {lead.phone || "Not provided"}
              </span>
            </div>
          </div>

          {/* Add New Discussion Note Form */}
          <section
            aria-labelledby="add-note-heading"
            className="rounded-xl border border-cloud-border bg-surface p-4 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4
                id="add-note-heading"
                className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue" />
                Add Discussion Note
              </h4>
              <span className="text-[11px] text-ink-subtle">
                Updates timeline and last activity
              </span>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Log notes from meeting, phone call, or email exchange..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full rounded-lg border border-cloud-border bg-cloud/30 p-2.5 text-xs text-ink placeholder:text-ink-subtle outline-none focus:bg-surface focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all resize-y"
              />

              {/* Schedule Follow-up Toggle */}
              <div className="pt-1 border-t border-cloud-border/70 space-y-2.5">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={scheduleFollowUp}
                    onChange={(e) => setScheduleFollowUp(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-blue focus:ring-blue border-cloud-border"
                  />
                  <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue" />
                    Schedule next follow-up with this note
                  </span>
                </label>

                {scheduleFollowUp && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-lg bg-cloud/50 border border-cloud-border text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-ink-secondary mb-1">
                        Follow-up Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        required={scheduleFollowUp}
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full h-8 px-2 text-xs rounded-md border border-cloud-border bg-surface text-ink outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ink-secondary mb-1">
                        Next Action / Commitment
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Deliver revised contract SLA"
                        value={followUpAction}
                        onChange={(e) => setFollowUpAction(e.target.value)}
                        className="w-full h-8 px-2.5 text-xs rounded-md border border-cloud-border bg-surface text-ink placeholder:text-ink-subtle outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                      />
                    </div>
                  </div>
                )}
              </div>

              {noteError && (
                <div className="text-xs text-coral-dark font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {noteError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmittingNote}
                  icon={
                    isSubmittingNote ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )
                  }
                >
                  {isSubmittingNote ? "Saving Note..." : "Save Discussion Note"}
                </Button>
              </div>
            </form>
          </section>

          {/* Discussion Timeline (Reverse Chronological Order) */}
          <section aria-labelledby="timeline-heading" className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-cloud-border">
              <h4
                id="timeline-heading"
                className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-ink-subtle" />
                Discussion Timeline ({lead.notes?.length || 0})
              </h4>
              <span className="text-[11px] text-ink-subtle">
                Reverse chronological (newest first)
              </span>
            </div>

            {!lead.notes || lead.notes.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-cloud-border text-xs text-ink-muted">
                No discussion notes recorded yet. Add the first note above.
              </div>
            ) : (
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-cloud-border">
                {lead.notes.map((note, index) => (
                  <div key={note.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <div
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-surface flex items-center justify-center transition-colors ${
                        index === 0
                          ? "border-blue ring-2 ring-blue/20"
                          : "border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === 0 ? "bg-blue" : "bg-slate-400"
                        }`}
                      />
                    </div>

                    {/* Timeline Note Card */}
                    <div className="p-3.5 rounded-xl border border-cloud-border bg-surface shadow-xs space-y-2 group-hover:border-slate-300 transition-colors">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-ink">
                          {note.author || "Sales Rep"}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                          <span>{formatDetailedDateTime(note.createdAt)}</span>
                          <span>•</span>
                          <span className="font-medium text-ink-secondary">
                            {formatRelativeTime(note.createdAt)}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-ink leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>

                      {/* Attached Follow-up Badge if scheduled with this note */}
                      {note.followUpDate && (
                        <div className="mt-2 pt-2 border-t border-cloud-border/60 flex items-center gap-2 flex-wrap text-[11px]">
                          <span className="inline-flex items-center gap-1 font-semibold text-blue bg-blue-subtle px-2 py-0.5 rounded-md border border-blue-border">
                            <CalendarCheck className="w-3 h-3" />
                            Scheduled: {formatFollowUpDisplay(note.followUpDate)}
                          </span>
                          {note.followUpAction && (
                            <span className="text-ink-secondary flex items-center gap-1">
                              <ArrowRight className="w-3 h-3 text-ink-subtle" />
                              {note.followUpAction}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-cloud-border flex items-center justify-between bg-cloud/30 shrink-0">
          <span className="text-[11px] text-ink-muted">
            All updates persist to the database immediately.
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
