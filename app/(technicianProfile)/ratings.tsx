import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const mockReviews = [
  {
    id: 1,
    customer: "John Smith",
    rating: 5,
    comment: "Great service!",
    date: "2024-06-01",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    rating: 4,
    comment: "Very professional.",
    date: "2024-05-28",
  },
  {
    id: 3,
    customer: "Alex Brown",
    rating: 5,
    comment: "Quick and efficient.",
    date: "2024-05-20",
  },
];

const averageRating = (
  mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
).toFixed(1);

const Ratings = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton />
        </View>
        <Text style={styles.title}>Ratings & Reviews</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.content}>
        <Text style={styles.avgLabel}>Average Rating</Text>
        <Text style={styles.avgValue}>{averageRating} / 5</Text>
        <FlatList
          data={mockReviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewRow}>
              <View style={styles.reviewHeader}>
                <Text style={styles.customer}>{item.customer}</Text>
                <Text style={styles.rating}>
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </Text>
              </View>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Ratings;

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
  avgLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#6B7280",
    marginBottom: 4,
  },
  avgValue: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: "#f59e42",
    marginBottom: 24,
  },
  reviewRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingVertical: 14,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  customer: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: "#1F2937",
  },
  rating: {
    fontSize: 16,
    color: "#f59e42",
    fontFamily: fonts.bold,
  },
  comment: {
    fontSize: 14,
    color: "#374151",
    fontFamily: fonts.regular,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    fontFamily: fonts.regular,
  },
});
