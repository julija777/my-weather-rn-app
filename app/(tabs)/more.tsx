import WeatherCard from '@/components/WeatherCard'
import { YStack, Text } from 'tamagui'

export default function More() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="$6">More settings coming soon ⚙️</Text>
      <WeatherCard
        title="Make an option to switch the temperature from C to F"
        value="I am the Value prop"
        unit="I am the Unit prop"
      />

    </YStack>
  )
}

