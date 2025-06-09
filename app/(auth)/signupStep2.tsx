import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import Typo from "@/components/Typo";
import { colors, fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SignupStep2 = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [agree, setAgree] = useState(false);

  const isValid = city.trim().length > 0 && agree;

  const handleTermsPress = () => {
    Linking.openURL("https://yourapp.com/terms");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.step}>Step 2 of 2</Text>
      </View>

      <Typo size={22} fontWeight="700" style={styles.title}>
        Complete Your Profile
      </Typo>
      <Typo size={14} color={colors.textSecondary} style={styles.desc}>
        A few more details before we get you started.
      </Typo>

      <InputField
        label="City"
        placeholder="Choose your city"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setSubscribe(!subscribe)}
      >
        <Ionicons
          name={subscribe ? "checkbox" : "square-outline"}
          size={22}
          color={colors.primary}
        />
        <Text style={styles.checkboxText}>Subscribe to our newsletter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAgree(!agree)}
      >
        <Ionicons
          name={agree ? "checkbox" : "square-outline"}
          size={22}
          color={colors.primary}
        />
        <Text style={styles.checkboxText}>
          I agree to the{" "}
          <Text style={styles.linkText} onPress={handleTermsPress}>
            Terms & Conditions
          </Text>
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        title="Finish"
        marginTop={30}
        borderRadius={30}
        disabled={!isValid}
        onPress={() => {
          // Final signup logic or route
          router.replace("/(auth)/login"); // or confirmation screen
        }}
        backgroundColor={isValid ? colors.primary : colors.grey300}
      />
    </View>
  );
};

export default SignupStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  step: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.medium,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fonts.bold,
    marginBottom: 4,
  },
  desc: {
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontFamily: fonts.medium,
  },
});
