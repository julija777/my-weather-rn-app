import { Router } from "expo-router";
import { ColorScheme } from "@/types/colourTypes";

export function handleWeatherCardPress(activeTab: ColorScheme, router: Router) {
  if (activeTab === "teal") {
    router.push({
      pathname: "/screens/hourly-weather-screen",
      params: { day: "today" },
    });
  } else if (activeTab === "blue") {
    router.push({
      pathname: "/screens/hourly-weather-screen",
      params: { day: "tomorrow" },
    });
  }
}
