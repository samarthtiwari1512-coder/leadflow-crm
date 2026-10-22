# LeadFlow — Lead Management CRM

LeadFlow is a single-screen Lead Management CRM built for fintech and enterprise sales teams. It combines an **Editorial Fintech** design system (warm ivory canvas, deep forest green accents, terracotta highlights) with an atomic, file-backed JSON datastore and Next.js App Router architecture.

Developed as part of the Full Stack Developer Intern coding assessment at **Pravar AI**.

---

## Table of Contents
1. [Project Overview & Key Features](#project-overview--key-features)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Prerequisites & Getting Started](#prerequisites--getting-started)
4. [Available Scripts](#available-scripts)
5. [Database Engine, Seed Data & Hosting Considerations](#database-engine-seed-data--hosting-considerations)
6. [API Documentation](#api-documentation)
7. [Testing, QA Verification & Known Limitations](#testing-qa-verification--known-limitations)
8. [Manual Acceptance Test & Demo Plan (2–3 Minutes)](#manual-acceptance-test--demo-plan-23-minutes)
9. [Screenshots & Visual Walkthrough](#screenshots--visual-walkthrough)

---

## Project Overview & Key Features

LeadFlow provides a lightweight, focused CRM dashboard designed to manage sales pipelines and follow-up commitments without unnecessary complexity.

### Core Capabilities
- **Editorial Fintech Design Identity**:
  - Purposeful, tactile color palette: **Warm Ivory** canvas (`#F5F1E8`), **Deep Forest Green** (`#244C3A`), **Terracotta** accent (`#D97757`), **Charcoal** typography (`#282A25`), **Muted Sage** (`#DCE5D8`), and **Warm Cream** surfaces (`#FFFEFA`).
  - Solid, intentional tones with refined contrast (zero generic SaaS gradients or glowing neon cards).
  - Editorial typography pairing classic serif display headers with clean, readable sans-serif metadata.
  - Multi-attribute accessible badges pairing unique geometric shapes and icons alongside colors so status is never conveyed by color alone.
- **Priority Follow-ups & Reminders**:
  - Section pinned directly above the main pipeline for immediate daily attention.
  - **Overdue follow-ups**: Scheduled for past calendar days (`date < startOfToday`); styled in high-visibility Coral with alert icons.
  - **Today's follow-ups**: Scheduled for the current calendar day; styled in neutral surface with scheduled time badges.
  - Mutually exclusive classification: Today's follow-ups remain in Today's section throughout the day and are not prematurely marked overdue merely because their scheduled hour has passed.
- **Lead Detail Dialog with Discussion Timeline**:
  - Clicking any lead row or follow-up card opens an accessible modal dialog (not a separate page).
  - Full discussion history displayed in **strict reverse chronological order** (newest notes first).
  - Each timeline card displays author, relative time, formatted timestamp, body text, and any scheduled commitments.
- **Discussion Notes & Follow-up Scheduling**:
  - Add discussion notes directly inside the lead dialog.
  - Optional next follow-up scheduling with `datetime-local` and next action commitment.
  - Updates lead list, pinned follow-ups, and summary metrics immediately.
- **Pipeline Stage Progression**:
  - Interactive pipeline stage selector (`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`).
  - Status updates persist immediately to storage via `PATCH /api/leads/[id]`.
- **Add New Lead**:
  - Modal dialog with input validation.
  - **Lead Contact Name** is required; **Company** and **Phone** are optional.
  - Stage defaults to **`New`**.
  - Optional initial discussion note and follow-up scheduling.
- **Search & Stage Filtering**:
  - Real-time search across contact names and company names.
  - Status filter tabs with live counters (`All`, `New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`).
  - Empty state handling with a one-click filter reset button.

---

## Architecture & Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Next.js 16.4.2 | App Router with Turbopack, React Server Components (RSC), and Partial Prerendering |
| **UI Library** | React 19.3.0 | Modern Hooks, Client and Server Components |
| **Language** | TypeScript 5 | Strict mode enabled, zero `any` types in data models |
| **Styling** | Tailwind CSS v4 | CSS variables, custom `@theme` tokens, zero arbitrary colors |
| **Icons** | Lucide React | High-contrast, semantic SVG iconography |
| **Typography** | Geist Sans & Geist Mono | Self-hosted via Next.js Font Optimization |
| **Data Layer** | Atomic JSON Engine | Custom zero-config file datastore with atomic rename writes |

---

## Prerequisites & Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (tested on `v22.23.2`)
- **npm**: `v9.0.0` or higher (tested on `10.9.8`)
- **Git**

### Installation & Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/samarthtiwari1512-coder/leadflow-crm.git
   cd leadflow-crm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment** (optional):
   The project is zero-config and runs out of the box without external database credentials.
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts Next.js development server with Turbopack on port 3000 |
| `npm run build` | Compiles production bundle and runs TypeScript compiler checks |
| `npm run start` | Runs the compiled production server on port 3000 |
| `npm run lint` | Runs ESLint validation across `src/` |
| `npx tsc --noEmit` | Runs standalone TypeScript type-checking |

---

## Database Engine, Seed Data & Hosting Considerations

### 1. How Local JSON Persistence Works
LeadFlow stores lead records in a file-backed JSON datastore at `data/leads.json`.
- **First-Run Auto-Seeding**: If `data/leads.json` is absent on boot (e.g. after a fresh clone), `readDb()` in `src/lib/db.ts` automatically initializes the file using `SEED_LEADS` from `src/data/seed-leads.ts`.
- **Atomic Writes**: All write operations (`createLead`, `updateLead`, `addDiscussionNote`) write content to a unique temporary file (`${filePath}.${Date.now()}.${random}.tmp`) and atomically rename it via `fs.renameSync(tempPath, filePath)`. This prevents corrupted reads and partial file writes during concurrent requests.
- **Git Safety**: `data/*.json` and `data/*.tmp` are ignored in `.gitignore`; only `data/.gitkeep` is tracked.

### 2. Default Seed Data
Initializes with realistic enterprise fintech accounts containing multi-note timelines:
- *Harrison Cole* (Apex Settlement Tech) — Qualified
- *Elena Rostova* (Apex Ledger Technologies) — Proposal Sent
- *Marcus Vance* (Northfield Capital Partners) — Proposal Sent
- *Julian Thorne* (Crestview Asset Management) — Qualified
- *Priya Deshmukh* (PayBridge Global Solutions) — Contacted
- *Sophia Chen* (Horizon Fintech Labs) — New
- *David Kalu* (Sterling Meridian Bank & Trust) — Proposal Sent
- *Camille Dubois* (Lumiere Wealth Management) — Won

### 3. Hosting & Deployment Trade-offs
- **Single-Instance / Persistent Hosting (Ideal)**:
  - Docker containers, Linux virtual machines (AWS EC2, DigitalOcean, Hetzner), or services with persistent volumes (Railway, Fly.io).
  - The local filesystem persists across restarts, providing full durability with zero database infrastructure overhead.
- **Stateless Serverless Hosting (Trade-off)**:
  - In serverless environments (e.g. Vercel Functions, AWS Lambda), execution environments are stateless and ephemeral. Files written to local disk are wiped when the lambda container spins down.
  - For serverless production deployments, the storage module (`src/lib/db.ts`) can be swapped for an external managed PostgreSQL database (e.g. Neon, Supabase) or Redis with minimal interface changes.

---

## API Documentation

All routes return `Content-Type: application/json`.

### 1. `GET /api/leads`
Retrieves all leads, active follow-ups, and pipeline summary stats.

- **Query Parameters**:
  - `q` (optional): Case-insensitive search query matching contact name or company name.
  - `status` (optional): Filter by stage (`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`, or `All`).

- **Response (`200 OK`)**:
  ```json
  {
    "leads": [
      {
        "id": "lead-elena-rostova",
        "name": "Elena Rostova",
        "company": "Apex Ledger Technologies",
        "role": "VP of Treasury Systems",
        "email": "elena.rostova@apexledger.io",
        "phone": "+1 (555) 234-8901",
        "status": "Proposal Sent",
        "dealValue": "$95,000 / yr",
        "lastDiscussionNote": "Delivered customized pilot agreement...",
        "lastContactedAt": "2026-10-21T11:15:16.768Z",
        "createdAt": "2026-10-18T09:00:00.000Z",
        "nextFollowUpDate": "2026-10-21T18:00:00.000Z",
        "nextFollowUpAction": "Follow up on legal review of SLA annex",
        "notes": [...]
      }
    ],
    "followUps": [
      {
        "id": "fu-lead-julian-thorne",
        "leadId": "lead-julian-thorne",
        "leadName": "Julian Thorne",
        "company": "Crestview Asset Management",
        "nextAction": "Security review call regarding offshore fund data custody",
        "scheduledTime": "Yesterday, 7:30 PM (Overdue)",
        "rawDate": "2026-10-20T14:00:00.000Z",
        "isOverdue": true,
        "notes": "Expressed keen interest in real-time liquidity telemetry..."
      }
    ],
    "stats": {
      "activeLeads": 7,
      "todayFollowUps": 3,
      "overdueFollowUps": 4,
      "totalLeads": 8
    }
  }
  ```

---

### 2. `POST /api/leads`
Creates a new lead.

- **Request Body**:
  ```json
  {
    "name": "Sarah Jenkins",
    "company": "Apex Global Payments",
    "phone": "+1 (555) 019-2834",
    "email": "s.jenkins@apexpayments.com",
    "status": "New",
    "initialNote": "Initial demo inquiry from fintech conference",
    "followUpDate": "2026-10-25T14:00:00.000Z",
    "followUpAction": "Send sandbox credentials"
  }
  ```
- **Validation**:
  - `name` is **required** (returns `400 Bad Request` if missing or whitespace).
  - `status` defaults to `"New"` if omitted. Must be one of the 6 valid stages.
- **Response (`201 Created`)**:
  ```json
  {
    "lead": { "id": "lead-1792600965075", "name": "Sarah Jenkins", "status": "New", ... },
    "followUps": [...],
    "stats": { ... }
  }
  ```

---

### 3. `GET /api/leads/[id]`
Fetches a single lead record with discussion notes sorted in reverse chronological order.

- **Response (`200 OK`)**:
  ```json
  {
    "lead": {
      "id": "lead-elena-rostova",
      "name": "Elena Rostova",
      "notes": [
        {
          "id": "note-1792581316768",
          "leadId": "lead-elena-rostova",
          "content": "Delivered customized pilot agreement...",
          "createdAt": "2026-10-21T11:15:16.768Z",
          "author": "Sales Rep"
        }
      ]
    }
  }
  ```
- **Error (`404 Not Found`)**: If ID does not exist.

---

### 4. `PATCH /api/leads/[id]`
Updates an existing lead's fields (such as pipeline status).

- **Request Body**:
  ```json
  {
    "status": "Qualified"
  }
  ```
- **Validation**: Validates status value. Returns `400 Bad Request` for invalid status strings.
- **Response (`200 OK`)**: Returns updated `lead`, recalculated `followUps`, and `stats`.

---

### 5. `POST /api/leads/[id]/notes`
Appends a discussion note and optionally updates the lead's next follow-up.

- **Request Body**:
  ```json
  {
    "content": "Executive briefing complete. Client approved SLA terms.",
    "followUpDate": "2026-10-25T14:00:00.000Z",
    "followUpAction": "Send revised pilot contract",
    "author": "Sales Rep"
  }
  ```
- **Validation**: `content` cannot be empty (returns `400 Bad Request`).
- **Response (`201 Created`)**: Returns updated `lead` with new note placed at index 0 of `notes`.

---

## Testing, QA Verification & Known Limitations

### 1. Code Quality & Build Checks
```bash
# Run ESLint across all source files
npm run lint

# Run standalone TypeScript type-checking
npx tsc --noEmit

# Run Next.js production build
npm run build
```

### 2. Automated Test Verification Results
All 8 assessment requirements were verified against the production server:
- **REQ-1 (Lead listing, search, status filters)**: Verified name search, company search, and all 6 status filters.
- **REQ-2 (Lead detail & reverse chronological timeline)**: Verified note timestamps in strict descending order.
- **REQ-3 (Discussion note & follow-up scheduling)**: Verified `POST /api/leads/[id]/notes` returns `201` and places note at index 0.
- **REQ-4 (Status update)**: Verified `PATCH /api/leads/[id]` returns `200` and updates status in real time.
- **REQ-5 (Create lead & validation)**: Verified `POST /api/leads` requires `name` (returns `400` on empty name) and defaults status to `"New"`.
- **REQ-6 (Follow-up logic & counts)**: Verified overdue items appear first, active leads formula excludes Won/Lost, and today's items match Summary Strip.
- **REQ-7 (Persistence after refresh)**: Verified full SSR page reload preserves all created records and notes in initial HTML payload.
- **REQ-8 (API validation & error handling)**: Verified 7 negative test cases (`400 Bad Request` and `404 Not Found`).

### 3. Known Testing Limitation
- **Browser Automation Driver**: The automated Playwright browser subagent encountered an upstream CDN error (`404 Not Found` for driver `playwright-1.57.0-linux.zip` from Microsoft Azure Edge). Headless Chrome DOM rendering and SSR payloads were verified directly via `/usr/bin/google-chrome --headless=new --dump-dom`. Full browser UI functionality can be verified in 2 minutes via the manual test plan below.

---

## Manual Acceptance Test & Demo Plan (2–3 Minutes)

Use this step-by-step walkthrough to demonstrate the CRM:

1. **Dashboard & Summary Strip (30s)**:
   - Open [http://localhost:3000](http://localhost:3000).
   - Point out the Editorial Fintech design system (warm ivory canvas, forest green accents, refined serif typography, and solid surface cards).
   - Highlight the 3 summary metrics: **Active Pipeline Leads (7)**, **Today's Follow-ups (3)**, and **Overdue Follow-ups (4)**.
2. **Priority Follow-ups Section (20s)**:
   - Show the pinned section above the pipeline.
   - Point out that **Overdue items** (*Julian Thorne*, *David Kalu*, *Marcus Vance*, *Elena Rostova*) are highlighted with Coral borders and Overdue badges.
   - Point out that **Today's items** (*Priya Deshmukh*, *Sophia Chen*, *Harrison Cole*) display standard scheduled time badges.
3. **Search & Status Filtering (25s)**:
   - Type `Elena` into the search box -> list instantly narrows to *Elena Rostova*.
   - Clear search -> type `Northfield` -> list filters by company to *Marcus Vance*.
   - Click through status tabs (`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`, `All`) to show real-time filtering and tab counters.
4. **Lead Detail Dialog & Timeline (30s)**:
   - Click *Elena Rostova*.
   - Point out that it opens a modal dialog (not a new page).
   - Review the discussion history: note timestamps are in strict reverse chronological order (newest first).
5. **Status Update & Add Note (30s)**:
   - In the modal, change the pipeline dropdown from `Proposal Sent` to `Qualified`. Note the instant badge update and checkmark confirmation.
   - In the note box, type: `"Reviewed revised SLA terms with general counsel."`
   - Check "Schedule next follow-up with this note", pick a date, type action `"Send contract signoff link"`, and click **Save Discussion Note**.
   - Note that the entry appears at the very top of the timeline immediately. Close modal.
6. **Create Lead & Verify Persistence (25s)**:
   - Click **+ Add New Lead** in the header.
   - Try clicking "Create Lead" with an empty name to demonstrate validation.
   - Enter Name: `"Victor Sterling"`, Company: `"Sterling Risk Analytics"`, Status: `New`. Submit.
   - Confirm *Victor Sterling* appears at the top of the pipeline list.
   - Press **F5 (Browser Refresh)** -> Confirm all new leads, status changes, and discussion notes persist across the reload.

---

## Screenshots & Visual Walkthrough

The following screenshots capture the live application in its editorial fintech aesthetic:

### 1. Main Dashboard Overview
*Desktop overview showing the warm ivory canvas, forest green branding, key metrics strip (Active Pipeline Leads, Today's Follow-ups, Overdue Follow-ups), pinned priority follow-up actions, and searchable pipeline opportunity table.*

![LeadFlow Main Dashboard](screenshots/Screenshot%20From%202026-10-23%2004-05-39.png)

### 2. Lead Timeline Dialog
*Accessible modal dialog for Harrison Cole featuring pipeline stage progression selector, contact metadata, quick note creation with follow-up scheduling, and reverse-chronological discussion timeline with scheduled next steps.*

![Lead Timeline Dialog](screenshots/Screenshot%20From%202026-10-23%2004-06-02.png)

### 3. Add Lead Dialog
*New opportunity dialog with required Lead Contact Name validation, optional organization/contact details, initial pipeline stage selection, initial note, and follow-up date toggle.*

![Add Lead Dialog](screenshots/Screenshot%20From%202026-10-23%2004-05-47.png)

---

## License

Created for the Pravar AI Full Stack Developer Intern coding assessment.
