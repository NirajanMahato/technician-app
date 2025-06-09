import { scale, verticalScale } from "@/utils/styling";

export const colors = {
  primary: "#0060E6",
  primaryDark: "#004CB6",
  neutral300: "#D1D5DB",    // gray-300
  background: "#FFFFFF",
  surface: "#F4F4F5",
  textPrimary: "#000000",
  textSecondary: "#4B5563",
  accent: "#1F2937",
  border: "#E5E7EB",
  placeholder: "#9CA3AF",
  black: "#000000",
  white: "#FFFFFF",
  grey100: "#F5F5F5",
  grey200: "#E5E5E5",
  grey300: "#D4D4D4",
  grey400: "#A3A3A3",
  grey500: "#737373",
  grey600: "#525252",
  grey700: "#404040",
  grey800: "#262626",
  grey900: "#171717",
};

export const fonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
  light: "Poppins-Light",
};

export const shadows = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
};

export const fontSizes = {
  xs: scale(12),
  sm: scale(14),
  base: scale(16),
  lg: scale(18),
  xl: scale(20),
  "2xl": scale(24),
};


export const spacingX = {
  _5: scale(5),
  _10: scale(10),
  _15: scale(15),
  _20: scale(20),
  _30: scale(30),
};

export const spacingY = {
  _5: verticalScale(5),
  _10: verticalScale(10),
  _15: verticalScale(15),
  _20: verticalScale(20),
  _30: verticalScale(30),
};

export const radius = {
  _6: verticalScale(6),
  _10: verticalScale(10),
  _20: verticalScale(20),
};
