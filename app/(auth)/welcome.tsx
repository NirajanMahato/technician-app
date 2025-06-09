import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Typo size={28} fontWeight="700" style={styles.title}>
          Welcome to Plumber Finder
        </Typo>
        <Image
          source={require("@/assets/images/welcomeImage.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Typo size={16} color={colors.textSecondary} style={styles.subtitle}>
          Get reliable plumbing and electrical help at your fingertips.
        </Typo>

        <PrimaryButton
          title="Sign Up"
          onPress={() => router.push("/(auth)/register")}
          marginTop={40}
          height={55}
          borderRadius={30}
        />
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/(auth)/login")}>
          <Typo size={16} color={colors.textSecondary} style={styles.subtitle}>
            Login
          </Typo>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  image: {
    width: 310,
    height: 310,
    marginBottom: 32,
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  loginButton: {
    marginTop: 16,
  },
});
