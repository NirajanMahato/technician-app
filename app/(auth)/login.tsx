import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();

  const mobileInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    console.log("Login Data:", { mobileNumber, password });
    setIsLoading(false);
  };

  const handleRegister = () => {
    router.push("/(auth)/register" as any);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/GharSewaLogo.png")}
          style={styles.logo}
        />

        <Typo style={styles.title}>Login via phone number</Typo>

        <InputField
          inputRef={mobileInputRef}
          label="Mobile Number"
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />

        <InputField
          inputRef={passwordInputRef}
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => router.push("/(auth)/forgotPassword" as any)}
        >
          <Typo style={styles.forgotPasswordText}>Forgot your password?</Typo>
        </TouchableOpacity>

        <PrimaryButton
          title="Login"
          onPress={handleLogin}
          loading={isLoading}
          marginTop={40}
          width="100%"
          height={55}
        />

        <View style={styles.registerContainer}>
          <Typo style={styles.registerText}>Don't have an account? </Typo>
          <TouchableOpacity onPress={handleRegister}>
            <Typo style={styles.registerLink}>Register</Typo>
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
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  logo: {
    alignSelf: "center",
    marginTop: 90,
    marginBottom: 40,
    width: 220,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 30,
    textAlign: "left",
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: colors.grey600,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 15,
    color: colors.grey700,
    fontFamily: fonts.regular,
  },
  registerLink: {
    fontSize: 15,
    color: colors.black,
    fontFamily: fonts.medium,
    textDecorationLine: "underline",
  },
});
