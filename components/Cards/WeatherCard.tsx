import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Text, YStack, Spinner } from 'tamagui';

export const DataVariant = {
  Now: {
    key: 'Now',
    params: 'current_weather=true&hourly=temperature_2m,relative_humidity_2m,uv_index',
  },
  Tomorrow: {
    key: 'Tomorrow',
    params: 'daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto',
  },
  FiveDays: {
    key: 'FiveDays',
    params: 'daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto',
  },
  SevenDays: {
    key: 'SevenDays',
    params: 'daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto',
  },
  TenDays: {
    key: 'TenDays',
    params: 'daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto',
  },
  SixteenDays: {
    key: 'SixteenDays',
    params: 'daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto',
  },
} as const;

export type DataVariantType = (typeof DataVariant)[keyof typeof DataVariant];

export type Location = {
  latitude: number;
  longitude: number;
};

type WeatherCardProps = {
  location: Location;
  locationName: string;
  variant?: DataVariantType;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const sizeStyles = {
  xs: {
    minHeight: 120,
    padding: '$2',
    fontSize: '$2',
  },
  sm: {
    minHeight: 160,
    padding: '$3',
    fontSize: '$3',
  },
  md: {
    minHeight: 200,
    padding: '$4',
    fontSize: '$4',
  },
  lg: {
    minHeight: 240,
    padding: '$5',
    fontSize: '$5',
  },
};

export default function WeatherCard({
  location,
  locationName,
  variant,
  size = 'md',
}: WeatherCardProps) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&${variant.params}`
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
    if (location && variant) {
      fetchWeather();
    }
  }, [location.latitude, location.longitude, variant]);

  const style = sizeStyles[size];

  const GlassCard = ({ children }: { children: React.ReactNode }) => (
    <Card
      elevate
      paddingHorizontal={'$4'}
      paddingVertical={'$3'}
      borderColor="yellow"
      borderStyle="solid"
      borderWidth={1}
      borderRadius="$6"
      marginVertical="$4"
      marginHorizontal={'$4'}
      backgroundColor="rgba(73, 201, 227, 0.4)"
      minHeight={style.minHeight}
      padding={style.padding}
    >
      {children}
    </Card>
  );

  if (loading) {
    return (
      <GlassCard>
        <YStack flex={1} justifyContent="center" alignItems="center" height={style.minHeight}>
          <Text fontSize={style.fontSize}>Loading weather for {locationName}...</Text>
          <Spinner size="large" color="black" />
        </YStack>
      </GlassCard>
    );
  }

  if (!weatherData) {
    return (
      <GlassCard>
        <YStack flex={1} justifyContent="center" alignItems="center" height={style.minHeight}>
          <Text fontSize={style.fontSize}>Error loading weather data for {locationName}.</Text>
        </YStack>
      </GlassCard>
    );
  }

  const current = weatherData?.current_weather;
  const daily = weatherData?.daily;
  const hourly = weatherData?.hourly;

  return (
    <GlassCard>
      <YStack flex={1} padding={style.padding}>
        <Text fontWeight="bold" fontSize={style.fontSize} marginBottom="$2">
          Weather for {locationName}
        </Text>

        {variant.key === 'Now' && current && (
          <>
            <Text fontSize={style.fontSize}>Temperature: {current.temperature} °C</Text>
            <Text fontSize={style.fontSize}>Wind: {current.windspeed} km/h</Text>
            <Text fontSize={style.fontSize}>Humidity (hourly): {hourly?.relative_humidity_2m?.[0]}%</Text>
            <Text fontSize={style.fontSize}>UV Index (hourly): {hourly?.uv_index?.[0]}</Text>
          </>
        )}

        {variant.key !== 'Now' && daily && (
          <ScrollView>
            <Text fontSize={style.fontSize} fontWeight="bold">{variant.key} Forecast:</Text>
            {daily.time?.slice(0, variant.key === 'Tomorrow' ? 1 : parseInt(variant.key.replace(/\D/g, ''))).map((day: string, i: number) => (
              <YStack key={day} padding="$2" marginBottom="$2">
                <Text fontSize={style.fontSize}>📅 {day}</Text>
                <Text fontSize={style.fontSize}>Min: {daily.temperature_2m_min[i]} °C - Max: {daily.temperature_2m_max[i]} °C</Text>
                <Text fontSize={style.fontSize}>Wind Max: {daily.windspeed_10m_max[i]} km/h</Text>
                <Text fontSize={style.fontSize}>Precipitation: {daily.precipitation_sum[i]} mm</Text>
                <Text fontSize={style.fontSize}>Max UV: {daily.uv_index_max[i]}</Text>
              </YStack>
            ))}
          </ScrollView>
        )}
      </YStack>
    </GlassCard>
  );
}
