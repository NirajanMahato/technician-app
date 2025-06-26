import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const mockOrders = [
  {
    id: 1,
    service: "Plumbing Repair",
    date: "2024-05-30",
    amount: 120,
    customer: "John Smith",
  },
  {
    id: 2,
    service: "Electrical Work",
    date: "2024-05-25",
    amount: 90,
    customer: "Sarah Johnson",
  },
  {
    id: 3,
    service: "HVAC Service",
    date: "2024-05-18",
    amount: 150,
    customer: "Alex Brown",
  },
];

const TechnicianCompleted = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
       <View style={styles.header}>
          <View style={styles.headerLeft}>
            <BackButton />
          </View>
          <Text style={styles.title}>Completed Orders</Text>
          <View style={styles.headerRight} />
        </View>
      <View style={styles.content}>
        <FlatList
          data={mockOrders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderRow}>
              <View style={styles.orderInfo}>
                <Text style={styles.service}>{item.service}</Text>
                <Text style={styles.customer}>{item.customer}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.amount}>${item.amount}</Text>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default TechnicianCompleted;

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
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  orderInfo: {
    flex: 1,
  },
  service: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#1F2937",
  },
  customer: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: fonts.regular,
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: "#9CA3AF",
    fontFamily: fonts.regular,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: "#22C55E",
    marginLeft: 16,
  },
});
