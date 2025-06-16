// app/(profile)/my-bookings.tsx
import BackButton from "@/components/BackButton";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";

const dummyBookings = [
  {
    id: "1",
    service: "Plumbing",
    date: "June 15, 2025",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: "2",
    service: "Electrical",
    date: "June 18, 2025",
    time: "3:00 PM",
    status: "Upcoming",
  },
  {
    id: "3",
    service: "Locksmith",
    date: "June 20, 2025",
    time: "1:00 PM",
    status: "Upcoming",
  },
];

const MyBookings = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.datetime}>{item.date} • {item.time}</Text>
        <Text style={[styles.status, item.status === "Completed" ? styles.completed : styles.upcoming]}>
          {item.status}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color="#9ca3af" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
      <BackButton/>

        <Text style={styles.title}>My Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={dummyBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  listContent: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardLeft: {
    flex: 1,
  },
  service: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  datetime: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
  },
  completed: {
    color: "#059669", // green
  },
  upcoming: {
    color: "#2563eb", // blue
  },
  separator: {
    height: 16,
  },
});
