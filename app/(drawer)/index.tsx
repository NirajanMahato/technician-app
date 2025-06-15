import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LocationSuggestions from "./LocationSuggestions";

type Suggestion = { title: string; subtitle: string };

const backgroundImg = require("@/assets/images/map-bg.jpg");
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Home = () => {
  const [address, setAddress] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const cardAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0.1)).current;
  const navigation = useNavigation();

  const areaSuggestions = [
    { title: "Thamel", subtitle: "Kathmandu" },
    { title: "Baneshwor", subtitle: "Kathmandu" },
    { title: "Lazimpat", subtitle: "Kathmandu" },
    { title: "Jawalakhel", subtitle: "Lalitpur" },
    { title: "Kumaripati", subtitle: "Lalitpur" },
    { title: "Boudha", subtitle: "Kathmandu" },
    { title: "Kalanki", subtitle: "Kathmandu" },
    { title: "Patan", subtitle: "Lalitpur" },
    { title: "Baluwatar", subtitle: "Kathmandu" },
    { title: "Maharajgunj", subtitle: "Kathmandu" },
  ];

  const filteredSuggestions =
    address.trim().length === 0
      ? areaSuggestions
      : areaSuggestions.filter((s) =>
          s.title.toLowerCase().includes(address.trim().toLowerCase())
        );

  const cardHeight = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [275, SCREEN_HEIGHT * 0.92],
  });

  const cardRadius = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: inputFocused ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();

    Animated.timing(overlayOpacity, {
      toValue: inputFocused ? 0.4 : 0.1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [inputFocused]);

  const handleOverlayPress = () => {
    if (inputFocused) {
      setInputFocused(false);
      Keyboard.dismiss();
    }
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setAddress(suggestion.title);
    setInputFocused(false);
    Keyboard.dismiss();
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: inputFocused
                ? "rgba(0,0,0,0.4)"
                : "rgba(0,0,0,0.1)",
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <TouchableOpacity
        style={styles.sidebarBtn}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Feather name="menu" size={28} color={colors.primary} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.card,
          {
            height: cardHeight,
            borderTopLeftRadius: cardRadius,
            borderTopRightRadius: cardRadius,
          },
        ]}
      >
        {/* Always visible title & subtitle */}
        <Text style={styles.title}>Let's get you fixed up!</Text>
        <Text style={styles.subtitle}>
          We'll connect you with nearby professionals in seconds.
        </Text>

        {/* Close button when focused */}
        {inputFocused && (
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              setInputFocused(false);
              Keyboard.dismiss();
            }}
          >
            <Feather name="x" size={26} color={colors.grey600} />
          </TouchableOpacity>
        )}

        {/* Input always visible */}
        <View style={styles.inputContainer}>
          <Feather
            name="map-pin"
            size={20}
            color={colors.grey500}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            placeholderTextColor={colors.grey500}
            value={address}
            onChangeText={setAddress}
            onFocus={() => setInputFocused(true)}
          />
        </View>

        {/* Expanded state */}
        {inputFocused && (
          <>
            <TouchableOpacity style={styles.chooseOnMapBtn}>
              <Text style={styles.chooseOnMapText}>Choose on map</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, width: "100%" }}>
              <LocationSuggestions
                suggestions={filteredSuggestions}
                onSelect={(suggestion) => {
                  setAddress(suggestion.title);
                  setInputFocused(false);
                  Keyboard.dismiss();
                }}
              />
            </View>
          </>
        )}

        {/* Search button only when collapsed */}
        {!inputFocused && (
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Start a search</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  sidebarBtn: {
    position: "absolute",
    top: 50,
    left: 24,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 10,
    zIndex: 9,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.97)",
    padding: 24,
    elevation: 8,
    alignItems: "center",
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey300,
    paddingHorizontal: 16,
    backgroundColor: colors.grey100,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.grey600,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: fonts.regular,
  },
  searchBtn: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fonts.medium,
  },
  chooseOnMapBtn: {
    marginTop: 6,
    marginBottom: 8,
    padding: 8,
  },
  chooseOnMapText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
