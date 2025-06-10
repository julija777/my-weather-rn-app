// components/Cards/CombinedWeatherCard.tsx
import React from 'react';
import { YStack, XStack, Text, View, Spinner } from 'tamagui';
import { PartlyCloudyIcon } from '@/assets/icons/PartlyCloudyIcon'; // Use your icon logic
import { WEATHER_DESCRIPTIONS } from '@/constants/constants';
import { THEME_COLORS } from '@/types/colourTypes';

interface CombinedWeatherCardProps {
  data: any;
  loading: boolean;
  variant: 'now' | 'tomorrow';
  unitSymbol?: string;
}

const getWeatherDescription = (code: number): string =>
  WEATHER_DESCRIPTIONS[code] || 'Weather data unavailable';

export const CombinedWeatherCard: React.FC<CombinedWeatherCardProps> = ({
  data,
  loading,
  variant,
  unitSymbol = '°C',
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
  let time = '';
  let dayLabel = '';

  if (variant === 'now') {
    temperature = Math.round(data?.current_weather?.temperature ?? 0);
    weatherCode = data?.current_weather?.weathercode ?? 0;
    minTemp = data?.daily?.temperature_2m_min?.[0] ?? 0;
    maxTemp = data?.daily?.temperature_2m_max?.[0] ?? 0;
    time = data?.current_weather?.time ?? '';
    dayLabel = new Date(time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  } else if (variant === 'tomorrow') {
    minTemp = data?.daily?.temperature_2m_min?.[0] ?? 0;
    maxTemp = data?.daily?.temperature_2m_max?.[0] ?? 0;
    weatherCode = data?.daily?.weathercode?.[0] ?? 0;
    temperature = Math.round((minTemp + maxTemp) / 2);
    time = data?.daily?.time?.[0] ?? '';
    dayLabel = new Date(time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  const weatherDescription = getWeatherDescription(weatherCode);

  return (
    <YStack
      backgroundColor="rgba(73, 201, 227, 0.4)"
      borderRadius="$4"
      padding="$4"
      alignSelf="center"
      shadowOpacity={0.2}
      role="region"
      aria-label="Weather Information"
    >
      <XStack justifyContent="space-between" marginBottom="$4">
        <YStack inlineSize={'60%'} gap="$2">
          <Text fontSize={64} fontWeight="bold" color={THEME_COLORS.teal}>
            {temperature}°
            <Text fontSize={32} fontWeight="600" color={THEME_COLORS.teal}>
              {unitSymbol}
            </Text>
          </Text>
        </YStack>
        <YStack alignItems="flex-end">
          <View width={64} height={64} marginBottom="$2">
            <PartlyCloudyIcon />
          </View>
          <Text fontSize="$4" textTransform="capitalize" fontWeight="bold">
            {weatherDescription}
          </Text>
          <Text color="$black" fontWeight="bold" fontSize="$2" marginTop="$3">
            Min {minTemp}°{unitSymbol} • Max {maxTemp}°{unitSymbol}
          </Text>
        </YStack>
      </XStack>
      <YStack
        alignItems="center"
        borderTopWidth={1}
        borderTopColor="#3B3F8C"
        paddingTop="$3"
        marginTop="$3"
      >
        <Text fontSize="$7" fontWeight="600">
          {time ? new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
        </Text>
        <Text fontSize="$4" color="$black" fontWeight="bold" marginTop="$1">
          {dayLabel}
        </Text>
      </YStack>
    </YStack>
  );
};
