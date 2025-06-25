import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, fonts } from "@/constants/theme";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";

const technician = {
  name: "Alex Smith",
  email: "alex.smith@plumber.com",
  number: "+1 555-123-4567",
};

const options = [
  {
    key: "earnings",
    label: "Total Earnings",
    icon: <Feather name="dollar-sign" size={18} color="#2563eb" />,
    route: "/(profile)/technician-earnings" as const,
  },
  {
    key: "jobs",
    label: "Completed Orders",
    icon: <Feather name="check-circle" size={18} color="#2563eb" />,
    route: "/(profile)/technician-completed" as const,
  },
  {
    key: "support",
    label: "Help & Support",
    icon: <AntDesign name="questioncircleo" size={18} color="#2563eb" />,
    route: "/(profile)/support" as const,
  },
];

const Profile = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [acceptRapid, setAcceptRapid] = useState(true);
  const [acceptSlow, setAcceptSlow] = useState(false);

  const handleOptionPress = (key: string, route?: string) => {
    if (key === "logout") {
      router.replace("/(auth)/login");
    } else if (route) {
      router.push(route as any);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>

        <View style={styles.userInfoRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>
              Hello, <Text style={styles.highlight}>{technician.name}</Text>
            </Text>
            <Text style={styles.email}>{technician.email}</Text>
            <Text style={styles.number}>{technician.number}</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => router.push("/(profile)/edit-profile")}
            >
              <Feather name="edit-2" size={13} color="#fff" />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBg}>
              <Feather name="user" size={32} color="#fff" />
            </View>
          </View>
        </View>

        <View style={styles.toggleSection}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Accept Rapid Requests</Text>
            <Switch
              value={acceptRapid}
              onValueChange={setAcceptRapid}
              trackColor={{ false: colors.grey200, true: "#4BA73F" }}
              thumbColor={colors.white}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Accept Slow Requests</Text>
            <Switch
              value={acceptSlow}
              onValueChange={setAcceptSlow}
              trackColor={{ false: colors.grey200, true: "#4BA73F" }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.option}
              onPress={() => handleOptionPress(option.key, option.route)}
              activeOpacity={0.7}
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

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => handleOptionPress("logout")}
            activeOpacity={0.7}
          >
            <View style={styles.logoutIconBg}>
              <MaterialIcons name="logout" size={18} color="#dc2626" />
            </View>
            <Text style={styles.logoutLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 24,
  },
  avatarContainer: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBg: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  highlight: {
    color: colors.primary,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  number: {
    fontSize: 14,
    color: "#6b7280",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  editBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  toggleSection: {
    backgroundColor: colors.grey100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  optionsContainer: {
    borderRadius: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
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
    fontWeight: "500",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  logoutIconBg: {
    backgroundColor: "#fee2e2",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoutLabel: {
    fontSize: 15,
    color: "#dc2626",
    fontWeight: "600",
  },
});
