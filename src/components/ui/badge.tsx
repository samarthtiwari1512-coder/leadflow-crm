import React from "react";
import {
  Sparkles,
  PhoneCall,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { LeadStatus } from "@/types/lead";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: LeadStatus | "Overdue" | "Today";
  className?: string;
  size?: "sm" | "md";
}

/**
 * StatusBadge ensures accessibility by pairing distinctive icons and shapes
 * alongside color tokens so status is never conveyed by color alone.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  size = "md",
}) => {
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5 gap-1"
      : "text-xs px-2.5 py-1 gap-1.5";

  switch (status) {
    case "New":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium rounded-full border border-blue-border bg-blue-subtle text-blue",
            sizeClasses,
            className
          )}
          aria-label="Status: New Lead"
        >
          <Sparkles className="w-3 h-3 text-blue shrink-0" aria-hidden="true" />
          <span>New</span>
        </span>
      );

    case "Contacted":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium rounded-full border border-slate-300 bg-slate-100 text-slate-700",
            sizeClasses,
            className
          )}
          aria-label="Status: Contacted"
        >
          <PhoneCall className="w-3 h-3 text-slate-600 shrink-0" aria-hidden="true" />
          <span>Contacted</span>
        </span>
      );

    case "Qualified":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700",
            sizeClasses,
            className
          )}
          aria-label="Status: Qualified"
        >
          <ShieldCheck className="w-3 h-3 text-indigo-600 shrink-0" aria-hidden="true" />
          <span>Qualified</span>
        </span>
      );

    case "Proposal Sent":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium rounded-full border border-amber-300 bg-amber-50 text-amber-900",
            sizeClasses,
            className
          )}
          aria-label="Status: Proposal Sent"
        >
          <FileCheck2 className="w-3 h-3 text-amber-700 shrink-0" aria-hidden="true" />
          <span>Proposal Sent</span>
        </span>
      );

    case "Won":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium rounded-full border border-mint-border bg-mint text-mint-dark",
            sizeClasses,
            className
          )}
          aria-label="Status: Won"
        >
          <CheckCircle2 className="w-3 h-3 text-mint-dark shrink-0" aria-hidden="true" />
          <span>Won</span>
        </span>
      );

    case "Lost":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium rounded-full border border-slate-300 bg-slate-100 text-slate-600",
            sizeClasses,
            className
          )}
          aria-label="Status: Lost"
        >
          <XCircle className="w-3 h-3 text-slate-500 shrink-0" aria-hidden="true" />
          <span>Lost</span>
        </span>
      );

    case "Overdue":
      return (
        <span
          className={cn(
            "inline-flex items-center font-semibold rounded-full border border-coral-border bg-coral-subtle text-coral-dark",
            sizeClasses,
            className
          )}
          aria-label="Urgent: Follow-up is Overdue"
        >
          <AlertCircle className="w-3 h-3 text-coral-dark shrink-0" aria-hidden="true" />
          <span>Overdue</span>
        </span>
      );

    case "Today":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium rounded-full border border-blue-border bg-blue-subtle text-blue",
            sizeClasses,
            className
          )}
          aria-label="Scheduled for Today"
        >
          <Clock className="w-3 h-3 text-blue shrink-0" aria-hidden="true" />
          <span>Today</span>
        </span>
      );

    default:
      return null;
  }
};
