import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { View } from "react-native";

const DrawerLayout = () => (
  <View style={{ flex: 1 }}>
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "78%" },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    />
  </View>
);

export default DrawerLayout;