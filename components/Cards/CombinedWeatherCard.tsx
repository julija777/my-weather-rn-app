import { PartlyCloudyIcon } from '@/assets/icons/PartlyCloudyIcon';
import { WEATHER_DESCRIPTIONS } from '@/constants/constants';
import { THEME_COLORS } from '@/types/colourTypes';
import React, { useEffect, useState } from 'react';
import { Text, View, YStack, XStack, Input } from 'tamagui';

const DEFAULT_COORDINATES = {
  latitude: 51.5072,
  longitude: -0.1276,
};

const getWeatherDescription = (code: number): string =>
  WEATHER_DESCRIPTIONS[code] || 'Weather data unavailable';

export const CombinedWeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('London');
  const currentTime = new Date(); // Simple default; ideally use API timestamp
  const temperatureUnit = 'celsius' as 'celsius' | 'fahrenheit'; // Can be made dynamic later

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_COORDINATES.latitude}&longitude=${DEFAULT_COORDINATES.longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,uv_index&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto`
      );
      const json = await res.json();
      setWeatherData(json);
    } catch (e) {
      console.error('Failed to fetch weather', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const current = weatherData?.current_weather;
  const daily = weatherData?.daily;

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

  const currentTemp = Math.round(current?.temperature ?? 0);
  const feelsLikeTemp = currentTemp; // API lacks apparent temp, defaulting
  const minTemp = daily?.temperature_2m_min?.[0] ?? 'N/A';
  const maxTemp = daily?.temperature_2m_max?.[0] ?? 'N/A';
  const weatherDescription = getWeatherDescription(current?.weathercode ?? 0);
  const unitSymbol = temperatureUnit === 'fahrenheit' ? 'F' : 'C';

  return (
        <YStack
          backgroundColor="rgba(73, 201, 227, 0.4)"
          borderRadius="$4"
          padding="$4"
          alignSelf="center"
          shadowOpacity={0.2}
          role="region"
          aria-label="Current Weather Information"
        >
          <XStack justifyContent="space-between" marginBottom="$4">
            {/* Left: Temp & Feels */}
            <YStack inlineSize={'60%'} gap="$2">
              <Text fontSize={64} fontWeight="bold" color={THEME_COLORS.teal}>
                {currentTemp}°
                <Text fontSize={32} fontWeight="600" color={THEME_COLORS.teal}>
                  {unitSymbol}
                </Text>
              </Text>
            </YStack>
    
            {/* Right: Icon, Description, Min/Max */}
            <YStack alignItems="flex-end">
              <View width={64} height={64} marginBottom="$2">
                <PartlyCloudyIcon />
              </View>
              <Text fontSize="$4" textTransform="capitalize" fontWeight="bold">
                {weatherDescription}
              </Text>
              {minTemp !== 'N/A' && maxTemp !== 'N/A' && (
                <Text color="$black" fontWeight="bold" fontSize="$2" marginTop="$3">
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
            <Text fontSize="$4" color="$black" fontWeight="bold" marginTop="$1">
              {formattedDate}
            </Text>
          </YStack>
        </YStack>
  );
};
