import { NextRequest, NextResponse } from "next/server";
import { addDiscussionNote, getFollowUps, getSummaryStats } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content, followUpDate, followUpAction, author } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Discussion note content cannot be empty" },
        { status: 400 }
      );
    }

    const updatedLead = await addDiscussionNote(id, {
      content,
      followUpDate: followUpDate || null,
      followUpAction: followUpAction || null,
      author,
    });

    const followUps = await getFollowUps();
    const stats = await getSummaryStats();

    return NextResponse.json(
      {
        lead: updatedLead,
        followUps,
        stats,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to add discussion note";
    console.error("POST /api/leads/[id]/notes error:", error);
    if (message.includes("not found")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
