# LeadFlow — Lead Management CRM

LeadFlow is a single-screen Lead Management CRM built for fintech and enterprise sales teams. It combines the **Midnight Fintech** design system with a persistent, atomic JSON-backed datastore and Next.js App Router architecture.

Developed as part of the Full Stack Developer Intern coding assessment at Pravar AI.

---

## Features Implemented (Part 1 & Part 2)

1. **Midnight Fintech Design System**
   - Precise color tokens: **Ink** (`#17243A`), **Blue** (`#365CF5`), **Mint** (`#D9F5E7`), **Cloud** (`#F7F8FA`), and **Coral** (`#E66B59`).
   - Restrained shadows, clean white card surfaces, subtle borders, and Google Geist typography.
   - Accessible status badges combining distinct icons, shapes, and high-contrast color tokens.

2. **Persistent Storage & Data Layer**
   - Zero-config, atomic file-backed JSON database located at `data/leads.json`.
   - Seeded on first boot with 6 realistic enterprise fintech leads with multi-step discussion histories and follow-ups.
   - Survives server restarts and browser reloads without external database setup.

3. **Lead Detail Dialog with Discussion Timeline**
   - Clicking any lead row or follow-up card opens an accessible modal dialog (not a separate page).
   - Full discussion timeline displayed in **strict reverse chronological order** (most recent notes first).
   - Each timeline entry displays the author, relative time, formatted timestamp, note body, and any scheduled follow-up commitments.

4. **Discussion Notes & Follow-up Scheduling**
   - Add new discussion notes directly from the lead dialog.
   - Optional follow-up scheduling with `datetime-local` and next action description.
   - Saves immediately to persistent storage and updates the lead list, follow-up cards, and summary stats in real time.

5. **Instant Status Progression**
   - Interactive pipeline stage selector in the lead detail dialog (`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`).
   - Updates persist immediately via `PATCH /api/leads/[id]`.

6. **Add New Lead**
   - Accessible modal dialog for creating leads.
   - **Name** is required with immediate input validation.
   - **Company** and **Phone** are optional.
   - Pipeline status defaults to **`New`**.
   - Optional initial discussion note and initial follow-up scheduling.

7. **Follow-up Logic & Overdue Urgency**
   - Priority section pinned directly above the main pipeline.
   - Consistent logic for today's follow-ups vs overdue follow-ups:
     - **Overdue follow-ups:** Scheduled prior to now; styled in high-visibility **Coral** with action badges.
     - **Today's follow-ups:** Scheduled for the current calendar day; styled in neutral/blue.

8. **Search & Status Filtering**
   - Instant search across contact names and company names.
   - Status tabs with dynamic counter badges (`All`, `New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`).
   - Empty states with one-click filter reset.

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (tested with `v22.23.2`)
- **npm**: `v9.0.0` or higher (tested with `10.9.8`)

### Environment Variables
No external environment variables or database connection strings are required. The project uses a self-initializing, file-backed JSON datastore (`data/leads.json`) that works out of the box in all environments.

### Installation & Run

1. Clone or navigate to the repository:
   ```bash
   cd ~/Documents/PravarAI_Task
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Next.js development server with Turbopack on `http://localhost:3000` |
| `npm run build` | Compiles the production application, verifies TypeScript types, and creates optimized bundles |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint checks across all project files |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads` | Returns all leads, follow-up items, and summary stats. Supports `?q=` (search query) and `?status=` (pipeline filter). |
| `POST` | `/api/leads` | Creates a new lead. Requires `name`. Optional: `company`, `phone`, `email`, `status` (defaults to `"New"`), `initialNote`, `followUpDate`. |
| `GET` | `/api/leads/[id]` | Returns a single lead by ID with notes sorted in reverse chronological order. |
| `PATCH` | `/api/leads/[id]` | Updates lead fields (e.g. `{ "status": "Qualified" }`). |
| `POST` | `/api/leads/[id]/notes` | Appends a discussion note to a lead. Requires `content`. Optional: `followUpDate`, `followUpAction`. |

---

## Project Structure

```
├── data/
│   └── leads.json               # Persistent JSON database (auto-seeded)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── leads/
│   │   │       ├── route.ts             # GET /api/leads, POST /api/leads
│   │   │       └── [id]/
│   │   │           ├── route.ts         # GET & PATCH /api/leads/[id]
│   │   │           └── notes/
│   │   │               └── route.ts     # POST /api/leads/[id]/notes
│   │   ├── globals.css          # Midnight Fintech design tokens & CSS theme
│   │   ├── layout.tsx           # Root layout with Geist font & metadata
│   │   └── page.tsx             # Server Component fetching initial persistent data
│   ├── components/
│   │   ├── ui/
│   │   │   ├── badge.tsx        # Multi-attribute StatusBadge (icon + label + token)
│   │   │   ├── button.tsx       # Accessible button with primary/secondary/ghost variants
│   │   │   ├── card.tsx         # Card container components
│   │   │   └── input.tsx        # Form input component
│   │   └── dashboard/
│   │       ├── header.tsx           # LeadFlow wordmark and "Add New Lead" button
│   │       ├── summary-strip.tsx    # Active Leads, Today's Follow-ups, Overdue (Coral)
│   │       ├── today-follow-ups.tsx # Pinned priority follow-ups section
│   │       ├── status-filter-bar.tsx# Status filter tabs with counters
│   │       ├── lead-list.tsx        # Search bar and responsive pipeline list
│   │       ├── lead-detail-modal.tsx# Detail dialog with full reverse-chronological timeline
│   │       ├── add-lead-modal.tsx   # Add lead modal with input validation
│   │       └── dashboard-view.tsx   # Client coordinator with state synchronization
│   ├── data/
│   │   └── seed-leads.ts        # Default enterprise seed leads data
│   ├── lib/
│   │   ├── db.ts                # Atomic JSON database persistence engine
│   │   ├── date-utils.ts        # Date calculation, overdue logic, & relative time
│   │   ├── tokens.ts            # Midnight Fintech design tokens
│   │   └── utils.ts             # Classname merge utility
│   └── types/
│       └── lead.ts              # TypeScript interfaces for Lead, Note, FollowUp
```

---

## Status: What is Complete vs. Unfinished

### Completed in Part 2
- [x] Persistent JSON database engine with atomic writes (`src/lib/db.ts`).
- [x] Seed data with 6 realistic enterprise fintech leads, multi-note histories, and follow-ups (`src/data/seed-leads.ts`).
- [x] REST API routes (`/api/leads`, `/api/leads/[id]`, `/api/leads/[id]/notes`) with input validation and error handling.
- [x] Lead detail dialog displaying full discussion timeline in reverse chronological order.
- [x] Discussion note submission with optional follow-up date/time and next action.
- [x] Real-time state synchronization updating lead list, follow-up cards, and summary stats.
- [x] Pipeline status changes persisted via API and immediately reflected in UI.
- [x] Add Lead modal with required name, optional company/phone, and status defaulting to `New`.
- [x] Follow-up section pinned above main list with overdue items visibly highlighted in Coral.
- [x] Name & company search + 7 status filter tabs tested and verified.
- [x] 0 TypeScript compiler errors and 0 ESLint warnings.
- [x] Next.js production build passes cleanly.

### Unfinished / Future Scope (for subsequent parts after review)
- [ ] Multi-user authentication & role-based access control (RBAC).
- [ ] External relational database adapter (e.g. PostgreSQL / Prisma) if required for scaling beyond single-instance.
- [ ] Docker / docker-compose containerization.
- [ ] Export to CSV / Excel.
