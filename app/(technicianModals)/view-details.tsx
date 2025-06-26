import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ViewDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const type = params.type;

  const handleAccept = () => {
    router.replace({
      pathname: "/(technicianModals)/invoice",
      params: { ...params },
    });
  };

  const handleReject = () => {
    router.replace({
      pathname: "/(technicianModals)/reject-reason",
      params: { ...params },
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <BackButton onPress={() => router.back()} />
        </View>
        <Text style={styles.title}>Request Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(params).map(([key, value]) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.label}>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Text>
            <Text style={styles.value}>{value as string}</Text>
          </View>
        ))}
      </ScrollView>

      {type === "new" && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={handleAccept}
          >
            <Text style={styles.acceptText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={handleReject}
          >
            <Text style={styles.rejectText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* For ongoing requests, just show details. You can add more logic here if needed. */}
    </ScreenWrapper>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  header: {
    position: "relative",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey100,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  detailRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey200,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 15,
    color: colors.grey700,
    fontFamily: fonts.medium,
    flex: 1,
  },
  value: {
    fontSize: 15,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
    flex: 1,
    textAlign: "right",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  rejectButton: {
    backgroundColor: colors.grey200,
  },
  acceptText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  rejectText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
});
