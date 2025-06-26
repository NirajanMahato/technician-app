import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const mockPayments = [
  { id: 1, date: "2024-06-01", amount: 120 },
  { id: 2, date: "2024-05-28", amount: 90 },
  { id: 3, date: "2024-05-20", amount: 150 },
];

const TechnicianEarnings = () => {
  const router = useRouter();
  const total = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton />
        </View>
        <Text style={styles.title}>Total Earnings</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <Text style={styles.totalLabel}>Total Earnings</Text>
        <Text style={styles.totalValue}>${total}</Text>
        <Text style={styles.sectionTitle}>Recent Payments</Text>
        <FlatList
          data={mockPayments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.paymentRow}>
              <Text style={styles.paymentDate}>{item.date}</Text>
              <Text style={styles.paymentAmount}>${item.amount}</Text>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default TechnicianEarnings;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerLeft: {
    width: 40,
    alignItems: "flex-start",
  },
  headerRight: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#6B7280",
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: "#22C55E",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#374151",
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  paymentDate: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: "#374151",
  },
  paymentAmount: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: "#22C55E",
  },
});
