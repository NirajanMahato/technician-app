import { colors, fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text } from "react-native";

const ValidationError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.danger || "red",
    fontSize: 12,
    marginTop: 1,
    marginLeft: 9,
    fontFamily: fonts.regular,
  },
});

export default ValidationError;
