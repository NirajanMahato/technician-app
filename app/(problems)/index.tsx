import BackButton from "@/components/BackButton";
import { fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Lightning, Lock, Thermometer, Wrench } from "phosphor-react-native";
import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const problems = [
  {
    label: "Plumbing",
    icon: Wrench,
    color: "#3B82F6", // Blue-500
    description: "Pipes, leaks & repairs",
  },
  {
    label: "Electrical",
    icon: Lightning,
    color: "#3B82F6", // Blue-500
    description: "Wiring & power issues",
  },
  {
    label: "Locksmith",
    icon: Lock,
    color: "#3B82F6", // Blue-500
    description: "Keys & security",
  },
  {
    label: "HVAC",
    icon: Thermometer,
    color: "#3B82F6", // Blue-500
    description: "Heating & cooling",
  },
];

const ProblemSelectionScreen = () => {
  const router = useRouter();

  const handleSelect = (type: string) => {
    router.push({ pathname: "/(problems)/sub_problem", params: { type } });
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
            <Text style={styles.title}>What service do you need?</Text>
            
          </View>

          <View style={styles.grid}>
            {problems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.label}
                  style={styles.card}
                  onPress={() => handleSelect(item.label)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.color + "15" }]}>
                    <Icon color={item.color} size={32} weight="duotone" />
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

export default ProblemSelectionScreen;

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
    marginTop: 20,
    marginBottom: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 23,
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