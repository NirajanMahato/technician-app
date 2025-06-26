import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const REJECTION_REASONS = [
  "Customer location too far",
  "Service request is unclear",
  "Price offered is too low",
  "Already booked for that time",
  "Not within my area of expertise",
  "Other",
];

const RejectReasonScreen = () => {
  const router = useRouter();

  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleSubmit = () => {
    const finalReason =
      selectedReason === "Other" ? customReason.trim() : selectedReason;
    if (!finalReason) return;

    // Submit the reason (can post to API here)
    router.back();
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <BackButton onPress={() => router.back()} />
        </View>
        <Text style={styles.title}>Decline Request</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.subtitle}>
            Please select a reason for declining this request
          </Text>

          <View style={styles.reasonsList}>
            {REJECTION_REASONS.map((reason, index) => {
              const isSelected = selectedReason === reason;
              return (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.reasonItem,
                    isSelected && styles.selectedItem,
                    index === REJECTION_REASONS.length - 1 && styles.lastItem,
                  ]}
                  onPress={() => setSelectedReason(reason)}
                  activeOpacity={0.6}
                >
                  <View style={styles.reasonContent}>
                    <View
                      style={[
                        styles.radioButton,
                        isSelected && styles.radioButtonSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text
                      style={[
                        styles.reasonText,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {reason}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {selectedReason === "Other" && (
          <View style={styles.section}>
            <Text style={styles.inputLabel}>Additional details</Text>
            <TextInput
              style={styles.input}
              placeholder="Please provide more details about your reason..."
              placeholderTextColor="#9CA3AF"
              value={customReason}
              onChangeText={setCustomReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                opacity:
                  selectedReason === "Other" && !customReason.trim()
                    ? 0.4
                    : selectedReason
                    ? 1
                    : 0.4,
              },
            ]}
            onPress={handleSubmit}
            disabled={
              (selectedReason === "Other" && !customReason.trim()) ||
              !selectedReason
            }
          >
            <Text style={styles.submitText}>Decline Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default RejectReasonScreen;

const styles = StyleSheet.create({
  header: {
    position: "relative",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: "#1F2937",
    letterSpacing: -0.2,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 22,
  },
  reasonsList: {
    gap: 0,
  },
  reasonItem: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  lastItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  reasonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#3B82F6",
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },
  selectedItem: {
    backgroundColor: "#FAFBFF",
  },
  reasonText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#374151",
    flex: 1,
    lineHeight: 20,
  },
  selectedText: {
    fontFamily: fonts.medium,
    color: "#1F2937",
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#374151",
    backgroundColor: "#FFFFFF",
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  submitText: {
    color: "#FFFFFF",
    fontFamily: fonts.semiBold,
    fontSize: 16,
    letterSpacing: -0.2,
  },
});
