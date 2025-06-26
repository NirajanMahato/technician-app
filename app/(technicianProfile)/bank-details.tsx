import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BankDetails = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
       <View style={styles.header}>
          <View style={styles.headerLeft}>
            <BackButton />
          </View>
          <Text style={styles.title}>Bank Details</Text>
          <View style={styles.headerRight} />
        </View>
      <View style={styles.content}>
        <Text style={styles.info}>
          This is where you will be able to add and manage your bank details for
          payments.
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default BankDetails;

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
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  info: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#374151",
    textAlign: "center",
  },
});
