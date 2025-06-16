import BackButton from "@/components/BackButton";
import { fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calculator, Lightning } from "phosphor-react-native";
import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const searchTypes = [
  {
    id: "rapid",
    label: "Rapid Search",
    icon: Lightning,
    color: "#059669", 
    title: "Estimated Budget: $150-250",
    subtitle: "Based on average market rates",
    bgColor: "#f2faf5", 
    borderColor: "#c5fadf" 
  },
  {
    id: "custom",
    label: "Custom Search",
    icon: Calculator,
    color: "#2563EB", 
    title: "Set Your Budget",
    subtitle: "Enter your preferred price range",
    bgColor: "#f0f6fc",
    borderColor: "#dfeaf7"
  }
];

const SearchTypeSelectionScreen = () => {
  const { type, subProblem } = useLocalSearchParams<{ type: string; subProblem: string }>();
  const router = useRouter();

  const handleSearchTypeSelect = (searchType: string) => {
    if (searchType === "rapid") {
      router.push({ 
        pathname: "/(booking)/searching", 
        params: { type, subProblem, searchType } 
      });
    } else {
      router.push({ 
        pathname: "/(booking)/custom_search", 
        params: { type, subProblem, searchType } 
      });
    }
  };  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>
        
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Choose Search Type</Text>
            <Text style={styles.subtitle}>
              How would you like to find technicians for {subProblem}?
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {searchTypes.map((option) => {
              const Icon = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard, 
                    { 
                      backgroundColor: option.bgColor,
                      borderColor: option.borderColor
                    }
                  ]}
                  onPress={() => handleSearchTypeSelect(option.id)}
                  activeOpacity={0.75}
                >
                  <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: `${option.color}08` }]}>
                      <Icon color={option.color} size={28} weight="duotone" />
                    </View>
                    
                    <View style={styles.textContent}>
                      <Text style={styles.optionLabel}>{option.label}</Text>
                      <Text style={styles.optionTitle}>{option.title}</Text>
                      <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.indicator, { backgroundColor: option.color }]} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};

export default SearchTypeSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
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
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.bold || "System",
    color: "#1E293B", // Slate-800
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular || "System",
    color: "#64748B", // Slate-500
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flex: 1,
    gap: 20,
    marginBottom: 32,
  },
  optionCard: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  textContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 18,
    fontFamily: fonts.semiBold || "System",
    color: "#1E293B", // Slate-800
    marginBottom: 6,
  },
  optionTitle: {
    fontSize: 15,
    fontFamily: fonts.medium || "System",
    color: "#334155", // Slate-700
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular || "System",
    color: "#64748B", // Slate-500
    lineHeight: 18,
  },
  indicator: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
});