import { PartlyCloudyIcon } from '@/assets/icons/PartlyCloudyIcon';
import { WEATHER_DESCRIPTIONS } from '@/constants/constants';
import { CurrentWeatherCardProps } from '@/types/types';
import React from 'react';
import { Text, View, YStack, XStack } from 'tamagui';

const getWeatherDescription = (code: number): string =>
  WEATHER_DESCRIPTIONS[code] || 'Weather data unavailable';

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weatherData,
  currentTime,
  temperatureUnit,
}) => {
  if (!weatherData || !weatherData.current || !weatherData.daily) {
    return (
      <YStack
        backgroundColor="#191D64"
        borderRadius="$4"
        padding="$4"
        width="100%"
        maxWidth={400}
        alignSelf="center"
        alignItems="center"
      >
        <Text fontSize="$6" color="$gray10">
          Loading weather data...
        </Text>
      </YStack>
    );
  }

  
  const { current, daily } = weatherData;

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const dayName = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  const formattedDate = `${dayName} ${monthDay}`;

  const currentTemp = Math.round(current.temperature_2m);
  const feelsLikeTemp = Math.round(current.apparent_temperature);
  const minTemp =
    daily.temperature_2m_min.length > 0
      ? Math.round(daily.temperature_2m_min[0])
      : 'N/A';
  const maxTemp =
    daily.temperature_2m_max.length > 0
      ? Math.round(daily.temperature_2m_max[0])
      : 'N/A';
  const weatherDescription = getWeatherDescription(current.weather_code);
  const unitSymbol = temperatureUnit === 'fahrenheit' ? 'F' : 'C';

  return (
    <YStack
      backgroundColor="#191D64"
      borderRadius="$4"
      padding="$4"
      width="100%"
      maxWidth={400}
      alignSelf="center"
      shadowColor="black"
      shadowOpacity={0.2}
      shadowRadius={10}
      role="region"
      aria-label="Current Weather Information"
    >
      <XStack justifyContent="space-between" marginBottom="$4">
        {/* Left: Temp & Feels */}
        <YStack>
          <Text fontSize={64} fontWeight="bold" lineHeight="$8">
            {currentTemp}°
            <Text fontSize={32} fontWeight="600">
              {unitSymbol}
            </Text>
          </Text>
          <Text color="$gray10" fontSize="$4" marginTop="$1">
            Feels like {feelsLikeTemp}°{unitSymbol}
          </Text>
        </YStack>

        {/* Right: Icon, Description, Min/Max */}
        <YStack alignItems="flex-end">
          <View width={64} height={64} marginBottom="$2">
            <PartlyCloudyIcon />
          </View>
          <Text fontSize="$4" textTransform="capitalize" fontWeight="500">
            {weatherDescription}
          </Text>
          {minTemp !== 'N/A' && maxTemp !== 'N/A' && (
            <Text color="$gray10" fontSize="$2" marginTop="$1">
              Min {minTemp}°{unitSymbol} • Max {maxTemp}°{unitSymbol}
            </Text>
          )}
        </YStack>
      </XStack>

      {/* Bottom: Time & Date */}
      <YStack
        alignItems="center"
        borderTopWidth={1}
        borderTopColor="#3B3F8C"
        paddingTop="$3"
        marginTop="$3"
      >
        <Text fontSize="$7" fontWeight="600">
          {formattedTime}
        </Text>
        <Text fontSize="$4" color="$gray10" marginTop="$1">
          {formattedDate}
        </Text>
      </YStack>
    </YStack>
  );
};
