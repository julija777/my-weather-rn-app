import WeatherCard, { DataVariant } from '@/components/Cards/WeatherCard'
import Header from '@/components/Header'
import NotificationCard from '@/components/NotificationCard'
import { SlidingTabs } from '@/components/SlidingTabs'
import { THEME_COLORS, type ColorScheme } from '@/types/colourTypes'
import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { ScrollView, YStack } from 'tamagui'
import HomeGoodWeather from "../../assets/images/HomeGoodWeather.png"
import { CombinedWeatherCard } from '@/components/Cards/CombinedWeatherCard'

const TABS = [
  { key: 'teal', label: 'Now' },
  { key: 'blue', label: 'Tomorrow' },
  { key: 'purple', label: ' Next 5 Days' },
] as const

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ColorScheme>('teal')
  const [data, setData] = useState<any>(null)
  const userName = 'Julia' 

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&current_weather=true&hourly=temperature_2m'
    )
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null))
  }, [])

  // Extract weatherData, currentTime, and temperatureUnit from the fetched data
  const weatherData = data?.current_weather || null
  const currentTime = data?.current_weather?.time || ''
  const temperatureUnit = data?.hourly_units?.temperature_2m || '°C'

  return (
          <ImageBackground
            source={HomeGoodWeather}
            resizeMode="cover"
            style={{ flex: 1 }}
          >
          <Header
            color={THEME_COLORS[activeTab]} 
            title={`Good afternoon, ${userName}`}
            notification={<NotificationCard icon={'🚀'} message="Getting started" description="Rocket is launching" backgroundColor="white" />}
          />
          <SlidingTabs
          options={TABS}
          active={activeTab}
          onChange={setActiveTab}
          themeColors={activeTab}
          />
          {/* Render the WeatherCard based on the active tab */}
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <YStack padding="$4" gap="$4">
        <CombinedWeatherCard />
        </YStack>
        </ScrollView>
      {/* </SafeAreaView> */}
      </ImageBackground>
  )
}
