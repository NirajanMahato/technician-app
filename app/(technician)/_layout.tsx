import CustomTabs from "@/components/CustomTabs";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const TechnicianLayout = () => (
  <View style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={(props) => <CustomTabs {...props} />}
    >
      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarLabel: "Requests",
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarLabel: "Messages",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  </View>
);

export default TechnicianLayout;
