export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Won"
  | "Lost";

export type FilterStatus = "All" | LeadStatus;

export interface DiscussionNote {
  id: string;
  leadId: string;
  content: string;
  createdAt: string; // ISO 8601 string
  followUpDate?: string | null; // ISO string or datetime-local
  followUpAction?: string | null; // Context on next step
  author?: string;
}

export interface Lead {
  id: string;
  name: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  dealValue?: string;
  lastDiscussionNote?: string;
  lastContactedAt: string;
  createdAt: string;
  tags?: string[];
  notes?: DiscussionNote[];
  nextFollowUpDate?: string | null;
  nextFollowUpAction?: string | null;
}

export interface FollowUpItem {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  nextAction: string;
  scheduledTime: string;
  rawDate?: string; // ISO string for precise comparison
  isOverdue: boolean;
  notes?: string;
}

export interface SummaryStats {
  activeLeads: number;
  todayFollowUps: number;
  overdueFollowUps: number;
  totalLeads?: number;
}
