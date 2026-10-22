/**
 * Editorial Fintech Design System Tokens
 * Reusable color tokens for LeadFlow CRM
 */
export const DESIGN_TOKENS = {
  colors: {
    // Editorial Warm Charcoal Typography
    ink: {
      DEFAULT: "#282A25", // Charcoal primary text, headings
      secondary: "#4D5048", // Supporting text, table captions
      muted: "#73766D", // Subdued labels, timestamps
      subtle: "#9E9F97", // Icons, disabled state
    },
    // Deep Forest Green - Primary actions & active tabs
    forest: {
      DEFAULT: "#244C3A",
      hover: "#1D3D2F",
      active: "#173125",
      subtle: "#EBF2E9",
      border: "#C8DBC3",
    },
    // Terracotta - Restrained accent & milestone highlights
    terracotta: {
      DEFAULT: "#D97757",
      hover: "#C56546",
      subtle: "#FDF3EE",
      border: "#F4D3C7",
    },
    // Muted Sage - Calming secondary surfaces & chips
    sage: {
      DEFAULT: "#DCE5D8",
      dark: "#244C3A",
      border: "#C5D4BF",
    },
    // Warm Ivory Canvas & Cream Surfaces
    ivory: {
      DEFAULT: "#F5F1E8", // Warm ivory canvas
      subtle: "#EDE7DA",
      border: "#DED8CC", // Subtle warm borders
    },
    surface: "#FFFEFA", // White/cream surfaces
    // Overdue Follow-ups - Crisp Editorial Crimson
    coral: {
      DEFAULT: "#B83A2E",
      dark: "#8C2218",
      subtle: "#FDF1F0",
      border: "#EBBFBA",
    },
  },
  typography: {
    fontSerif: '"Newsreader", "Charter", "Bitstream Charter", "Georgia", "Cambria", serif',
    fontSans: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: 'var(--font-geist-mono), monospace',
  },
  radii: {
    xs: "2px",
    sm: "3px",
    md: "4px",
    lg: "6px",
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
