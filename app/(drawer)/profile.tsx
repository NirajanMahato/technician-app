import { colors } from '@/constants/theme'
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const user = {
  name: 'John',
  email: 'johndoe44@gmail.com',
  number: '+977 9800000000',
}

const options = [
  {
    key: 'bookings',
    label: 'My Bookings',
    icon: <FontAwesome5 name="calendar-check" size={18} color="#2563eb" />,
  },
  {
    key: 'addresses',
    label: 'Saved Addresses',
    icon: <Ionicons name="location-sharp" size={18} color="#2563eb" />,
  },
  {
    key: 'payments',
    label: 'Payment Methods',
    icon: <Feather name="credit-card" size={18} color="#2563eb" />,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: <Ionicons name="notifications" size={18} color="#2563eb" />,
  },
  {
    key: 'support',
    label: 'Help & Support',
    icon: <AntDesign name="questioncircleo" size={18} color="#2563eb" />,
  },
]

const Profile = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const handleOptionPress = (key: string) => {
    if (key === 'logout') {
      router.replace("/(auth)/login");
    } else {
      alert(`Pressed: ${key}`);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.sidebarBtn}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="menu" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          My Profile</Text>
        
      </View>

      <View style={styles.userInfoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>
            Hello, <Text style={styles.highlight}>{user.name}</Text>
          </Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.number}>{user.number}</Text>
          <TouchableOpacity style={styles.editBtn} onPress={() => handleOptionPress('edit')}>
            <Feather name="edit-2" size={13} color="#fff" />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBg}>
            <Feather name="user" size={32} color="#fff" />
          </View>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.key}
            style={styles.option}
            onPress={() => handleOptionPress(option.key)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>{option.icon}</View>
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Feather name="chevron-right" size={20} color="#b6b6b6" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => handleOptionPress('logout')}
          activeOpacity={0.7}
        >
          <View style={styles.logoutIconBg}>
            <MaterialIcons name="logout" size={18} color="#dc2626" />
          </View>
          <Text style={styles.logoutLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 16,
  },
  sidebarBtn: {
    position: 'absolute',
    left: 0,
    top: 7,
    padding: 8,
    // backgroundColor: 'rgba(255,255,255,0.95)',
    // borderRadius: 16,
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 4,
    // zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop:20,
    marginBottom: 24,
  },
  avatarContainer: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBg: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  highlight: {
    color: colors.primary,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  number: {
    fontSize: 14,
    color: '#6b7280',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  optionsContainer: {
    marginTop: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  logoutIconBg: {
    backgroundColor: '#fee2e2',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutLabel: {
    fontSize: 15,
    color: '#dc2626',
    fontWeight: '600',
  },
})
