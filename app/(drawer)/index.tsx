import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const backgroundImg = require("@/assets/images/map-bg.jpg");
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Home = () => {
  const [address, setAddress] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const cardAnim = useRef(new Animated.Value(200)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 0,
      duration: 900,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const keyboardShow =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHide =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const handleKeyboardShow = (e: any) => {
      setKeyboardVisible(true);
      Animated.parallel([
        Animated.timing(keyboardOffset, {
          toValue: e.endCoordinates ? e.endCoordinates.height : 260,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.4, // Darker when keyboard is up
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const handleKeyboardHide = () => {
      setKeyboardVisible(false);
      Animated.parallel([
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.1, // Lighter when keyboard is down
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const showSub = Keyboard.addListener(keyboardShow, handleKeyboardShow);
    const hideSub = Keyboard.addListener(keyboardHide, handleKeyboardHide);
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Overlay press handler to dismiss keyboard
  const handleOverlayPress = () => {
    if (keyboardVisible) Keyboard.dismiss();
  };
  const overlayOpacity = useRef(new Animated.Value(0.1)).current;

  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay for contrast and keyboard dismiss */}
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: overlayOpacity.interpolate({
                inputRange: [0.1, 0.4],
                outputRange: ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"],
              }),
            },
          ]}
          pointerEvents="box-none"
        />
      </TouchableWithoutFeedback>

      {/* Sidebar/Menu Button */}
      <TouchableOpacity
        style={styles.sidebarBtn}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Feather name="menu" size={28} color={colors.primary} />
      </TouchableOpacity>

      {/* Animated Card */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateY: cardAnim },
              { translateY: Animated.multiply(keyboardOffset, -1) },
            ],
          },
        ]}
      >
        {/* Icon */}
        <Feather
          name="tool"
          size={36}
          color={colors.primary}
          style={{ marginBottom: 12 }}
        />

        {/* Title & Subtitle */}
        <Text style={styles.title}>Let's get you fixed up!</Text>
        <Text style={styles.subtitle}>
          We'll connect you with nearby professionals in seconds.
        </Text>

        {/* Input with icon */}
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
          />
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>Find Technicians</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 10,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.97)",
    paddingBottom: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    alignItems: "center",
    zIndex: 2,
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
    marginBottom: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  searchBtn: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  searchBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: fonts.medium,
  },
});
