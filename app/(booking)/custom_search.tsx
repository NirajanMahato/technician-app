import BackButton from "@/components/BackButton";
import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomSearchScreen = () => {
  const { type, subProblem, searchType } = useLocalSearchParams();
  const router = useRouter();

  const [budgetMin, setBudgetMin] = useState("100");
  const [budgetMax, setBudgetMax] = useState("250");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSubmit = () => {
    router.push({
      pathname: "/(booking)/searching",
      params: { type, subProblem, searchType: "custom" },
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardContainer}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <BackButton />
              <Text style={styles.headerTitle}>Customize Search</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.serviceCard}>
                <View style={styles.serviceIconContainer}>
                  <Feather name="tool" size={20} color="#3b82f6" />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceType}>{type}</Text>
                  <Text style={styles.serviceProblem}>{subProblem}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Budget Range</Text>
                <View style={styles.budgetContainer}>
                  <View style={styles.budgetInputContainer}>
                    <Text style={styles.currency}>$</Text>
                    <TextInput
                      style={styles.budgetInput}
                      keyboardType="numeric"
                      value={budgetMin}
                      onChangeText={setBudgetMin}
                      placeholder="100"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.budgetSeparator}>
                    <View style={styles.separatorLine} />
                  </View>
                  <View style={styles.budgetInputContainer}>
                    <Text style={styles.currency}>$</Text>
                    <TextInput
                      style={styles.budgetInput}
                      keyboardType="numeric"
                      value={budgetMax}
                      onChangeText={setBudgetMax}
                      placeholder="250"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferred Date</Text>
                <TouchableOpacity
                  style={styles.dateSelector}
                  onPress={() => setShowDatePicker(true)}
                >
                  <View style={styles.dateContent}>
                    <Feather name="calendar" size={20} color="#6b7280" />
                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "calendar"} // "calendar" works better on Android
                  minimumDate={new Date()}
                  maximumDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                
                    if (selectedDate && selectedDate >= new Date()) {
                      setDate(selectedDate);
                    }
                  }}
                />
                
                
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Problem Description</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    placeholder="Describe the issue in detail..."
                    placeholderTextColor="#9ca3af"
                    value={description}
                    onChangeText={setDescription}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              <View style={styles.bottomPadding} />
            </ScrollView>

            <View style={styles.submitContainer}>
              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  (!budgetMin || !budgetMax) && styles.submitButtonDisabled
                ]} 
                onPress={onSubmit}
                disabled={!budgetMin || !budgetMax}
              >
                <Text style={styles.submitText}>Find Technician</Text>
                <Feather name="arrow-right" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold || fonts.bold,
    color: "#111827",
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceType: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: "#111827",
    marginBottom: 2,
  },
  serviceProblem: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#6b7280",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: "#111827",
    marginBottom: 12,
  },
  budgetContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  budgetInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  currency: {
    fontSize: 16,
    fontFamily: fonts.medium || fonts.regular,
    color: "#6b7280",
    marginRight: 8,
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#111827",
  },
  budgetSeparator: {
    width: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  separatorLine: {
    width: 1,
    height: 20,
    backgroundColor: "#e5e7eb",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#111827",
    marginLeft: 12,
  },
  textAreaContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  textArea: {
    minHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#111827",
    lineHeight: 22,
  },
  bottomPadding: {
    height: 100,
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    marginRight: 8,
  },
});