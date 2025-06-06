import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, XStack, YStack } from 'tamagui'
import HomeGoodWeather from "../../assets/images/HomeGoodWeather.png"
import TestAPIsCard from '@/components/TestApisCard'

const TABS = [
  { key: 'now', label: 'Now', color: '#00596B' },
  { key: 'hourly', label: 'Hourly', color: '#191D64' },
  { key: 'weekly', label: 'Weekly', color: '#301934' },
]

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'now' | 'hourly' | 'weekly'>('now')
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&current_weather=true&hourly=temperature_2m'
    )
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null))
  }, [])

  const renderTabContent = () => {
    if (!data) return <Text marginTop="$4">Loading...</Text>

    switch (activeTab) {
      case 'now':
        return (
          <Text marginTop="$4">
            Current: {data.current_weather?.temperature}°C
          </Text>
        )
      case 'hourly':
        return (
          <Text marginTop="$4">
            Hourly: {data.hourly?.temperature_2m?.slice(0, 3).join(', ')}°C
          </Text>
        )
      case 'weekly':
        return (
          <Text marginTop="$4">Weekly forecast coming soon...</Text>
        )
    }
  }

  return (
    <ImageBackground
      source={HomeGoodWeather}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <YStack padding="$4" flex={1}>
          <Text fontSize="$9" fontWeight="600" color="white">
            My Weather
          </Text>

          <XStack gap="$2" justifyContent="space-between">
            {TABS.map(({ key, label, color }) => (
              <Button
                key={key}
                onPress={() => setActiveTab(key as any)}
                backgroundColor={color}
                color="white"
                flex={1}
              >
                {label}
              </Button>
            ))}
          </XStack>

          {renderTabContent()}
        </YStack>
        <TestAPIsCard />

      </SafeAreaView>
    </ImageBackground>
  )
}
