import BackButton from '@/components/BackButton';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

const UnderConstructionScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
          <BackButton />
      </View>

      <View style={styles.backgroundPattern}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          },
        ]}
      >
        {/* Main Icon */}
        <View style={styles.iconContainer}>
          <Animated.View
            style={[
              styles.gearIcon,
              { transform: [{ rotate: spin }] }
            ]}
          >
            <MaterialIcons name="settings" size={80} color="#64748b" />
          </Animated.View>
          <View style={styles.hammerIcon}>
            <MaterialIcons name="build" size={40} color="#f59e0b" />
          </View>
        </View>

        {/* Main Text */}
        <Text style={styles.title}>Page Under Construction</Text>
        <Text style={styles.subtitle}>
          We're working hard to bring you something amazing
        </Text>

        {/* Feature List */}
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Feather name="check-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Modern Design</Text>
          </View>
          <View style={styles.featureItem}>
            <Feather name="check-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Enhanced Performance</Text>
          </View>
          <View style={styles.featureItem}>
            <Feather name="clock" size={16} color="#f59e0b" />
            <Text style={styles.featureText}>Coming Soon</Text>
          </View>
        </View>

        {/* Contact Info */}
        <Text style={styles.contactText}>
          Have questions? We'd love to hear from you
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(148, 163, 184, 0.03)',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: -50,
    left: -50,
  },
  circle3: {
    width: 150,
    height: 150,
    top: '40%',
    right: -75,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hammerIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 280,
  },
  featureList: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#475569',
    marginLeft: 12,
    fontWeight: '500',
  },
  contactText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default UnderConstructionScreen; 