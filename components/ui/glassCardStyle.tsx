import { colours } from "@/themes/colours";

export const glassCardStyle = {
  backgroundColor: colours.glassBackgroundColor,
  borderWidth: 1,
  borderColor: colours.glassBorderColor,
  backdropFilter: "blur(20px)",
  shadowColor: colours.glassShadowColor,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 16,
  elevation: 8,
};

export const glassTextStyle = {
  color: colours.glassTextPrimary,
  textShadowColor: colours.textPrimary,
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 2,
};
