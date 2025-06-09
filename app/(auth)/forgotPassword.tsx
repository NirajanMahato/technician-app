import React, { useState } from "react";
import { View, Image, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import Typo from "@/components/Typo";
import BackButton from "@/components/BackButton";
import { colors, fonts } from "@/constants/theme";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const isValidEmail = email.includes("@") && email.includes(".");

  const handleNext = () => {
    if (!isValidEmail) return;
    console.log("Reset email sent to:", email);
    router.replace("/(auth)/login"); // update if needed
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        {/* <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
        <View style={{ width: 40 }} /> placeholder space */}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Image
            source={require("@/assets/images/forgot_password_illustration.jpg")}
            style={styles.illustration}
          />

          <Typo size={22} fontWeight="700" style={styles.title}>
            Forgot your password?
          </Typo>

          <Typo size={14} color={colors.textSecondary} style={styles.desc}>
            We’ll send a reset link to your email so you can set a new password.
          </Typo>

          <InputField
            label="Email Address"
            placeholder="you@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <PrimaryButton
            title="Send Reset Link"
            marginTop={40}
            height={56}
            borderRadius={30}
            width={"100%"}
            onPress={handleNext}
            disabled={!isValidEmail}
            backgroundColor={isValidEmail ? colors.primary : colors.grey300}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.grey200,
  },
  // logo: {
  //   width: 150,
  //   height: 60,
  //   resizeMode: "contain",
  // },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  illustration: {
    alignSelf: "center",
    width: 270,
    height: 270,
    marginTop: 20,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    color: colors.textPrimary,
    marginBottom: 10,
  },
  desc: {
    marginBottom: 30,
  },
});
