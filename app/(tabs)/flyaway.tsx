import TestAPIsCard from "@/components/Cards/TestApisCard"
import FlyAwayGoodWeather from "../../assets/images/FlyAwayGoodWeather.png"
import { ImageBackground } from 'react-native'
import { Text, YStack } from 'tamagui'


export default function FlyAway() {
  return (
    <ImageBackground
      source={FlyAwayGoodWeather}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <YStack flex={1} justifyContent="center" alignItems="center">
           <TestAPIsCard />
      </YStack>
    </ImageBackground>
  )
}
