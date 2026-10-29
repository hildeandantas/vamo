/**
 * Vamo design tokens — ported from `vamo-prototype-v2/app/globals.css` and `DESIGN.md`.
 * Keep both in sync: primitives first, then semantic roles per theme.
 */

/** Brand primitives. Semantic roles below reference these; they never change per theme. */
export const Palette = {
  brandOrange: "#ff6b35",
  brandOrangeHover: "#f95b24",
  brandOrangePressed: "#f55b28",
  brandOrangeSoft: "#fff0e8",
  brandOrangeInk: "#a63715",
  brandPetrol: "#123c4a",
  brandPetrolHover: "#1d5161",
  brandPetrolDeep: "#0b2a34",
  brandPetrolSoft: "#e8eff0",
  neutralPaper: "#f7f6f2",
  neutralWhite: "#ffffff",
  neutralWash: "#eeede7",
  neutralLine: "#dcded6",
  neutralControl: "#7d827c",
  neutralMuted: "#61675f",
  neutralInk: "#242923",
} as const;

const light = {
  background: Palette.neutralPaper,
  foreground: Palette.neutralInk,
  card: Palette.neutralWhite,
  cardForeground: Palette.neutralInk,
  primary: Palette.brandOrange,
  primaryForeground: Palette.neutralInk,
  primaryPressed: Palette.brandOrangePressed,
  secondary: Palette.brandPetrol,
  secondaryForeground: Palette.neutralWhite,
  secondaryPressed: Palette.brandPetrolHover,
  muted: Palette.neutralWash,
  mutedForeground: Palette.neutralMuted,
  accent: Palette.brandOrangeSoft,
  accentForeground: Palette.brandOrangeInk,
  border: Palette.neutralLine,
  input: Palette.neutralControl,
  ring: Palette.brandPetrol,
  disabled: "#e4e4dd",
  disabledForeground: "#62665e",
};

export type ThemeColors = { [K in keyof typeof light]: string };
export type ThemeColor = keyof ThemeColors;

const dark: ThemeColors = {
  background: "#142125",
  foreground: "#f3f3eb",
  card: "#1b2c30",
  cardForeground: "#f3f3eb",
  primary: "#ff8355",
  primaryForeground: Palette.neutralInk,
  primaryPressed: Palette.brandOrange,
  secondary: "#c2d9dc",
  secondaryForeground: Palette.brandPetrolDeep,
  secondaryPressed: "#d4e5e7",
  muted: "#24363a",
  mutedForeground: "#b2bfba",
  accent: "#412d26",
  accentForeground: "#ffb397",
  border: "#3a4c4d",
  input: "#819391",
  ring: "#a4cbd1",
  disabled: "#344346",
  disabledForeground: "#b2bfba",
};

export const Colors = { light, dark } as const;

/**
 * Static font faces loaded in `src/app/_layout.tsx`.
 * Montserrat for headings/highlights, Inter for body and UI.
 * Each weight is its own family on native, so pick the family instead of `fontWeight`.
 */
export const Fonts = {
  headingLight: "Montserrat_300Light",
  heading: "Montserrat_400Regular",
  headingMedium: "Montserrat_500Medium",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
} as const;

/** Mobile type scale: uses the lower bound of each `clamp()` from the web tokens. */
export const Typography = {
  display: {
    fontFamily: Fonts.headingLight,
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.76,
  },
  title: {
    fontFamily: Fonts.headingLight,
    fontSize: 32,
    lineHeight: 37,
    letterSpacing: -1.12,
  },
  section: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.84,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: -0.24,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.14,
  },
  small: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.14,
  },
  caption: { fontFamily: Fonts.body, fontSize: 12, lineHeight: 17 },
} as const;

export type TypographyVariant = keyof typeof Typography;

/** 4 px rhythm — same keys as the web `--space-*` tokens. */
export const Spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

/** Buttons and tabs are pills, fields 16 px, cards 8 px. */
export const Radius = {
  card: 8,
  control: 16,
  sheet: 24,
  pill: 9999,
} as const;

export const Sizes = {
  /** Minimum height for buttons and fields. */
  control: 48,
  icon: 20,
  /** Horizontal screen padding on mobile (`--layout-gutter` lower bound). */
  gutter: 16,
  /** Max content width for tablets/web (`--layout-content`). */
  content: 1280,
} as const;

/** Durations in ms; zeroed when the system asks for reduced motion. */
export const Motion = {
  press: 120,
  feedback: 180,
  transition: 240,
  enter: 320,
  exit: 180,
  scalePress: 0.98,
  distance: 8,
} as const;
