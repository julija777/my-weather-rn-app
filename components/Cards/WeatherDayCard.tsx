// components/Cards/WeatherDayCard.tsx
import React from 'react';
import { YStack, XStack, Text, View } from 'tamagui';
import { PartlyCloudyIcon } from '@/assets/icons/PartlyCloudyIcon'; // Replace with your icon logic
import { WEATHER_DESCRIPTIONS } from '@/constants/constants';
import { THEME_COLORS } from '@/types/colourTypes';

interface WeatherDayCardProps {
  date: string;
  min: number;
  max: number;
  weatherCode: number;
  unitSymbol?: string;
}

const getWeatherDescription = (code: number): string =>
  WEATHER_DESCRIPTIONS[code] || 'Weather data unavailable';

const WeatherDayCard: React.FC<WeatherDayCardProps> = ({
  date,
  min,
  max,
  weatherCode,
  unitSymbol = '°C',
}) => {
  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  const weatherDescription = getWeatherDescription(weatherCode);

  return (
    <YStack
      backgroundColor="rgba(73, 201, 227, 0.4)"
      borderRadius="$4"
      padding="$3"
      minWidth={140}
      alignItems="center"
      marginHorizontal={6}
    >
      <Text fontWeight="bold">{dayName}</Text>
      <View width={48} height={48} marginVertical="$2">
        <PartlyCloudyIcon />
      </View>
      <Text fontSize="$5" fontWeight="bold">
        {Math.round(max)}{unitSymbol} / {Math.round(min)}{unitSymbol}
      </Text>
      <Text fontSize="$3" color="$black" marginTop="$1" textAlign="center">
        {weatherDescription}
      </Text>
    </YStack>
  );
};

export default WeatherDayCard;
