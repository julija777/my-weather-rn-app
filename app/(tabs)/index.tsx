import Header from '@/components/Header'
import NotificationCard from '@/components/NotificationCard'
import { SlidingTabs } from '@/components/SlidingTabs'
import type { ColorScheme } from '@/types'
import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeGoodWeather from "../../assets/images/HomeGoodWeather.png"

const TABS = [
  { key: 'teal', label: 'Now' },
  { key: 'blue', label: 'Tomorrow' },
  { key: 'purple', label: '5-Day Forecast' },
] as const

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ColorScheme>('teal')
  const [data, setData] = useState<any>(null)
  const userName = 'Julia' // Replace 'User' with dynamic value if available

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&current_weather=true&hourly=temperature_2m'
    )
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null))
  }, [])

  return (
          <ImageBackground
            source={HomeGoodWeather}
            resizeMode="cover"
            style={{ flex: 1 }}
          >
          <Header
            color={activeTab}
            title={`Good afternoon, ${userName}`}
            notification={<NotificationCard icon={'🚀'} message="Getting started" description="Rocket is launching" backgroundColor="white" />}
          />
          <SlidingTabs
          options={TABS}
          active={activeTab}
          onChange={setActiveTab}
          themeColors={activeTab}
          />        
          <SafeAreaView style={{ flex: 1 }}>
      </SafeAreaView>
    </ImageBackground>
  )
}
