import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ValidationError from "@/components/ValidationError";
import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

const SignupStep1 = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const isValidEmail = email.includes("@") && email.includes(".");
  const isValidPhone = phone.length >= 10;
  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  const isValid =
    fullName &&
    isValidEmail &&
    isValidPhone &&
    password.length >= 6 &&
    isPasswordMatch;

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "transparent" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "transparent" }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.step}>Step 1 of 2</Text>
          </View>

          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Enter your details to get started with service bookings.
          </Text>

          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            onBlur={() => handleBlur("fullName")}
          />
          {touched.fullName && !fullName && <ValidationError message="Full name is required" />}

          <InputField
            label="Email Address"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onBlur={() => handleBlur("email")}
          />
          {touched.email && (!email || !isValidEmail) && (
            <ValidationError message={!email ? "Email is required" : "Invalid email"} />
          )}

          <InputField
            label="Phone Number"
            placeholder="+1234567890"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            onBlur={() => handleBlur("phone")}
          />
          {touched.phone && (!phone || !isValidPhone) && (
            <ValidationError message={!phone ? "Phone is required" : "Invalid phone number"} />
          )}

          <InputField
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onBlur={() => handleBlur("password")}
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            rightIcon={<Feather name="eye" size={18} color={colors.grey500} />}
          />
          {touched.password && password.length < 6 && (
            <ValidationError message="Password must be at least 6 characters" />
          )}

          <InputField
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            onBlur={() => handleBlur("confirmPassword")}
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            rightIcon={<Feather name="eye" size={18} color={colors.grey500} />}
          />
          {touched.confirmPassword && !isPasswordMatch && (
            <ValidationError message="Passwords do not match" />
          )}

          <PrimaryButton
            title="Next"
            marginTop={30}
            borderRadius={30}
            onPress={() => router.push("/(auth)/signupStep2")}
            disabled={!isValid}
            backgroundColor={isValid ? colors.primary : colors.grey300}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupStep1;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingBottom:20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  step: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.medium,
  },
  title: {
    fontSize: 24,
    color: colors.textPrimary,
    fontFamily: fonts.bold,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.regular,
  },
});