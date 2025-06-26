import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Documents = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.title}>Documents</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.info}>
          This is where you will be able to upload and manage your documents
          (certificates, IDs, etc.).
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Documents;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    marginLeft: 16,
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
