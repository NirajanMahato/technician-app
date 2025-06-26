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

const getParamString = (param: any) => {
  if (Array.isArray(param)) return param[0] || "";
  return param || "";
};

const InvoiceScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleChat = () => {
    const customerId =
      getParamString(params.customerId) || getParamString(params.id);
    const customerName = getParamString(params.customerName) || "Customer";
    router.push({
      pathname: "/(chat)/[id]",
      params: {
        id: customerId,
        name: customerName,
      },
    });
  };

  const handleGoHome = () => {
    router.replace("/(technician)/requests");
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Service Invoice</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Customer Info</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {getParamString(params.customerName) || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>
            {getParamString(params.customerPhone) || "N/A"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Service Info</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Service</Text>
          <Text style={styles.value}>
            {getParamString(params.service) || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>
            {getParamString(params.address) || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Scheduled At</Text>
          <Text style={styles.value}>
            {getParamString(params.time) || "N/A"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Pricing</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.priceValue}>
            {getParamString(params.money) || "N/A"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={handleChat}
          activeOpacity={0.8}
        >
          <Text style={styles.chatText}>Chat with Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleGoHome}
          activeOpacity={0.8}
        >
          <Text style={styles.homeText}>Go to Requests</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default InvoiceScreen;

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
  title: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.grey600,
    fontFamily: fonts.medium,
    marginTop: 24,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey200,
  },
  label: {
    fontSize: 14,
    color: colors.grey700,
    fontFamily: fonts.medium,
  },
  value: {
    fontSize: 14,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
    textAlign: "right",
    maxWidth: "60%",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    marginTop: 12,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  priceValue: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  chatButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  chatText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  homeButton: {
    marginTop: 16,
    backgroundColor: colors.grey200,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  homeText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
});
