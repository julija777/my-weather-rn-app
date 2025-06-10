// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { ScrollView, YStack } from 'tamagui';
import Header from '@/components/Header';
import NotificationCard from '@/components/NotificationCard';
import { SlidingTabs } from '@/components/SlidingTabs';
import { THEME_COLORS, type ColorScheme } from '@/types/colourTypes';
import HomeGoodWeather from "../../assets/images/HomeGoodWeather.png";
import { useWeatherData } from '@/hooks/useWeatherData';
import { CombinedWeatherCard } from '@/components/Cards/CombinedWeatherCard';
import WeatherDayCard from '@/components/Cards/WeatherDayCard';
import HorizontalCarousel from '@/components/HorizontalCarousel';

const TABS = [
  { key: 'teal', label: 'Now' },
  { key: 'blue', label: 'Tomorrow' },
  { key: 'purple', label: 'Next 5 Days' },
] as const;

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ColorScheme>('teal');
  const { data, loading } = useWeatherData(activeTab);
  const userName = 'Julia';

  return (
    <ImageBackground
      source={HomeGoodWeather}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Header
        color={THEME_COLORS[activeTab]}
        title={`Good afternoon, ${userName}`}
        notification={
          <NotificationCard
            icon={'🚀'}
            message="Getting started"
            description="Rocket is launching"
            backgroundColor="white"
          />
        }
      />
      <SlidingTabs
        options={TABS}
        active={activeTab}
        onChange={setActiveTab}
        themeColors={activeTab}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <YStack padding="$4" gap="$4">
          {activeTab === 'teal' && (
            <CombinedWeatherCard data={data} loading={loading} variant="now" />
          )}
          {activeTab === 'blue' && (
            <CombinedWeatherCard data={data} loading={loading} variant="tomorrow" />
          )}
          {activeTab === 'purple' && data?.daily?.time && (
            <HorizontalCarousel>
              {data.daily.time.map((date: string, idx: number) => (
                <WeatherDayCard
                  key={date}
                  date={date}
                  min={data.daily.temperature_2m_min[idx]}
                  max={data.daily.temperature_2m_max[idx]}
                  weatherCode={data.daily.weathercode[idx]}
                  unitSymbol="°C"
                />
              ))}
            </HorizontalCarousel>
          )}
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}
