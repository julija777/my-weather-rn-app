import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/hourly-weather-screen"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </TamaguiProvider>
  );
}
