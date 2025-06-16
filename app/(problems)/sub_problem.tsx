import BackButton from "@/components/BackButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fonts } from "@/constants/theme";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Toolbox, Hammer, DropHalf, Fan, Lightning, Wrench } from "phosphor-react-native";
import React from "react";

const subProblemsMap: Record<string, { label: string; icon: any; description: string;  }[]> = {
  Plumbing: [
    { label: "Leak Repair", icon: DropHalf, description: "Fix dripping faucets or pipes", },
    { label: "Clog Removal", icon: Toolbox, description: "Clear sinks or drains", },
    { label: "Installation", icon: Hammer, description: "Install fixtures or water systems", },
  ],
  Electrical: [
    { label: "Power Outage", icon: Lightning, description: "Fix fuse or circuit issues",  },
    { label: "Lighting", icon: Hammer, description: "Replace or fix lighting systems",},
    { label: "Wiring", icon: Wrench, description: "Repair or install wiring",  },
  ],
  Locksmith: [
    { label: "Key Duplication", icon: Hammer, description: "Duplicate or replace keys",},
    { label: "Lock Installation", icon: Toolbox, description: "Install or change locks", },
    { label: "Emergency Unlock", icon: DropHalf, description: "Open locked doors quickly", },
  ],
  HVAC: [
    { label: "AC Repair", icon: Fan, description: "Fix cooling system issues", },
    { label: "Heater Install", icon: Toolbox, description: "Install new heating units", },
    { label: "Maintenance", icon: Hammer, description: "Routine HVAC servicing" },
  ],
};

const SubProblemScreen = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const subProblems = subProblemsMap[type ?? ""] || [];

  const handleSubSelect = (subProblem: string) => {
    router.push({ 
      pathname: "/(problems)/search_type", 
      params: { type, subProblem } 
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>
        
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Select {type} Service</Text>
            <Text style={styles.subtitle}>
              Choose the specific service you need
            </Text>
          </View>

          <View style={styles.grid}>
            {subProblems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.label}
                  style={styles.card}
                  onPress={() => handleSubSelect(item.label)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconContainer, { backgroundColor: "#3B82F6" + "15"}]}>
                    <Icon color={"#3B82F6"} size={32} weight="duotone" />
                  </View>
                  <Text style={styles.cardLabel}>{item.label}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};

export default SubProblemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold || "System",
    color: "#1F2937", // Gray-800
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular || "System",
    color: "#6B7280", // Gray-500
    textAlign: "center",
    lineHeight: 22,
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "flex-start",
    marginBottom: 32,
  },
  card: {
    width: "47%",
    backgroundColor: "#F8FAFC", // Light gray-blue
    borderRadius: 24,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0", // Gray-200
    // Enhanced shadow for iOS
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    // Enhanced shadow for Android
    elevation: 8,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 18,
    fontFamily: fonts.semiBold || "System",
    color: "#1F2937", // Gray-800
    marginBottom: 4,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 13,
    fontFamily: fonts.regular || "System",
    color: "#6B7280", // Gray-500
    textAlign: "center",
    lineHeight: 18,
  },
});