import { LocationCard } from "@/components/Cards/LocationCard";
import NotificationCard from "@/components/Cards/NotificationCard";
import { WeatherCard } from "@/components/Cards/WeatherCard";
import Header from "@/components/Headers/Header";
import { SlidingTabs } from "@/components/SlidingTabs";
import { TABS } from "@/constants/constants";
import { useLocation } from "@/hooks/useLocation";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useWeatherNotification } from "@/hooks/useWeatherNotification";
import { THEME_COLORS, type ColorScheme } from "@/types/colourTypes";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { ScrollView, YStack } from "tamagui";
import HomeGoodWeather from "../../assets/images/HomeGoodWeather.png";
import { handleWeatherCardPress } from "@/services/handleWeatherCardPress";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ColorScheme>("teal");
  const { data, loading } = useWeatherData(activeTab);
  const { city } = useLocation();
  const { notification, closeNotification } = useWeatherNotification(activeTab);
  const router = useRouter();
  const userName = "Team";

  return (
    <ImageBackground
      source={HomeGoodWeather}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Header
        color={THEME_COLORS[activeTab]}
        title={`Good afternoon, ${userName}`}
        notification={
          notification ? (
            <NotificationCard
              icon={notification.icon}
              message={notification.message}
              description={notification.description}
              backgroundColor="white"
              onClose={closeNotification}
            />
          ) : null
        }
      />
      <SlidingTabs
        options={TABS}
        active={activeTab}
        onChange={setActiveTab}
        themeColors={activeTab}
      />
      <LocationCard />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <YStack>
          {activeTab === "teal" && (
            <WeatherCard
              data={data}
              loading={loading}
              variant="now"
              city={city || "Unknown Location"}
              onPress={() => handleWeatherCardPress(activeTab, router)}
            />
          )}
          {activeTab === "blue" && (
            <WeatherCard
              data={data}
              loading={loading}
              variant="tomorrow"
              city={city || "Unknown Location"}
              onPress={() => handleWeatherCardPress(activeTab, router)}
            />
          )}
          {activeTab === "purple" && data?.daily?.time && (
            <WeatherCard
              data={data}
              loading={loading}
              variant="5-day"
              city={city || "Unknown Location"}
              // No onPress for 5-day forecast as it shows multiple days already
            />
          )}
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}
