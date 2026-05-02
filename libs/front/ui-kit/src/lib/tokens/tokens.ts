/**
 * Lifeel — Design Tokens (TypeScript)
 * ----------------------------------------------------------------------------
 * Auto-derived from tokens.less. Two layers:
 *   1. Primitives (raw values — don't use directly in app code)
 *   2. Semantics  (meaning-based — USE THESE in components)
 *
 * Usage in Angular:
 *   import { semanticTokens, cssVar } from '@lifestyle-dashboard/ui-kit';
 *   const color = semanticTokens.color.accent.primary;  // '#8B6DF2'
 *   const cssReference = cssVar('color-accent-primary'); // 'var(--color-accent-primary)'
 *
 * Prefer cssVar() in templates/styles so dark mode keeps working.
 * Use literal values only for canvas/SVG/non-CSS contexts.
 * ----------------------------------------------------------------------------
 */

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const cssVar = (name: string): string => `var(--${name})`;

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────
export const primitives = {
  color: {
    lavender: {
      50: '#F7F4FF',
      100: '#EDE7FF',
      200: '#DBCFFE',
      300: '#C4B1FC',
      400: '#A78BFA',
      500: '#8B6DF2',
      600: '#7C5AE8',
      700: '#6946D0',
      800: '#553AA8',
      900: '#3D2980',
    },
    mint: {
      50: '#EEFBF7',
      100: '#D5F5E9',
      300: '#7BE3C7',
      400: '#4DD0B4',
      500: '#2DB89A',
      700: '#1F8670',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFC',
      100: '#F3F2F7',
      200: '#E6E4EE',
      300: '#CBC8D6',
      400: '#9B98AA',
      500: '#6F6C80',
      600: '#4E4B5E',
      700: '#35333F',
      800: '#1F1E26',
      900: '#0F0E14',
    },
    coral: { 300: '#FFB8B8', 500: '#FF6B6B' },
    violet: { 300: '#D4C3FC', 500: '#A78BFA' },
    emerald: { 300: '#8DECC1', 500: '#34D399' },
    amber: { 300: '#FDE68A', 500: '#FBBF24' },
    success: { 500: '#22C55E' },
    warning: { 500: '#F59E0B' },
    danger: { 500: '#EF4444' },
    info: { 500: '#3B82F6' },
  },
} as const;

// ─── SEMANTIC TOKENS (light — mirrors tokens.less :root) ──────────────────────
export const semanticTokens = {
  color: {
    surface: {
      base: primitives.color.neutral[50],
      raised: primitives.color.neutral[0],
      sunken: primitives.color.neutral[100],
      accentSoft: primitives.color.lavender[50],
      accentMid: primitives.color.lavender[100],
      overlay: 'rgba(31, 30, 38, 0.48)',
    },
    border: {
      subtle: primitives.color.neutral[100],
      default: primitives.color.neutral[200],
      strong: primitives.color.neutral[300],
      accent: primitives.color.lavender[400],
    },
    text: {
      primary: primitives.color.neutral[900],
      secondary: primitives.color.neutral[600],
      tertiary: primitives.color.neutral[400],
      accent: primitives.color.lavender[700],
      onAccent: primitives.color.neutral[0],
    },
    accent: {
      primary: primitives.color.lavender[500],
      primaryHover: primitives.color.lavender[600],
      primaryActive: primitives.color.lavender[700],
      secondary: primitives.color.mint[500],
    },
    category: {
      health: primitives.color.coral[500],
      leisure: primitives.color.violet[500],
      routine: primitives.color.emerald[500],
      selfdev: primitives.color.amber[500],
    },
    feedback: {
      success: primitives.color.success[500],
      warning: primitives.color.warning[500],
      danger: primitives.color.danger[500],
      info: primitives.color.info[500],
    },
  },

  typography: {
    family: {
      sans: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace",
    },
    size: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '38px',
      '5xl': '52px',
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      snug: 1.35,
      normal: 1.5,
      relaxed: 1.7,
    },
    letterSpacing: {
      tight: '-0.01em',
      wide: '0.02em',
    },
  },

  space: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
  },

  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    '2xl': '28px',
    full: '9999px',
  },

  shadow: {
    xs: '0 1px 2px rgba(30, 20, 80, 0.04)',
    sm: '0 2px 4px rgba(30, 20, 80, 0.05)',
    md: '0 4px 12px rgba(30, 20, 80, 0.06), 0 1px 3px rgba(30, 20, 80, 0.03)',
    lg: '0 12px 32px rgba(30, 20, 80, 0.10), 0 2px 6px rgba(30, 20, 80, 0.04)',
    xl: '0 24px 48px rgba(30, 20, 80, 0.16), 0 4px 12px rgba(30, 20, 80, 0.06)',
    focusRing: '0 0 0 3px rgba(139, 109, 242, 0.24)',
  },

  motion: {
    ease: {
      out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    },
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms',
    },
  },

  layout: {
    maxWidth: '1440px',
    topbarHeight: '68px',
    gutter: '24px',
  },
} as const;

// ─── DARK THEME OVERRIDES (for programmatic reads; CSS handles swap via data-theme) ──
export const darkSemanticOverrides = {
  color: {
    surface: {
      base: primitives.color.neutral[900],
      raised: primitives.color.neutral[800],
      sunken: '#07060B',
      accentSoft: 'rgba(139, 109, 242, 0.08)',
      accentMid: 'rgba(139, 109, 242, 0.18)',
      overlay: 'rgba(0, 0, 0, 0.64)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      default: 'rgba(255, 255, 255, 0.10)',
      strong: 'rgba(255, 255, 255, 0.18)',
    },
    text: {
      primary: primitives.color.neutral[50],
      secondary: primitives.color.neutral[300],
      tertiary: primitives.color.neutral[500],
      accent: primitives.color.lavender[300],
    },
    accent: {
      primary: primitives.color.lavender[400],
      primaryHover: primitives.color.lavender[300],
      primaryActive: primitives.color.lavender[500],
    },
  },
  shadow: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.32)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.36)',
    md: '0 4px 12px rgba(0, 0, 0, 0.42)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.52)',
    xl: '0 24px 48px rgba(0, 0, 0, 0.64)',
    focusRing: '0 0 0 3px rgba(167, 139, 250, 0.32)',
  },
} as const;

// ─── Type exports ────────────────────────────────────────────────────────────
export type SemanticTokens = typeof semanticTokens;
export type CategoryKey = keyof typeof semanticTokens.color.category;
export type SpaceKey = keyof typeof semanticTokens.space;
export type RadiusKey = keyof typeof semanticTokens.radius;
export type ShadowKey = keyof typeof semanticTokens.shadow;

// ─── Convenience: the four Time Tracker categories in a stable order ─────────
export const TIME_TRACKER_CATEGORIES: readonly {
  key: CategoryKey;
  label: string;
  color: string;
  cssVar: string;
}[] = [
  {
    key: 'health',
    label: 'Health',
    color: semanticTokens.color.category.health,
    cssVar: cssVar('color-category-health'),
  },
  {
    key: 'leisure',
    label: 'Leisure',
    color: semanticTokens.color.category.leisure,
    cssVar: cssVar('color-category-leisure'),
  },
  {
    key: 'routine',
    label: 'Routine',
    color: semanticTokens.color.category.routine,
    cssVar: cssVar('color-category-routine'),
  },
  {
    key: 'selfdev',
    label: 'Self Development',
    color: semanticTokens.color.category.selfdev,
    cssVar: cssVar('color-category-selfdev'),
  },
] as const;
