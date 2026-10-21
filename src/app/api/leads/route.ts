import { NextRequest, NextResponse } from "next/server";
import { getLeads, createLead, getFollowUps, getSummaryStats } from "@/lib/db";
import { LeadStatus } from "@/types/lead";

const VALID_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const queryParam = searchParams.get("q")?.toLowerCase().trim();

    let leads = await getLeads();

    if (statusParam && statusParam !== "All") {
      leads = leads.filter((l) => l.status === statusParam);
    }

    if (queryParam) {
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(queryParam) ||
          (l.company && l.company.toLowerCase().includes(queryParam))
      );
    }

    const followUps = await getFollowUps();
    const stats = await getSummaryStats();

    return NextResponse.json({
      leads,
      followUps,
      stats,
    });
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      company,
      phone,
      email,
      status,
      initialNote,
      followUpDate,
      followUpAction,
    } = body;

    // Requirement: Required name
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Lead contact name is required" },
        { status: 400 }
      );
    }

    // Validate status if provided
    let leadStatus: LeadStatus = "New";
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json(
          {
            error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
          },
          { status: 400 }
        );
      }
      leadStatus = status;
    }

    const createdLead = await createLead({
      name,
      company,
      phone,
      email,
      status: leadStatus,
      initialNote,
      followUpDate,
      followUpAction,
    });

    const followUps = await getFollowUps();
    const stats = await getSummaryStats();

    return NextResponse.json(
      {
        lead: createdLead,
        followUps,
        stats,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create lead";
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
