import { Lead } from "@/types/lead";

/**
 * Default Seed Leads with rich discussion histories
 * Used to initialize persistence storage on first run.
 */
export const SEED_LEADS: Lead[] = [
  {
    id: "lead-elena-rostova",
    name: "Elena Rostova",
    company: "Apex Ledger Technologies",
    role: "VP of Treasury Systems",
    email: "elena.rostova@apexledger.io",
    phone: "+1 (555) 234-8901",
    status: "Qualified",
    dealValue: "$95,000 / yr",
    lastDiscussionNote:
      "Reviewed automated multi-currency reconciliation corridors. Requested our SOC 2 Type II compliance audit packet and FedNow settlement latency benchmarks.",
    lastContactedAt: "2026-10-21T11:00:00.000Z",
    createdAt: "2026-10-18T09:00:00.000Z",
    tags: ["Treasury", "High Value", "North America"],
    nextFollowUpDate: "2026-10-21T18:00:00.000Z",
    nextFollowUpAction: "Deliver technical deep-dive on FedNow settlement latency",
    notes: [
      {
        id: "note-elena-3",
        leadId: "lead-elena-rostova",
        content:
          "Reviewed automated multi-currency reconciliation corridors. Requested our SOC 2 Type II compliance audit packet and FedNow settlement latency benchmarks.",
        createdAt: "2026-10-21T11:00:00.000Z",
        followUpDate: "2026-10-21T18:00:00.000Z",
        followUpAction: "Deliver technical deep-dive on FedNow settlement latency",
        author: "Alex Morgan (Account Exec)",
      },
      {
        id: "note-elena-2",
        leadId: "lead-elena-rostova",
        content:
          "Discovery call with Elena and her Lead Architect. Evaluated existing SWIFT messaging pipelines; confirmed need for automated fallback routing.",
        createdAt: "2026-10-19T14:30:00.000Z",
        followUpDate: "2026-10-21T11:00:00.000Z",
        followUpAction: "Schedule reconciliation architecture deep-dive",
        author: "Alex Morgan (Account Exec)",
      },
      {
        id: "note-elena-1",
        leadId: "lead-elena-rostova",
        content:
          "Inbound inquiry through fintech partner portal. Elena expressed dissatisfaction with current 3-day batch settlement delays.",
        createdAt: "2026-10-18T09:00:00.000Z",
        followUpDate: "2026-10-19T14:30:00.000Z",
        followUpAction: "Conduct initial scoping call",
        author: "Inbound SDR",
      },
    ],
  },
  {
    id: "lead-marcus-vance",
    name: "Marcus Vance",
    company: "Northfield Capital Partners",
    role: "Managing Director, Technology",
    email: "mvance@northfieldcap.com",
    phone: "+1 (555) 891-2041",
    status: "Proposal Sent",
    dealValue: "$140,000 / yr",
    lastDiscussionNote:
      "Delivered formal pilot scope for real-time risk screening. Pricing committee scheduled to review SLA guarantees and volume discounts on Friday.",
    lastContactedAt: "2026-10-21T09:30:00.000Z",
    createdAt: "2026-10-14T10:00:00.000Z",
    tags: ["Asset Management", "Enterprise"],
    nextFollowUpDate: "2026-10-21T17:30:00.000Z",
    nextFollowUpAction: "Deliver revised pilot pricing proposal with tiered SLA terms",
    notes: [
      {
        id: "note-marcus-2",
        leadId: "lead-marcus-vance",
        content:
          "Delivered formal pilot scope for real-time risk screening. Pricing committee scheduled to review SLA guarantees and volume discounts on Friday.",
        createdAt: "2026-10-21T09:30:00.000Z",
        followUpDate: "2026-10-21T17:30:00.000Z",
        followUpAction: "Deliver revised pilot pricing proposal with tiered SLA terms",
        author: "Sarah Lin (Enterprise Sales)",
      },
      {
        id: "note-marcus-1",
        leadId: "lead-marcus-vance",
        content:
          "Initial executive presentation to Marcus and Northfield CIO. Presented compliance suite benchmarks reducing false-positive rates by 42%.",
        createdAt: "2026-10-14T10:00:00.000Z",
        followUpDate: "2026-10-21T09:30:00.000Z",
        followUpAction: "Prepare formal pilot scope & SLA documentation",
        author: "Sarah Lin (Enterprise Sales)",
      },
    ],
  },
  {
    id: "lead-julian-thorne",
    name: "Julian Thorne",
    company: "Crestview Asset Management",
    role: "Chief Compliance Officer",
    email: "j.thorne@crestviewasset.com",
    phone: "+1 (555) 432-9087",
    status: "Qualified",
    dealValue: "$125,000 / yr",
    lastDiscussionNote:
      "Expressed keen interest in real-time liquidity telemetry for offshore sub-funds. Need to resolve data residency requirements before advancing.",
    lastContactedAt: "2026-10-19T15:00:00.000Z",
    createdAt: "2026-10-12T11:20:00.000Z",
    tags: ["Offshore", "Compliance"],
    // Scheduled for yesterday -> Genuinely Overdue item!
    nextFollowUpDate: "2026-10-20T14:00:00.000Z",
    nextFollowUpAction: "Security review call regarding offshore fund data custody",
    notes: [
      {
        id: "note-julian-2",
        leadId: "lead-julian-thorne",
        content:
          "Expressed keen interest in real-time liquidity telemetry for offshore sub-funds. Need to resolve data residency requirements before advancing.",
        createdAt: "2026-10-19T15:00:00.000Z",
        followUpDate: "2026-10-20T14:00:00.000Z",
        followUpAction: "Security review call regarding offshore fund data custody",
        author: "Alex Morgan (Account Exec)",
      },
      {
        id: "note-julian-1",
        leadId: "lead-julian-thorne",
        content:
          "Consulted with Julian regarding Cayman and Luxembourg regulatory reporting deadlines. Client currently uses manual spreadsheets.",
        createdAt: "2026-10-12T11:20:00.000Z",
        followUpDate: "2026-10-19T15:00:00.000Z",
        followUpAction: "Follow up with offshore telemetry architecture brief",
        author: "Alex Morgan (Account Exec)",
      },
    ],
  },
  {
    id: "lead-priya-deshmukh",
    name: "Priya Deshmukh",
    company: "PayBridge Global Solutions",
    role: "Head of Infrastructure",
    email: "priya.d@paybridge.co",
    phone: "+44 20 7946 0912",
    status: "Contacted",
    dealValue: "$68,000 / yr",
    lastDiscussionNote:
      "Explored automated KYC verification endpoints to resolve a 48-hour onboarding bottleneck in their Brazilian and Mexican corridors.",
    lastContactedAt: "2026-10-20T17:15:00.000Z",
    createdAt: "2026-10-19T12:00:00.000Z",
    tags: ["Cross-Border", "LatAm"],
    nextFollowUpDate: "2026-10-21T19:00:00.000Z",
    nextFollowUpAction: "Send sandbox API credentials & webhook architecture guide",
    notes: [
      {
        id: "note-priya-2",
        leadId: "lead-priya-deshmukh",
        content:
          "Explored automated KYC verification endpoints to resolve a 48-hour onboarding bottleneck in their Brazilian and Mexican corridors.",
        createdAt: "2026-10-20T17:15:00.000Z",
        followUpDate: "2026-10-21T19:00:00.000Z",
        followUpAction: "Send sandbox API credentials & webhook architecture guide",
        author: "Marcus Vance (Solutions Architect)",
      },
      {
        id: "note-priya-1",
        leadId: "lead-priya-deshmukh",
        content:
          "Introductory video session with Priya. She confirmed developer team is eager to integrate modern REST/GraphQL APIs instead of SFTP batches.",
        createdAt: "2026-10-19T12:00:00.000Z",
        followUpDate: "2026-10-20T17:15:00.000Z",
        followUpAction: "Prepare technical architecture diagram for LatAm corridors",
        author: "Marcus Vance (Solutions Architect)",
      },
    ],
  },
  {
    id: "lead-sophia-chen",
    name: "Sophia Chen",
    company: "Horizon Fintech Labs",
    role: "Co-Founder & CEO",
    email: "sophia@horizonlabs.fin",
    phone: "+1 (555) 678-1234",
    status: "New",
    dealValue: "$35,000 / yr",
    lastDiscussionNote:
      "Inbound demo inquiry from Money20/20 keynote. Looking for a plug-and-play escrow disbursement API for their creator economy payout platform.",
    lastContactedAt: "2026-10-20T18:30:00.000Z",
    createdAt: "2026-10-20T18:30:00.000Z",
    tags: ["Startup", "Inbound"],
    nextFollowUpDate: "2026-10-22T10:00:00.000Z",
    nextFollowUpAction: "Introductory discovery session on escrow disbursement engine",
    notes: [
      {
        id: "note-sophia-1",
        leadId: "lead-sophia-chen",
        content:
          "Inbound demo inquiry from Money20/20 keynote. Looking for a plug-and-play escrow disbursement API for their creator economy payout platform.",
        createdAt: "2026-10-20T18:30:00.000Z",
        followUpDate: "2026-10-22T10:00:00.000Z",
        followUpAction: "Introductory discovery session on escrow disbursement engine",
        author: "Inbound SDR",
      },
    ],
  },
  {
    id: "lead-david-kalu",
    name: "David Kalu",
    company: "Sterling Meridian Bank & Trust International",
    role: "Head of Digital Transformation",
    email: "david.kalu@meridianbank.co.uk",
    phone: "+44 20 8391 4455",
    status: "Proposal Sent",
    dealValue: "$210,000 / yr",
    lastDiscussionNote:
      "Submitted Master Services Agreement with customized liability caps. Security & audit council completed vendor assessment without blockers.",
    lastContactedAt: "2026-10-21T10:15:00.000Z",
    createdAt: "2026-10-05T08:00:00.000Z",
    tags: ["Tier-1 Bank", "Annual Contract"],
    nextFollowUpDate: "2026-10-21T16:45:00.000Z",
    nextFollowUpAction: "Legal sync with VP of Compliance on MSA liability clause",
    notes: [
      {
        id: "note-david-3",
        leadId: "lead-david-kalu",
        content:
          "Submitted Master Services Agreement with customized liability caps. Security & audit council completed vendor assessment without blockers.",
        createdAt: "2026-10-21T10:15:00.000Z",
        followUpDate: "2026-10-21T16:45:00.000Z",
        followUpAction: "Legal sync with VP of Compliance on MSA liability clause",
        author: "Sarah Lin (Enterprise Sales)",
      },
      {
        id: "note-david-2",
        leadId: "lead-david-kalu",
        content:
          "Completed comprehensive cybersecurity audit review with Sterling Meridian CISO team. Cleared all 14 penetration testing checkpoints.",
        createdAt: "2026-10-16T11:00:00.000Z",
        followUpDate: "2026-10-21T10:15:00.000Z",
        followUpAction: "Send contract redlines & schedule legal review",
        author: "Sarah Lin (Enterprise Sales)",
      },
      {
        id: "note-david-1",
        leadId: "lead-david-kalu",
        content:
          "First executive briefing with David regarding modernization of corporate treasury portals across UK and APAC branches.",
        createdAt: "2026-10-05T08:00:00.000Z",
        followUpDate: "2026-10-16T11:00:00.000Z",
        followUpAction: "Submit enterprise architecture dossier & compliance proof",
        author: "Sarah Lin (Enterprise Sales)",
      },
    ],
  },
  {
    id: "lead-camille-dubois",
    name: "Camille Dubois",
    company: "Lumiere Wealth Management SAS",
    role: "Partner & Head of Operations",
    email: "c.dubois@lumiere-wealth.fr",
    phone: "+33 1 42 68 55 00",
    status: "Won",
    dealValue: "$82,000 / yr",
    lastDiscussionNote:
      "Contract fully executed! Successfully onboarded 14 wealth managers onto the automated pipeline. Integration kickoff slated for next Monday.",
    lastContactedAt: "2026-10-19T16:00:00.000Z",
    createdAt: "2026-09-28T14:00:00.000Z",
    tags: ["Wealth Tech", "Closed-Won"],
    nextFollowUpDate: null,
    notes: [
      {
        id: "note-camille-2",
        leadId: "lead-camille-dubois",
        content:
          "Contract fully executed! Successfully onboarded 14 wealth managers onto the automated pipeline. Integration kickoff slated for next Monday.",
        createdAt: "2026-10-19T16:00:00.000Z",
        author: "Alex Morgan (Account Exec)",
      },
      {
        id: "note-camille-1",
        leadId: "lead-camille-dubois",
        content:
          "Final contract negotiation on EUR billing terms and multi-tenant security architecture.",
        createdAt: "2026-10-10T11:00:00.000Z",
        author: "Alex Morgan (Account Exec)",
      },
    ],
  },
];
