import { colors, fonts } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  marginTop?: number;
  width?: DimensionValue;
  height?: DimensionValue;
  loading?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  marginTop = 16,
  width = "100%",
  height = 56,
  loading = false,
  backgroundColor = colors.primary, // default to blue-500
  borderRadius = 8, // simpler radius
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          marginTop,
          width,
          height,
          backgroundColor,
          borderRadius,
        },
      ]}
      onPress={onPress}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.semiBold,
    letterSpacing: 0.5,
  },
});
