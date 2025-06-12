import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();

  const drawerItems = [
    { label: "Home", route: "/", icon: "home" },
    { label: "Profile", route: "/profile", icon: "user" },
    { label: "Message", route: "/message", icon: "message-square" },
    { label: "Settings", route: "/settings", icon: "settings" },
  ];

  const handleTechnicianMode = () => {
    router.push("/technician"); // or toggle some technician state
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("@/assets/images/PlumberFinderLogo.png")}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.menuContainer}>
          {drawerItems.map((item) => {
            const isActive = pathname === item.route;
            return (
              <DrawerItem
                key={item.route}
                label={({ focused }) => (
                  <Text
                    style={[
                      styles.drawerLabel,
                      (isActive || focused) && styles.activeLabel,
                    ]}
                  >
                    {item.label}
                  </Text>
                )}
                onPress={() => router.push(item.route as any)}
                icon={({ focused }) => (
                  <Feather
                    name={item.icon as any}
                    size={22}
                    color={
                      isActive || focused ? colors.primary : colors.grey500
                    }
                  />
                )}
                style={[
                  styles.drawerItem,
                  isActive && styles.activeItem,
                ]}
                focused={isActive}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Technician Mode Button */}
      <Pressable style={styles.bottomButton} onPress={handleTechnicianMode}>
        <Text style={styles.bottomButtonText}>Technician Mode</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingTop: 0,
  },
  header: {
    paddingLeft:15,
    paddingTop: 55,
  },
  logo: {
    width: 170,
    height: 60,
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey200,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  menuContainer: {
    paddingTop: 4,
  },
  drawerItem: {
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 2,
    overflow: "hidden",
  },
  activeItem: {
    backgroundColor: colors.primary + "15",
  },
  drawerLabel: {
    fontSize: 16,
    color: colors.grey700,
    fontFamily: fonts.medium,
  },
  activeLabel: {
    color: colors.primary,
    fontFamily: fonts.bold,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    gap: 10,
    marginBottom: 60,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  bottomButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.medium,
  },
});
