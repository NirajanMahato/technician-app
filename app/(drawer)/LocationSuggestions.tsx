import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Suggestion {
  title: string;
  subtitle: string;
}

interface Props {
  suggestions: Suggestion[];
  onSelect?: (suggestion: Suggestion) => void;
}

const LocationSuggestions: React.FC<Props> = ({ suggestions, onSelect }) => {
  return (
    <FlatList
  data={suggestions}
  keyExtractor={(item, idx) => item.title + idx}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => onSelect?.(item)}
    >
      <Feather name="map-pin" size={20} color={colors.primary} style={{ marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        <Text style={styles.suggestionSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  )}
  style={{ flex: 1 }}
  contentContainerStyle={{ paddingBottom: 12 }}
  showsVerticalScrollIndicator={false}
/>


  );
};

export default LocationSuggestions;

const styles = StyleSheet.create({
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grey100,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
    width: "100%",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  suggestionTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  suggestionSubtitle: {
    fontSize: 13,
    color: colors.grey600,
    fontFamily: fonts.regular,
  },
}); 