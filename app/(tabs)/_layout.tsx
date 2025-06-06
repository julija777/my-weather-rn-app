import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Text } from 'tamagui'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => <Text>{'Title'}</Text>,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20
        },
        headerStyle: {
          backgroundColor: '#00596B'
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flyaway"
        options={{
          title: 'FlyAway',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
