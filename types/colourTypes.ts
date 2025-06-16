export type ColorScheme = "teal" | "blue" | "purple";
export type ThemeColors = {
  [key in ColorScheme]: string;
};
export const THEME_COLORS: ThemeColors = {
  teal: "#0a3740",
  blue: "#00072D",
  purple: "#19081c",
};
export const TAB_CONTAINER_COLORS: ThemeColors = {
  teal: "#00596B",
  blue: "#191D64",
  purple: "#301934",
};
export const TAB_BG_COLORS: ThemeColors = {
  teal: "#00596B",
  blue: "#191D64",
  purple: "#301934",
};
export type TabOption = {
  key: ColorScheme;
  label: string;
};
