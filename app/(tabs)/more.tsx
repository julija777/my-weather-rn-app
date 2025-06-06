import WeatherCard from '@/components/WeatherCard'
import { YStack, Text } from 'tamagui'

export default function More() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="$6">More settings coming soon ⚙️</Text>
      <WeatherCard
        title="Weather API"
        value="Open-Meteo"
        unit=""
      />
      <WeatherCard
        title="Card2"
        value="2"
        unit=""
      />
      <WeatherCard
        title="Card3"
        value="3"
      />
    </YStack>
  )
}

