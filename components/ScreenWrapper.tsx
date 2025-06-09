import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? 0 : 10;

  return (
    <View style={[styles.wrapper, { paddingTop }, style]}>
      <View style={{ height: Platform.OS === "android" ? StatusBar.currentHeight : 44, backgroundColor: colors.white }} />
      <StatusBar barStyle="dark-content" translucent />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
