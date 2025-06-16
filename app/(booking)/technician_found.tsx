import BackButton from "@/components/BackButton";
import { fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  ArrowRight, 
  Star, 
  Clock, 
  CurrencyCircleDollar, 
  ChatCircle, 
  Phone,
  MapPin,
  Shield
} from "phosphor-react-native";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TechnicianFoundScreen = () => {
  const { type, subProblem } = useLocalSearchParams();
  const router = useRouter();

  const handleStartChat = () => {
    router.push("/(chat)/chat");
  };

  const handleCall = () => {
    // Handle phone call
    console.log("Calling technician...");
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      <View style={styles.container}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#1e40af', '#3b82f6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <BackButton />
            <Text style={styles.headerTitle}>Technician Found</Text>
            <View style={styles.headerSpacer} />
          </View>
          <Text style={styles.headerSubtitle}>
            Perfect match for your {subProblem} request
          </Text>
        </LinearGradient>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Success Badge */}
          <View style={styles.successBadge}>
            <Shield size={20} color="#10b981" weight="fill" />
            <Text style={styles.successText}>Verified Professional Found</Text>
          </View>

          {/* Technician Card */}
          <View style={styles.technicianCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("@/assets/images/technician_sample.jpg")}
                style={styles.avatar}
              />
              <View style={styles.onlineIndicator} />
            </View>
            
            <Text style={styles.name}>Sujan Shrestha</Text>
            <Text style={styles.role}>{type} Specialist</Text>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#fbbf24" weight="fill" />
                ))}
              </View>
              <Text style={styles.ratingText}>5.0 (42 reviews)</Text>
            </View>

            {/* Location */}
            <View style={styles.locationRow}>
              <MapPin size={16} color="#6b7280" weight="fill" />
              <Text style={styles.locationText}>2.1 km away</Text>
            </View>
          </View>

          {/* Service Details */}
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Service Details</Text>
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Clock size={20} color="#2563eb" weight="fill" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Estimated Arrival</Text>
                <Text style={styles.detailValue}>10-15 minutes</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <CurrencyCircleDollar size={20} color="#2563eb" weight="fill" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Service Charge</Text>
                <Text style={styles.detailValue}>Rs. 1,500</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Shield size={20} color="#2563eb" weight="fill" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Experience</Text>
                <Text style={styles.detailValue}>5+ years</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Phone size={20} color="#2563eb" weight="fill" />
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
              <ChatCircle size={20} color="#ffffff" weight="fill" />
              <Text style={styles.chatButtonText}>Start Chat</Text>
              <ArrowRight size={16} color="#ffffff" weight="bold" />
            </TouchableOpacity>
          </View>

          {/* Additional Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>What happens next?</Text>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>The technician will contact you shortly</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>They'll arrive at your location within 15 minutes</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Service will be completed professionally</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TechnicianFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40, // Same width as BackButton for centering
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecfdf5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 8,
  },
  successText: {
    fontSize: 14,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#10b981',
  },
  technicianCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#e5e7eb',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10b981',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: '#1f2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: '#6b7280',
    marginBottom: 16,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#374151',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#6b7280',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#1f2937',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#6b7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#1f2937',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: '#2563eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  callButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#2563eb',
  },
  chatButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  chatButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: '#ffffff',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#1f2937',
    marginBottom: 16,
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: '#ffffff',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#4b5563',
    lineHeight: 20,
  },
});