import { useEffect, useState } from "react";
import { useWeatherData } from "./useWeatherData";
import { fetchUVData } from "@/services/weatherService";
import { WEATHER_DESCRIPTIONS } from "@/constants/constants";

export interface NotificationData {
  type: "sun" | "rain" | null;
  icon: string;
  message: string;
  description: string;
}

export function useWeatherNotification(activeTab: string) {
  const { data, loading } = useWeatherData(activeTab);
  const [uvIndex, setUvIndex] = useState<number>(0);
  const [notification, setNotification] = useState<NotificationData | null>(
    null,
  );
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);

  // Fetch UV data when we have weather data for 'now'/'teal' tab
  useEffect(() => {
    if (activeTab === "teal" && data?.current_weather) {
      fetchUVData()
        .then((uvData) => setUvIndex(uvData.uv_index))
        .catch(() => setUvIndex(0));
    }
  }, [activeTab, data]);

  // Generate notification based on weather conditions
  useEffect(() => {
    if (!data || activeTab !== "teal" || !data.current_weather) {
      setNotification(null);
      return;
    }

    const weatherCode = data.current_weather.weathercode;

    // Sun protection notification for codes 0-3
    if (weatherCode >= 0 && weatherCode <= 3) {
      setNotification({
        type: "sun",
        icon: "☀️",
        message: `Today the UV index is ${uvIndex}`,
        description: "Protect your skin from the sun!",
      });
      return;
    }

    // Umbrella notification for codes 61-67 and 80-86
    if (
      (weatherCode >= 61 && weatherCode <= 67) ||
      (weatherCode >= 80 && weatherCode <= 86)
    ) {
      const weatherDescription =
        WEATHER_DESCRIPTIONS[weatherCode] || "rainy weather";
      setNotification({
        type: "rain",
        icon: "☂️",
        message: "Take your umbrella today",
        description: `Today ${weatherDescription.toLowerCase()} is expected`,
      });
      return;
    }

    // No notification for other weather codes
    setNotification(null);
  }, [data, activeTab, uvIndex]);

  const closeNotification = () => {
    setIsNotificationVisible(false);
  };

  const shouldShowNotification = notification && isNotificationVisible;

  return {
    notification: shouldShowNotification ? notification : null,
    closeNotification,
    loading,
  };
}
