import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();

  const mobileInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email.includes("@") && password.length >= 6;

  const handleLogin = () => {
    if (!isValid) return;
    console.log("Login Data:", { email, password });
    router.replace("/(drawer)");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>

        <Typo style={styles.heading}>Login</Typo>
        <Typo style={styles.subHeading}>
          Reliable technicians. Instant booking. Stress-free service.
        </Typo>

        <InputField
          inputRef={mobileInputRef}
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />

        <InputField
          inputRef={passwordInputRef}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          rightIcon={<Feather name="eye" size={18} color={colors.grey500} />}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => router.push("/(auth)/forgotPassword")}
        >
          <Typo style={styles.forgotPasswordText}>Forgot Password?</Typo>
        </TouchableOpacity>

        <PrimaryButton
          title="Continue"
          onPress={handleLogin}
          borderRadius={30}
          disabled={!isValid}
          marginTop={20}
          backgroundColor={isValid ? colors.primary : colors.grey300}
          height={54}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Typo size={12} color={colors.grey500}>
            OR
          </Typo>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="apple1" size={20} color={colors.black} />
          <Typo style={styles.socialText}>Login with Apple</Typo>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="google" size={20} color={colors.black} />
          <Typo style={styles.socialText}>Login with Google</Typo>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Typo size={14} color={colors.grey700}>
            Haven’t registered yet?{" "}
          </Typo>
          <TouchableOpacity onPress={() => router.push("/(auth)/signupStep1")}>
            <Typo size={14} color={colors.primary} fontWeight="600">
              Register
            </Typo>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 20 : 10,
  },
  backBtn: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.black,
    marginTop: 8,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: colors.grey600,
    marginBottom: 5,
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.grey500,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grey300,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  socialText: {
    marginLeft: 12,
    fontSize: 15,
    color: colors.black,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
