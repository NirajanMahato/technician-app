import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icons from "phosphor-react-native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {

  const tabbarIcons: Record<
    string,
    (isFocused: boolean) => React.ReactElement
  > = {
    requests: (isFocused) => (
      <Icons.ListBullets
        size={verticalScale(30)}
        weight="regular"
        color={isFocused ? colors.primary : colors.grey600}
      />
    ),
    messages: (isFocused) => (
      <Icons.Chat
        size={verticalScale(30)}
        weight="regular"
        color={isFocused ? colors.primary : colors.grey600}
      />
    ),
    profile: (isFocused) => (
      <Icons.User
        size={verticalScale(30)}
        weight="regular"
        color={isFocused ? colors.primary : colors.grey600}
      />
    ),
  };

  const tabbarLabels: Record<string, string> = {
    requests: "Requests",
    messages: "Messages",
    profile: "Profile",
  };

  return (
    <View style={[styles.tabbar, { paddingBottom:  18 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const rawLabel = options.tabBarLabel ?? options.title ?? route.name;
        const label =
          typeof rawLabel === "string"
            ? rawLabel
            : tabbarLabels[route.name] || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            <View style={styles.iconWrapper}>
              {tabbarIcons[route.name]?.(isFocused)}
              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? colors.primary : colors.grey600,
                    fontWeight: isFocused ? "bold" : "normal",
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(65),
    backgroundColor: colors.white,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: colors.grey200,
    borderTopWidth: 1,
  },
  tabbarItem: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
  },
});
