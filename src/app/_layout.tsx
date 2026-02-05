import { ThemeProvider } from "@/components/theme-provider";
import { RouteProvider } from "@/context/route-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Stack from "expo-router/stack";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <RouteProvider>
        <TabsLayout />
      </RouteProvider>
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="(explore)"
        options={{
          title: "Explore",
          tabBarIcon: (props) => <MaterialIcons {...props} name="explore" />,
        }}
      />
      <WebTabs.Screen
        name="(route)"
        options={{
          title: "My Route",
          tabBarIcon: (props) => <MaterialIcons {...props} name="directions" />,
        }}
      />
      <WebTabs.Screen
        name="(map)"
        options={{
          title: "Map",
          tabBarIcon: (props) => <MaterialIcons {...props} name="map" />,
        }}
      />
      <WebTabs.Screen name="bar" options={{ href: null }} />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(explore)">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "magnifyingglass", selected: "magnifyingglass" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="explore" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(route)">
        <NativeTabs.Trigger.Label>My Route</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "map", selected: "map.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="directions" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(map)">
        <NativeTabs.Trigger.Label>Map</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "location", selected: "location.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="map" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Screen name="bar" options={{ href: null }}>
        <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
          <Stack.Screen name="[id]" />
        </Stack>
      </NativeTabs.Screen>
    </NativeTabs>
  );
}
