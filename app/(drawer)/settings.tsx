// app/(profile)/settings.tsx
import { colors } from "@/constants/theme";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const settingsOptions = [
  {
    key: "change-password",
    label: "Change Password",
    icon: <Feather name="lock" size={18} color={colors.primary} />,
    route: "/(profile)/change-password",
  },
  {
    key: "privacy-policy",
    label: "Privacy Policy",
    icon: (
      <Ionicons name="document-text-outline" size={18} color={colors.primary} />
    ),
    route: "/(profile)/UnderConstructionScreen",
  },
  {
    key: "delete-account",
    label: "Delete Account",
    icon: (
      <MaterialIcons name="delete-outline" size={18} color={colors.primary} />
    ),
    route: "/(profile)/UnderConstructionScreen",
  },
];

const Settings = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const handleOptionPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.sidebarBtn}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="menu" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.optionsContainer}>
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={styles.option}
            onPress={() => handleOptionPress(option.route)}
          >
            <View style={styles.iconContainer}>{option.icon}</View>
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Feather
              name="chevron-right"
              size={20}
              color="#b6b6b6"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.version}>
        App Version {Constants.expoConfig?.version || "1.0.0"}
      </Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 16,
  },
  sidebarBtn: {
    position: "absolute",
    left: 0,
    top: 7,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 15,
    color: "#1f2937",
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 40,
  },
});
