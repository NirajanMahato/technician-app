import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { newRequests, ongoingRequests } from "../mockdata/requests";

// Types
interface NewRequest {
  id: number;
  distance: string;
  money: string;
  date: string | null;
  isCustomSearch: boolean;
  service: string;
  address: string;
  type: "new";
}
interface OngoingRequest extends Omit<NewRequest, "type"> {
  customerName: string;
  type: "ongoing";
}
type Request = NewRequest | OngoingRequest;

const TechnicianRequests = () => {
  const [activeTab, setActiveTab] = useState<"new" | "ongoing">("new");
  const router = useRouter();

  const RequestCard = ({ request }: { request: Request }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.serviceText}>{request.service}</Text>
        <Text style={styles.moneyText}>{request.money}</Text>
      </View>

      <Text style={styles.addressText}>{request.address}</Text>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Feather name="map-pin" size={16} color={colors.grey500} />
          <Text style={styles.detailText}>{request.distance}</Text>
        </View>

        {request.date && (
          <View style={styles.detailItem}>
            <Feather name="calendar" size={16} color={colors.grey500} />
            <Text style={styles.detailText}>{request.date}</Text>
          </View>
        )}

        {"customerName" in request && (
          <View style={styles.detailItem}>
            <Feather name="user" size={16} color={colors.grey500} />
            <Text style={styles.detailText}>{request.customerName}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.outlinedButton]}
          onPress={() =>
            router.push({
              pathname: "/(modals)/view-details",
              params: Object.fromEntries(
                Object.entries(request).map(([k, v]) => [
                  k,
                  v?.toString?.() ?? "",
                ])
              ),
            })
          }
        >
          <Text style={styles.outlinedText}>View Details</Text>
        </TouchableOpacity>
        {"customerName" in request && (
          <TouchableOpacity
            style={[styles.actionButton, styles.filledButton]}
            onPress={() =>
              router.push({
                pathname: "/(chat)/[id]",
                params: {
                  id: request.id.toString(),
                  name: request.customerName,
                  avatar: undefined,
                },
              })
            }
          >
            <Feather name="message-circle" size={16} color={colors.white} />
            <Text style={styles.filledText}>Chat</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Requests</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "new" && styles.activeTab]}
            onPress={() => setActiveTab("new")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "new" && styles.activeTabText,
              ]}
            >
              New
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "ongoing" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("ongoing")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "ongoing" && styles.activeTabText,
              ]}
            >
              Ongoing
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === "new" ? (
            newRequests.length > 0 ? (
              newRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={{ ...request, type: "new" }}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Feather name="inbox" size={48} color={colors.grey400} />
                <Text style={styles.emptyText}>No new requests</Text>
              </View>
            )
          ) : ongoingRequests.length > 0 ? (
            ongoingRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={{ ...request, type: "ongoing" }}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Feather name="check-circle" size={48} color={colors.grey400} />
              <Text style={styles.emptyText}>No ongoing requests</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default TechnicianRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: colors.white,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.grey500,
  },
  activeTabText: {
    color: colors.grey900,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.grey100,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.grey200,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  moneyText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  addressText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  cardDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 6,
  },

  outlinedButton: {
    backgroundColor: colors.grey100,
  },

  outlinedText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.primary,
  },

  filledButton: {
    backgroundColor: colors.primary,
  },
  filledText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.grey400,
    marginTop: 12,
  },
});
