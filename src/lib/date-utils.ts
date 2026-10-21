/**
 * Date and Time Utilities for LeadFlow CRM
 * Provides consistent rules for today's, overdue, and scheduled follow-ups.
 */

export function parseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Checks whether a date string is on the current calendar day
 */
export function isToday(dateStr: string | null | undefined): boolean {
  const d = parseDate(dateStr);
  if (!d) return false;

  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Checks whether a scheduled follow-up is overdue:
 * Either the date is before today, OR it is scheduled for today but the time has passed.
 */
export function isOverdue(dateStr: string | null | undefined): boolean {
  const d = parseDate(dateStr);
  if (!d) return false;

  const now = new Date();
  return d.getTime() < now.getTime();
}

/**
 * Format relative time (e.g. "Just now", "12m ago", "3h ago", "Yesterday", "4d ago")
 */
export function formatRelativeTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "Never";
  const d = parseDate(dateStr);
  if (!d) return dateStr; // Fallback if already a friendly string

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();

  if (diffMs < 0) {
    // In the future
    const futureSec = Math.floor(Math.abs(diffMs) / 1000);
    if (futureSec < 3600) return `in ${Math.floor(futureSec / 60)}m`;
    if (futureSec < 86400) return `in ${Math.floor(futureSec / 3600)}h`;
    return `in ${Math.floor(futureSec / 86400)}d`;
  }

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Formats a follow-up date and time for badges and cards
 */
export function formatFollowUpDisplay(dateStr: string | null | undefined): string {
  const d = parseDate(dateStr);
  if (!d) return dateStr || "Unscheduled";

  const now = new Date();
  const timeStr = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday(dateStr)) {
    return isOverdue(dateStr) ? `Today, ${timeStr} (Past)` : `Today, ${timeStr}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  ) {
    return `Yesterday (Overdue)`;
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (
    d.getFullYear() === tomorrow.getFullYear() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getDate() === tomorrow.getDate()
  ) {
    return `Tomorrow, ${timeStr}`;
  }

  const monthDay = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${monthDay}, ${timeStr}${isOverdue(dateStr) ? " (Overdue)" : ""}`;
}

/**
 * Detailed timestamp for discussion notes (e.g., "Oct 21, 2026 at 02:45 PM")
 */
export function formatDetailedDateTime(dateStr: string | null | undefined): string {
  const d = parseDate(dateStr);
  if (!d) return dateStr || "";

  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
