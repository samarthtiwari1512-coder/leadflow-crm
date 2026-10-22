import React from "react";
import {
  Sparkles,
  PhoneCall,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
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
 * StatusBadge styled as a crisp, rectangular editorial tag.
 * Pairs clear iconography and accessible contrast without generic bubble pills.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  size = "md",
}) => {
  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-1.5 py-0.5 gap-1 tracking-wider"
      : "text-[11px] px-2 py-0.5 gap-1.5 tracking-wider";

  const baseClasses =
    "inline-flex items-center font-medium rounded-[2px] uppercase select-none border";

  switch (status) {
    case "New":
      return (
        <span
          className={cn(
            baseClasses,
            "border-forest-border bg-forest-subtle text-forest font-semibold",
            sizeClasses,
            className
          )}
          aria-label="Status: New Lead"
        >
          <Sparkles className="w-2.5 h-2.5 text-forest shrink-0" aria-hidden="true" />
          <span>New</span>
        </span>
      );

    case "Contacted":
      return (
        <span
          className={cn(
            baseClasses,
            "border-[#DCD6C7] bg-[#EFECE4] text-ink-secondary",
            sizeClasses,
            className
          )}
          aria-label="Status: Contacted"
        >
          <PhoneCall className="w-2.5 h-2.5 text-ink-muted shrink-0" aria-hidden="true" />
          <span>Contacted</span>
        </span>
      );

    case "Qualified":
      return (
        <span
          className={cn(
            baseClasses,
            "border-sage-border bg-sage text-forest font-semibold",
            sizeClasses,
            className
          )}
          aria-label="Status: Qualified"
        >
          <ShieldCheck className="w-2.5 h-2.5 text-forest shrink-0" aria-hidden="true" />
          <span>Qualified</span>
        </span>
      );

    case "Proposal Sent":
      return (
        <span
          className={cn(
            baseClasses,
            "border-[#E8D4B0] bg-[#F8F2E4] text-[#7A5415] font-semibold",
            sizeClasses,
            className
          )}
          aria-label="Status: Proposal Sent"
        >
          <FileCheck2 className="w-2.5 h-2.5 text-[#7A5415] shrink-0" aria-hidden="true" />
          <span>Proposal Sent</span>
        </span>
      );

    case "Won":
      // Terracotta highlight for key milestone
      return (
        <span
          className={cn(
            baseClasses,
            "border-terracotta-border bg-terracotta-subtle text-terracotta font-bold",
            sizeClasses,
            className
          )}
          aria-label="Status: Won"
        >
          <CheckCircle2 className="w-2.5 h-2.5 text-terracotta shrink-0" aria-hidden="true" />
          <span>Won</span>
        </span>
      );

    case "Lost":
      return (
        <span
          className={cn(
            baseClasses,
            "border-[#DDD7C9] bg-[#EBE7DD] text-ink-muted",
            sizeClasses,
            className
          )}
          aria-label="Status: Lost"
        >
          <XCircle className="w-2.5 h-2.5 text-ink-subtle shrink-0" aria-hidden="true" />
          <span>Lost</span>
        </span>
      );

    case "Overdue":
      // Crisp editorial crimson for urgent attention
      return (
        <span
          className={cn(
            baseClasses,
            "border-coral-border bg-coral-subtle text-coral-dark font-bold",
            sizeClasses,
            className
          )}
          aria-label="Urgent: Follow-up is Overdue"
        >
          <AlertTriangle className="w-2.5 h-2.5 text-coral-dark shrink-0" aria-hidden="true" />
          <span>Overdue</span>
        </span>
      );

    case "Today":
      return (
        <span
          className={cn(
            baseClasses,
            "border-forest-border bg-forest-subtle text-forest font-semibold",
            sizeClasses,
            className
          )}
          aria-label="Scheduled for Today"
        >
          <Clock className="w-2.5 h-2.5 text-forest shrink-0" aria-hidden="true" />
          <span>Today</span>
        </span>
      );

    default:
      return null;
  }
};
