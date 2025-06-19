import React from "react";
import { YStack, Text, View, Spinner } from "tamagui";
import { WEATHER_DESCRIPTIONS } from "@/constants/constants";
import { THEME_COLORS } from "@/types/colourTypes";
import { WeatherIcon } from "../WeatherIcon";
import { glassCardStyle } from "../ui/glassCardStyle";


interface WeatherCardProps {
  data: any;
  loading: boolean;
  variant: "now" | "tomorrow" | "5-day";
  unitSymbol?: string;
  city?: string;
  country?: string;
  unit?: "metric" | "imperial";
}

const getWeatherDescription = (code: number): string =>
  WEATHER_DESCRIPTIONS[code] || "Weather data unavailable";

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  loading,
  variant,
  unitSymbol = "°C",
  city,
}) => {
  if (loading) {
    return (
      <YStack alignItems="center" justifyContent="center" padding="$4">
        <Spinner size="large" color={THEME_COLORS.teal} />
      </YStack>
    );
  }

  if (!data) {
    return (
      <YStack alignItems="center" justifyContent="center" padding="$4">
        <Text color="red">Weather data unavailable</Text>
      </YStack>
    );
  }

  // Prepare data based on variant
  let temperature = 0;
  let minTemp = 0;
  let maxTemp = 0;
  let weatherCode = 0;
  let time = "";
  let dayLabel = "";

  if (variant === "now") {
    temperature = Math.round(data?.current_weather?.temperature ?? 0);
    weatherCode = data?.current_weather?.weathercode ?? 0;
    time = data?.current_weather?.time ?? "";
    dayLabel = new Date(time).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // Calculate today's min/max from hourly data since daily data is not available for today
    if (data?.hourly?.temperature_2m && data?.hourly?.time) {
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const todayTemperatures: any[] = [];

      // Filter today's temperatures from hourly data
      data.hourly.time.forEach((hourTime: string, index: string | number) => {
        if (hourTime.startsWith(today)) {
          todayTemperatures.push(data.hourly.temperature_2m[index]);
        }
      });

      if (todayTemperatures.length > 0) {
        minTemp = Math.min(...todayTemperatures);
        maxTemp = Math.max(...todayTemperatures);
      } else {
        // Fallback if no today data found
        minTemp = 0;
        maxTemp = 0;
      }
    } else {
      minTemp = 0;
      maxTemp = 0;
    }

    console.log(
      "Today calculated temps - minTemp:",
      minTemp,
      "maxTemp:",
      maxTemp,
    );
  } else if (variant === "tomorrow") {
    // Use the daily data which contains tomorrow's forecast
    if (
      data?.daily?.temperature_2m_min &&
      data?.daily?.temperature_2m_max &&
      data?.daily?.time
    ) {
      minTemp = data.daily.temperature_2m_min[0] ?? 0;
      maxTemp = data.daily.temperature_2m_max[0] ?? 0;
      weatherCode = data.daily.weathercode?.[0] ?? 0;
      temperature = Math.round(maxTemp);
      time = data.daily.time[0] ?? "";
      dayLabel = new Date(time).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    } else {
      // Fallback if daily data is not available
      minTemp = 0;
      maxTemp = 0;
      weatherCode = 0;
      temperature = 0;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      time = tomorrow.toISOString().split("T")[0];
      dayLabel = tomorrow.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }

    console.log(
      "Tomorrow temps - minTemp:",
      minTemp,
      "maxTemp:",
      maxTemp,
      "temperature:",
      temperature,
    );
  } else if (variant === "5-day") {
    // Handle 5-day forecast - render 5 separate cards
    if (!data?.daily?.time) {
      return (
        <YStack alignItems="center" justifyContent="center" padding="$4">
          <Text color="red" textAlign="center">
            5-day forecast data unavailable
          </Text>
        </YStack>
      );
    }

    return (
      <YStack gap="$3" paddingHorizontal="$3">
        {data.daily.time.slice(0, 5).map((date: string, idx: number) => {
          const dayName = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });
          const min = Math.round(data.daily.temperature_2m_min[idx]);
          const max = Math.round(data.daily.temperature_2m_max[idx]);
          const code = data.daily.weathercode[idx];
          const description = getWeatherDescription(code);

          // Determine if this is today or tomorrow for different styling
          const today = new Date().toISOString().split("T")[0];
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const tomorrowString = tomorrow.toISOString().split("T")[0];

          let dayDisplayLabel = "";
          if (date === today) {
            dayDisplayLabel = "Today";
          } else if (date === tomorrowString) {
            dayDisplayLabel = "Tomorrow";
          } else {
            dayDisplayLabel = new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
            });
          }

          return (
            <YStack
              key={date}
              style={glassCardStyle}
              borderRadius="$4"
              padding="$3"
              marginBottom="$2"
              role="region"
              aria-label={`Weather forecast for ${dayName}`}
            >
              <Text fontSize="$6" fontWeight="bold" marginBottom="$2">
                {city}
              </Text>
              <YStack inlineSize={"50%"} gap="$2">
                <Text fontSize={64} fontWeight="bold" color={THEME_COLORS.teal}>
                  {max}°
                  <Text
                    fontSize={32}
                    fontWeight="600"
                    color={THEME_COLORS.teal}
                  >
                    {unitSymbol}
                  </Text>
                </Text>
              </YStack>
              <YStack alignItems="flex-end">
                <WeatherIcon weatherCode={code} size={64} />
                <Text
                  fontSize="$4"
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {description}
                </Text>
                <Text
                  color="$black"
                  fontWeight="bold"
                  fontSize="$2"
                  marginTop="$3"
                >
                  Min {min}
                  {unitSymbol} • Max {max}
                  {unitSymbol}
                </Text>
              </YStack>

              <Text fontSize="$7" fontWeight="600">
                {dayDisplayLabel}
              </Text>
              <Text
                fontSize="$4"
                color="$black"
                fontWeight="bold"
                marginTop="$1"
              >
                {dayName}
              </Text>
            </YStack>
          );
        })}
      </YStack>
    );
  }

  const weatherDescription = getWeatherDescription(weatherCode);

  return (
    <YStack
      style={glassCardStyle}
      borderRadius="$4"
      padding="$3"
      marginHorizontal="$3"
      role="region"
      aria-label="Weather Information"
    >
      <Text fontSize="$6" fontWeight="bold" marginBottom="$2">
        {city}
      </Text>
      <YStack inlineSize={"50%"} gap="$2">
        <Text fontSize={64} fontWeight="bold" color={THEME_COLORS.teal}>
          {temperature}°
          <Text fontSize={32} fontWeight="600" color={THEME_COLORS.teal}>
            {unitSymbol}
          </Text>
        </Text>
      </YStack>
      <YStack alignItems="flex-end">
        <WeatherIcon weatherCode={weatherCode} size={64} />
        <Text fontSize="$4" textTransform="capitalize" fontWeight="bold">
          {weatherDescription}
        </Text>
        <Text color="$black" fontWeight="bold" fontSize="$2" marginTop="$3">
          Min {minTemp}
          {unitSymbol} • Max {maxTemp}
          {unitSymbol}
        </Text>
      </YStack>

      <Text fontSize="$7" fontWeight="600">
        {variant === "tomorrow"
          ? "Tomorrow"
          : time
            ? new Date(time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : ""}
      </Text>
      <Text fontSize="$4" color="$black" fontWeight="bold" marginTop="$1">
        {dayLabel}
      </Text>
    </YStack>
  );
};
