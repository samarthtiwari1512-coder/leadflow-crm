import { Lead, FollowUpItem } from "@/types/lead";

/**
 * TEMPORARY SAMPLE DATA (PART 1)
 * Clearly identified mock data representing realistic enterprise fintech leads.
 * Note: Database persistence and API endpoints will be added in Part 2.
 */
export const SAMPLE_DATA_NOTICE =
  "Demo environment: Showing temporary sample leads for UI evaluation. No database connected yet.";

export const SAMPLE_FOLLOW_UPS: FollowUpItem[] = [
  {
    id: "fu-1",
    leadId: "lead-2",
    leadName: "Marcus Vance",
    company: "Northfield Capital Partners",
    nextAction: "Deliver revised pilot pricing proposal with tiered SLA terms",
    scheduledTime: "11:30 AM Today",
    isOverdue: false,
    notes: "Marcus mentioned Friday board review",
  },
  {
    id: "fu-2",
    leadId: "lead-3",
    leadName: "Priya Deshmukh",
    company: "PayBridge Global Solutions",
    nextAction: "Send sandbox API credentials & webhook architecture guide",
    scheduledTime: "02:15 PM Today",
    isOverdue: false,
    notes: "Developer team waiting to test LatAm KYC flow",
  },
  {
    id: "fu-3",
    leadId: "lead-4",
    leadName: "Julian Thorne",
    company: "Crestview Asset Management",
    nextAction: "Security review call regarding offshore fund data custody",
    scheduledTime: "Yesterday (Overdue)",
    isOverdue: true, // Reserve Coral for genuinely overdue items
    notes: "Missed scheduled sync due to conflicting audit meeting",
  },
  {
    id: "fu-4",
    leadId: "lead-6",
    leadName: "David Kalu",
    company: "Sterling Meridian Bank & Trust International",
    nextAction: "Legal sync with VP of Compliance on MSA liability clause",
    scheduledTime: "04:45 PM Today",
    isOverdue: false,
    notes: "Final stage before executive sign-off",
  },
];

export const SAMPLE_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Elena Rostova",
    company: "Apex Ledger Technologies",
    role: "VP of Treasury Systems",
    email: "elena.rostova@apexledger.io",
    phone: "+1 (555) 234-8901",
    status: "Qualified",
    dealValue: "$95,000 / yr",
    lastDiscussionNote:
      "Reviewed automated multi-currency reconciliation corridors. Requested our SOC 2 Type II compliance audit packet and FedNow settlement latency benchmarks.",
    lastContactedAt: "3 hours ago",
    createdAt: "2026-10-18",
    tags: ["Treasury", "High Value", "North America"],
  },
  {
    id: "lead-2",
    name: "Marcus Vance",
    company: "Northfield Capital Partners",
    role: "Managing Director, Technology",
    email: "mvance@northfieldcap.com",
    phone: "+1 (555) 891-2041",
    status: "Proposal Sent",
    dealValue: "$140,000 / yr",
    lastDiscussionNote:
      "Delivered formal pilot scope for real-time risk screening. Pricing committee scheduled to review SLA guarantees and volume discounts on Friday.",
    lastContactedAt: "5 hours ago",
    createdAt: "2026-10-14",
    tags: ["Asset Management", "Enterprise"],
  },
  {
    id: "lead-3",
    name: "Priya Deshmukh",
    company: "PayBridge Global Solutions",
    role: "Head of Infrastructure",
    email: "priya.d@paybridge.co",
    phone: "+44 20 7946 0912",
    status: "Contacted",
    dealValue: "$68,000 / yr",
    lastDiscussionNote:
      "Explored automated KYC verification endpoints to resolve a 48-hour onboarding bottleneck in their Brazilian and Mexican corridors.",
    lastContactedAt: "Yesterday",
    createdAt: "2026-10-19",
    tags: ["Cross-Border", "LatAm"],
  },
  {
    id: "lead-4",
    name: "Julian Thorne",
    company: "Crestview Asset Management",
    role: "Chief Compliance Officer",
    email: "j.thorne@crestviewasset.com",
    phone: "+1 (555) 432-9087",
    status: "Qualified",
    dealValue: "$125,000 / yr",
    lastDiscussionNote:
      "Expressed keen interest in real-time liquidity telemetry for offshore sub-funds. Need to resolve data residency requirements before advancing.",
    lastContactedAt: "Yesterday",
    createdAt: "2026-10-12",
    tags: ["Offshore", "Compliance"],
  },
  {
    id: "lead-5",
    name: "Sophia Chen",
    company: "Horizon Fintech Labs",
    role: "Co-Founder & CEO",
    email: "sophia@horizonlabs.fin",
    phone: "+1 (555) 678-1234",
    status: "New",
    dealValue: "$35,000 / yr",
    lastDiscussionNote:
      "Inbound demo inquiry from Money20/20. Looking for a plug-and-play escrow disbursement API for their creator economy payout platform.",
    lastContactedAt: "1 day ago",
    createdAt: "2026-10-20",
    tags: ["Startup", "Inbound"],
  },
  {
    id: "lead-6",
    name: "David Kalu",
    company: "Sterling Meridian Bank & Trust International",
    role: "Head of Digital Transformation",
    email: "david.kalu@meridianbank.co.uk",
    phone: "+44 20 8391 4455",
    status: "Proposal Sent",
    dealValue: "$210,000 / yr",
    lastDiscussionNote:
      "Submitted Master Services Agreement with customized liability caps. Security & audit council completed vendor assessment without blockers.",
    lastContactedAt: "2 days ago",
    createdAt: "2026-10-05",
    tags: ["Tier-1 Bank", "Annual Contract"],
  },
  {
    id: "lead-7",
    name: "Camille Dubois",
    company: "Lumiere Wealth Management SAS",
    role: "Partner & Head of Operations",
    email: "c.dubois@lumiere-wealth.fr",
    phone: "+33 1 42 68 55 00",
    status: "Won",
    dealValue: "$82,000 / yr",
    lastDiscussionNote:
      "Contract fully executed! Successfully onboarded 14 wealth managers onto the automated pipeline. Integration kickoff slated for next Monday.",
    lastContactedAt: "3 days ago",
    createdAt: "2026-09-28",
    tags: ["Wealth Tech", "Closed-Won"],
  },
  {
    id: "lead-8",
    name: "Anya Lindqvist",
    company: "Nordic Merchant Clearinghouse AB",
    role: "Director of Settlement Ops",
    email: "anya.lindqvist@nordicclearing.se",
    phone: "+46 8 123 4567",
    status: "Lost",
    dealValue: "$50,000 / yr",
    lastDiscussionNote:
      "Selected an incumbent legacy vendor due to strict requirement for native AS/400 mainframe RPC connectors. Invited us to re-bid for cloud phase in 2027.",
    lastContactedAt: "5 days ago",
    createdAt: "2026-09-15",
    tags: ["Lost to Incumbent", "Follow-up 2027"],
  },
];
