import fs from "fs";
import path from "path";
import { Lead, DiscussionNote, FollowUpItem, SummaryStats, LeadStatus } from "@/types/lead";
import { SEED_LEADS } from "@/data/seed-leads";
import { isToday, isOverdue, formatFollowUpDisplay } from "@/lib/date-utils";

const DB_DIR_NAME = "data";
const DB_FILE_NAME = "leads.json";

function getDbFilePath(): string {
  return path.join(process.cwd(), DB_DIR_NAME, DB_FILE_NAME);
}

/**
 * Initializes and reads the persistent JSON database.
 * Seeds with realistic enterprise leads if the file is absent.
 */
function readDb(): Lead[] {
  const filePath = getDbFilePath();
  const dirPath = path.dirname(filePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    // Seed database on first run
    saveDb(SEED_LEADS);
    return JSON.parse(JSON.stringify(SEED_LEADS));
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    if (!raw.trim()) {
      saveDb(SEED_LEADS);
      return JSON.parse(JSON.stringify(SEED_LEADS));
    }
    const data: Lead[] = JSON.parse(raw);
    return data;
  } catch (error) {
    console.error("Error reading leads database, resetting with seed data:", error);
    saveDb(SEED_LEADS);
    return JSON.parse(JSON.stringify(SEED_LEADS));
  }
}

/**
 * Atomically writes data to the JSON database
 */
function saveDb(leads: Lead[]): void {
  const filePath = getDbFilePath();
  const dirPath = path.dirname(filePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(7)}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(leads, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
}

/**
 * Sorts notes in reverse chronological order (newest first)
 */
function sortNotesDesc(notes?: DiscussionNote[]): DiscussionNote[] {
  if (!notes) return [];
  return [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Get all leads with notes sorted in reverse chronological order
 */
export async function getLeads(): Promise<Lead[]> {
  const leads = readDb();
  return leads.map((lead) => ({
    ...lead,
    notes: sortNotesDesc(lead.notes),
  }));
}

/**
 * Get single lead by ID
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  const leads = readDb();
  const found = leads.find((l) => l.id === id);
  if (!found) return null;

  return {
    ...found,
    notes: sortNotesDesc(found.notes),
  };
}

/**
 * Create a new lead
 * Core requirements: name required, optional company and phone, status defaulting to New
 */
export async function createLead(data: {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  status?: LeadStatus;
  initialNote?: string;
  followUpDate?: string | null;
  followUpAction?: string | null;
}): Promise<Lead> {
  if (!data.name || !data.name.trim()) {
    throw new Error("Lead contact name is required");
  }

  const leads = readDb();
  const nowIso = new Date().toISOString();
  const leadId = `lead-${Date.now()}`;

  const notes: DiscussionNote[] = [];
  if (data.initialNote && data.initialNote.trim()) {
    notes.push({
      id: `note-${Date.now()}`,
      leadId,
      content: data.initialNote.trim(),
      createdAt: nowIso,
      followUpDate: data.followUpDate || null,
      followUpAction: data.followUpAction || null,
      author: "Sales Rep",
    });
  }

  const newLead: Lead = {
    id: leadId,
    name: data.name.trim(),
    company: data.company?.trim() || "Independent / Unspecified",
    phone: data.phone?.trim() || undefined,
    email: data.email?.trim() || `${data.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    status: data.status || "New", // Status defaults to New
    lastDiscussionNote: data.initialNote?.trim() || "Lead created in LeadFlow CRM.",
    lastContactedAt: nowIso,
    createdAt: nowIso,
    nextFollowUpDate: data.followUpDate || null,
    nextFollowUpAction: data.followUpAction || null,
    notes,
  };

  leads.unshift(newLead);
  saveDb(leads);

  return newLead;
}

/**
 * Update an existing lead's fields (e.g. status)
 */
export async function updateLead(
  id: string,
  updates: Partial<Pick<Lead, "status" | "name" | "company" | "phone" | "email" | "nextFollowUpDate" | "nextFollowUpAction">>
): Promise<Lead> {
  const leads = readDb();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) {
    throw new Error(`Lead with ID "${id}" not found`);
  }

  const existing = leads[index];
  const cleanedUpdates = Object.fromEntries(
    Object.entries(updates).filter(([, v]) => v !== undefined)
  );
  const updated: Lead = {
    ...existing,
    ...cleanedUpdates,
  };

  leads[index] = updated;
  saveDb(leads);

  return {
    ...updated,
    notes: sortNotesDesc(updated.notes),
  };
}

/**
 * Add a discussion note to a lead and optionally set a follow-up
 */
export async function addDiscussionNote(
  leadId: string,
  data: {
    content: string;
    followUpDate?: string | null;
    followUpAction?: string | null;
    author?: string;
  }
): Promise<Lead> {
  if (!data.content || !data.content.trim()) {
    throw new Error("Discussion note content cannot be empty");
  }

  const leads = readDb();
  const index = leads.findIndex((l) => l.id === leadId);
  if (index === -1) {
    throw new Error(`Lead with ID "${leadId}" not found`);
  }

  const lead = leads[index];
  const nowIso = new Date().toISOString();

  const newNote: DiscussionNote = {
    id: `note-${Date.now()}`,
    leadId,
    content: data.content.trim(),
    createdAt: nowIso,
    followUpDate: data.followUpDate || null,
    followUpAction: data.followUpAction || null,
    author: data.author || "Sales Rep",
  };

  const updatedNotes = [newNote, ...(lead.notes || [])];

  lead.notes = updatedNotes;
  lead.lastContactedAt = nowIso;
  lead.lastDiscussionNote = data.content.trim();

  // If follow-up date is provided, update the lead's next follow-up
  if (data.followUpDate) {
    lead.nextFollowUpDate = data.followUpDate;
    lead.nextFollowUpAction = data.followUpAction || data.content.trim().slice(0, 80);
  }

  leads[index] = lead;
  saveDb(leads);

  return {
    ...lead,
    notes: sortNotesDesc(lead.notes),
  };
}

/**
 * Get all active follow-up items across all leads
 * Sorted: Overdue items first (urgency), then today's items, then future
 */
export async function getFollowUps(): Promise<FollowUpItem[]> {
  const leads = readDb();
  const items: FollowUpItem[] = [];

  for (const lead of leads) {
    // Check lead's nextFollowUpDate
    if (lead.nextFollowUpDate) {
      items.push({
        id: `fu-${lead.id}`,
        leadId: lead.id,
        leadName: lead.name,
        company: lead.company || "Independent",
        nextAction: lead.nextFollowUpAction || "Follow-up discussion",
        scheduledTime: formatFollowUpDisplay(lead.nextFollowUpDate),
        rawDate: lead.nextFollowUpDate,
        isOverdue: isOverdue(lead.nextFollowUpDate),
        notes: lead.lastDiscussionNote,
      });
    }
  }

  // Sort by urgency: Overdue first, then soonest date
  return items.sort((a, b) => {
    if (a.isOverdue && !b.isOverdue) return -1;
    if (!a.isOverdue && b.isOverdue) return 1;
    const timeA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const timeB = b.rawDate ? new Date(b.rawDate).getTime() : 0;
    return timeA - timeB;
  });
}

/**
 * Get summary stats for the dashboard summary strip
 */
export async function getSummaryStats(): Promise<SummaryStats> {
  const leads = readDb();
  const followUps = await getFollowUps();

  const activeLeads = leads.filter(
    (l) => l.status !== "Lost" && l.status !== "Won"
  ).length;

  const todayFollowUps = followUps.filter((f) => isToday(f.rawDate)).length;
  const overdueFollowUps = followUps.filter((f) => f.isOverdue).length;

  return {
    activeLeads,
    todayFollowUps,
    overdueFollowUps,
    totalLeads: leads.length,
  };
}
