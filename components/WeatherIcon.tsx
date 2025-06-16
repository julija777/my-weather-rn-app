import React from "react";
import { View } from "tamagui";
import { PartlyCloudyIcon } from "@/assets/icons/PartlyCloudyIcon";
import {
  SunIcon,
  CloudyIcon,
  RainIcon,
  SnowIcon,
  ThunderstormIcon,
  FogIcon,
} from "@/assets/icons/WeatherIcons";

interface WeatherIconProps {
  weatherCode: number;
  size?: number;
}

const getWeatherIcon = (code: number) => {
  // Clear sky conditions
  if (code === 0) return SunIcon;

  // Mainly clear
  if (code === 1) return SunIcon;

  // Partly cloudy
  if (code === 2) return PartlyCloudyIcon;

  // Overcast
  if (code === 3) return CloudyIcon;

  // Fog conditions
  if (code >= 45 && code <= 48) return FogIcon;

  // Drizzle conditions (light rain icon)
  if (code >= 51 && code <= 57) return RainIcon;

  // Rain conditions
  if (code >= 61 && code <= 67) return RainIcon;

  // Snow conditions
  if (code >= 71 && code <= 77) return SnowIcon;

  // Rain showers
  if (code >= 80 && code <= 82) return RainIcon;

  // Snow showers
  if (code >= 85 && code <= 86) return SnowIcon;

  // Thunderstorm conditions
  if (code >= 95 && code <= 99) return ThunderstormIcon;

  // Default fallback
  return PartlyCloudyIcon;
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  weatherCode,
  size = 64,
}) => {
  const IconComponent = getWeatherIcon(weatherCode);

  return (
    <View width={size} height={size}>
      <IconComponent size={size} />
    </View>
  );
};
