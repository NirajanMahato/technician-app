import BackButton from "@/components/BackButton";
import InputField from "@/components/InputField";
import { colors, fonts } from "@/constants/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe44@gmail.com");
  const [phone, setPhone] = useState("+977 9800000000");
  const [address, setAddress] = useState("Kathmandu, Nepal");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/120"
  );

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    Alert.alert("Success", "Profile updated successfully!");
    navigation.goBack();
  };

  const handleImagePicker = () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      { text: "Camera", onPress: () => console.log("Camera pressed") },
      { text: "Gallery", onPress: () => console.log("Gallery pressed") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton />
        </View>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editImageButton}
                onPress={handleImagePicker}
                activeOpacity={0.8}
              >
                <MaterialIcons name="camera-alt" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileImageText}>Tap to change photo</Text>
          </View>

          <InputField
            label="Full Name *"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />

          <InputField
            label="Email Address *"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <InputField
            label="Phone Number *"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <InputField
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            autoCapitalize="words"
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
            <Feather
              name="check"
              size={18}
              color="#ffffff"
              style={styles.saveButtonIcon}
            />
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
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
    fontFamily: fonts.bold,
    color: "#111827",
    textAlign: "center",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f3f4f6",
  },
  editImageButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#6b7280",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  saveButtonIcon: {
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 40,
  },
});
