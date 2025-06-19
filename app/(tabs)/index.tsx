import { LocationCard } from "@/components/Cards/LocationCard";
import { WeatherCard } from "@/components/Cards/WeatherCard";
import Header from "@/components/Header";
import NotificationCard from "@/components/Cards/NotificationCard";
import { SlidingTabs } from "@/components/SlidingTabs";
import { useWeatherData } from "@/hooks/useWeatherData";
import { THEME_COLORS, type ColorScheme } from "@/types/colourTypes";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { ScrollView, YStack } from "tamagui";
import HomeGoodWeather from "../../assets/images/HomeGoodWeather.png";
import { useWeatherNotification } from "@/hooks/useWeatherNotification";

const TABS = [
  { key: "teal", label: "Now" },
  { key: "blue", label: "Tomorrow" },
  { key: "purple", label: "Next 5 Days" },
] as const;

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ColorScheme>("teal");
  const { data, loading } = useWeatherData(activeTab);
  const { notification, closeNotification } = useWeatherNotification(activeTab);
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
            <WeatherCard data={data} loading={loading} variant="now" />
          )}
          {activeTab === "blue" && (
            <WeatherCard data={data} loading={loading} variant="tomorrow" />
          )}
          {activeTab === "purple" && data?.daily?.time && (
            <WeatherCard data={data} loading={loading} variant="5-day" />
          )}
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}
