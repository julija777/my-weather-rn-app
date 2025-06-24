import React from "react";

import { YStack, XStack, Text } from "tamagui";
import { Clock, Droplets, Wind } from "lucide-react-native";
import { WEATHER_DESCRIPTIONS } from "@/constants/constants";
import { WeatherIcon } from "@/components/WeatherIcon";

import { colours } from "@/themes/colours";

const getWeatherDescription = (code: number): string =>
  WEATHER_DESCRIPTIONS[code] || "Weather data unavailable";

export const HourlyWeatherCard = ({
  time,
  temperature,
  weatherCode,
  humidity,
  windSpeed,
  precipitation,
}: {
  time: string;
  temperature: number;
  weatherCode: number;
  humidity?: number;
  windSpeed?: number;
  precipitation?: number;
}) => {
  const date = new Date(time);
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const description = getWeatherDescription(weatherCode);

  return (
    <YStack
      backgroundColor={colours.moreBackground}
      borderRadius="$4"
      padding="$4"
      marginBottom="$2"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(255, 255, 255, 0.2)"
    >
      {/* Time and Temperature */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$3"
      >
        <XStack alignItems="center" gap="$2">
          <Clock size={20} color="white" />
          <Text fontSize="$5" fontWeight="600" color="white">
            {timeString}
          </Text>
        </XStack>
        <Text fontSize="$7" fontWeight="bold" color="white">
          {temperature}°C
        </Text>
      </XStack>

      {/* Weather Icon and Description */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$3"
      >
        <WeatherIcon weatherCode={weatherCode} size={48} />
        <YStack flex={1} marginLeft="$3">
          <Text
            fontSize="$4"
            fontWeight="600"
            color="white"
            textTransform="capitalize"
          >
            {description}
          </Text>
        </YStack>
      </XStack>

      {/* Weather Details */}
      <XStack justifyContent="space-between" gap="$2">
        {humidity !== undefined && (
          <XStack alignItems="center" gap="$1" flex={1}>
            <Droplets size={16} color="white" />
            <Text fontSize="$3" color="white">
              {humidity}%
            </Text>
          </XStack>
        )}
        {windSpeed !== undefined && (
          <XStack alignItems="center" gap="$1" flex={1}>
            <Wind size={16} color="white" />
            <Text fontSize="$3" color="white">
              {windSpeed} km/h
            </Text>
          </XStack>
        )}
        {precipitation !== undefined && (
          <XStack alignItems="center" gap="$1" flex={1}>
            <Droplets size={16} color="white" />
            <Text fontSize="$3" color="white">
              {precipitation} mm
            </Text>
          </XStack>
        )}
      </XStack>
    </YStack>
  );
};
