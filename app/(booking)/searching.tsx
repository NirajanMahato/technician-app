// app/(booking)/searching.tsx
import { fonts } from "@/constants/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

const SearchingScreen = () => {
  const { type, subProblem, searchType } = useLocalSearchParams<{
    type: string;
    subProblem: string;
    searchType: string;
  }>();
  const router = useRouter();
  const animationRef = useRef<LottieView>(null);
  
  // Animation values for pulsing circles
  const pulse1Anim = useRef(new Animated.Value(0)).current;
  const pulse2Anim = useRef(new Animated.Value(0)).current;
  const pulse3Anim = useRef(new Animated.Value(0)).current;

  // Add these animation values at the top with other animations
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start pulse animations
    const startPulseAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startPulseAnimation(pulse1Anim, 0);
    startPulseAnimation(pulse2Anim, 500);
    startPulseAnimation(pulse3Anim, 1000);

    // Add this to the existing useEffect
    const startDotAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 1400,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startDotAnimation(dot1Anim, 0);
    startDotAnimation(dot2Anim, 200);
    startDotAnimation(dot3Anim, 400);

    // Simulate technician search delay
    const timeout = setTimeout(() => {
      router.replace({
        pathname: "/(booking)/technician_found",
        params: { type, subProblem },
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  // Interpolate values for pulse animations
  const pulse1Scale = pulse1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const pulse2Scale = pulse2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const pulse3Scale = pulse3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const pulse1Opacity = pulse1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });

  const pulse2Opacity = pulse2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });

  const pulse3Opacity = pulse3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });

  // Add these interpolations with other interpolations
  const dot1Opacity = dot1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const dot2Opacity = dot2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const dot3Opacity = dot3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      
      <LinearGradient
        colors={['#1e40af', '#3b82f6', '#60a5fa']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Finding Your Expert</Text>
          <Text style={styles.headerSubtitle}>
            Searching for qualified {type?.toLowerCase()} specialists in your area
          </Text>
        </View>

        {/* Animation Section */}
        <View style={styles.animationContainer}>
          <View style={styles.animationWrapper}>
            <LottieView
              ref={animationRef}
              source={require("@/assets/lottie/searching.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
          
          {/* Pulsing Circles for Loading Effect */}
          <View style={styles.pulseContainer}>
            <Animated.View 
              style={[
                styles.pulseCircle,
                {
                  transform: [{ scale: pulse1Scale }],
                  opacity: pulse1Opacity,
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.pulseCircle,
                {
                  transform: [{ scale: pulse2Scale }],
                  opacity: pulse2Opacity,
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.pulseCircle,
                {
                  transform: [{ scale: pulse3Scale }],
                  opacity: pulse3Opacity,
                }
              ]} 
            />
          </View>
        </View>

        {/* Status Section */}
        <View style={styles.statusSection}>
          <Text style={styles.statusText}>Looking for technicians nearby...</Text>
          <Text style={styles.statusSubtext}>
            This usually takes 10-30 seconds
          </Text>
          
          {/* Loading Dots */}
          <View style={styles.loadingDots}>
            <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>Service Details</Text>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceLabel}>Service Type:</Text>
            <Text style={styles.serviceValue}>{type}</Text>
          </View>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceLabel}>Issue:</Text>
            <Text style={styles.serviceValue}>{subProblem}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SearchingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  animationWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 150,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  animation: {
    width: 200,
    height: 200,
  },
  pulseContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statusSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  statusText: {
    fontSize: 18,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusSubtext: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  serviceInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  serviceValue: {
    fontSize: 14,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#ffffff',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
});