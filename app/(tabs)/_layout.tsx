import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                marginTop: 8,
                marginBottom: 4,
              }}
            >
              <Ionicons name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="flyaway"
        options={{
          title: "FlyAway",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                marginTop: 8,
                marginBottom: 4,
              }}
            >
              <Ionicons name="airplane" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                marginTop: 8,
                marginBottom: 4,
              }}
            >
              <Ionicons name="ellipsis-horizontal" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
