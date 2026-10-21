/**
 * Midnight Fintech Design System Tokens
 * Reusable color tokens for LeadFlow CRM
 */
export const DESIGN_TOKENS = {
  colors: {
    // Core Midnight Fintech Palette
    ink: {
      DEFAULT: "#17243A", // Primary text, headings, dark surfaces
      secondary: "#475569", // Supporting text, table captions
      muted: "#64748B", // Subdued labels, timestamps
      subtle: "#94A3B8", // Icons, disabled state, subtle borders
    },
    blue: {
      DEFAULT: "#365CF5", // Primary actions, active filters, interactive links
      hover: "#2649DB", // Button hover state
      subtle: "#EEF2FF", // Active filter badge background, focus highlight
      border: "#C7D4FE", // Accent boundary borders
    },
    mint: {
      DEFAULT: "#D9F5E7", // Subtle positive highlights, won status pill
      dark: "#0A6341", // Dark mint for accessible high-contrast text
      border: "#A5E8C9",
    },
    cloud: {
      DEFAULT: "#F7F8FA", // Main page background
      subtle: "#EFF1F5", // Card hover background, secondary surfaces
      border: "#E5E9F0", // Card and section border lines
    },
    coral: {
      DEFAULT: "#E66B59", // Overdue follow-ups, urgent warnings
      dark: "#A62E1E", // High-contrast text on coral backgrounds
      subtle: "#FDF2F0", // Overdue card background tint
      border: "#F5C2BA",
    },
    surface: "#FFFFFF",
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
  radii: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
