import { NextRequest, NextResponse } from "next/server";
import { getLeadById, updateLead, getFollowUps, getSummaryStats } from "@/lib/db";
import { Lead, LeadStatus } from "@/types/lead";

const VALID_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lead = await getLeadById(id);

    if (!lead) {
      return NextResponse.json(
        { error: `Lead with ID "${id}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("GET /api/leads/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, name, company, phone, email, nextFollowUpDate, nextFollowUpAction } = body;

    // Validate status if provided
    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json(
          {
            error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
          },
          { status: 400 }
        );
      }
    }

    const updates: Partial<Lead> = {};
    if (status !== undefined) updates.status = status;
    if (name !== undefined) updates.name = name;
    if (company !== undefined) updates.company = company;
    if (phone !== undefined) updates.phone = phone;
    if (email !== undefined) updates.email = email;
    if (nextFollowUpDate !== undefined) updates.nextFollowUpDate = nextFollowUpDate;
    if (nextFollowUpAction !== undefined) updates.nextFollowUpAction = nextFollowUpAction;

    const updatedLead = await updateLead(id, updates);

    const followUps = await getFollowUps();
    const stats = await getSummaryStats();

    return NextResponse.json({
      lead: updatedLead,
      followUps,
      stats,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update lead";
    console.error("PATCH /api/leads/[id] error:", error);
    if (message.includes("not found")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
