// app/(booking)/searching.tsx
import Typo from "@/components/Typo";
import { fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, StatusBar, StyleSheet, Text, View } from "react-native";

const SearchingScreen = () => {
  const { type, subProblem } = useLocalSearchParams<{
    type: string;
    subProblem: string;
  }>();
  const router = useRouter();
  
  const dot1 = useRef(new Animated.Value(0.3)).current;     // Simple dot animation
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDot = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);

    // Navigate after delay
    const timeout = setTimeout(() => {
      router.replace({
        pathname: "/(booking)/technician_found",
        params: { type, subProblem },
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Typo style={styles.title}>Finding Your Expert</Typo>
      </View>

      <View style={styles.animationContainer}>
        <LottieView
          source={require("@/assets/lottie/searching.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Looking for technicians nearby</Text>
        
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { opacity: dot1 }]} />
          <Animated.View style={[styles.dot, { opacity: dot2 }]} />
          <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
      </View>

      <View style={styles.serviceCard}>
        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Service</Text>
          <Text style={styles.serviceValue}>{type}</Text>
        </View>
        <View style={styles.serviceDivider} />
        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Issue</Text>
          <Text style={styles.serviceValue}>{subProblem}</Text>
        </View>
      </View>
    </View>
  );
};

export default SearchingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop:80,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: '#1f2937',
    textAlign: 'center',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    marginBottom: 20,
  },
  animation: {
    width: 250,
    height: 250,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statusText: {
    fontSize: 18,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#1f2937',
    marginBottom: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  serviceCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  serviceDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 2,
  },
  serviceLabel: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#6b7280',
  },
  serviceValue: {
    fontSize: 14,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#1f2937',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
});