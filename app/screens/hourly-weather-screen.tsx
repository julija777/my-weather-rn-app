import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, YStack, Text, Spinner } from "tamagui";
import { useHourlyWeatherData } from "@/hooks/useHourlyWeatherData";
import { colours } from "@/themes/colours";
import { HourlyHeader } from "@/components/Headers/HourlyHeader";
import { HourlyWeatherCard } from "@/components/Cards/HourlyWeatherCard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

export default function HourlyWeatherScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const router = useRouter();
  const { data, loading, error } = useHourlyWeatherData(
    day as "today" | "tomorrow",
  );

  if (loading) return <LoadingState />;
  if (error || !data)
    return (
      <ErrorState
        message={error || "Unable to load hourly weather data"}
        onBack={router.back}
      />
    );

  return (
    <>
      <HourlyHeader day={day || "today"} onBack={router.back} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        backgroundColor={colours.glassBackgroundColor}
      >
        <YStack gap="$3">
          {data.hourly.time.map((time: string, index: number) => (
            <HourlyWeatherCard
              key={time}
              time={time}
              temperature={Math.round(data.hourly.temperature_2m[index])}
              weatherCode={data.hourly.weathercode?.[index] || 0}
              humidity={data.hourly.relative_humidity_2m?.[index]}
              windSpeed={data.hourly.wind_speed_10m?.[index]}
              precipitation={data.hourly.precipitation?.[index]}
            />
          ))}
        </YStack>
      </ScrollView>
    </>
  );
}
