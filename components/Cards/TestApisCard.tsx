import { useEffect, useState } from 'react'
import { ScrollView, TextInput as RNTextInput } from 'react-native'
import { Card, Text, YStack, Input, Spinner } from 'tamagui'

const DEFAULT_COORDINATES = {
  latitude: 51.5072,
  longitude: -0.1276,
}

export default function TestAPIsCard() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('London')

  const fetchWeather = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_COORDINATES.latitude}&longitude=${DEFAULT_COORDINATES.longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,uv_index&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto`
      )
      const json = await res.json()
      setWeatherData(json)
    } catch (e) {
      console.error('Failed to fetch weather', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const current = weatherData?.current_weather
  const daily = weatherData?.daily
  const hourly = weatherData?.hourly

  return (
    <Card
      elevate
      padded
      size="$5"
      backgroundColor="$gray1"
      borderRadius="$6"
      marginVertical="$4"
      opacity={0.8}
    >
      <YStack height={300}>
        <Input
          placeholder="City"
          value={city}
          onChangeText={setCity}
          borderWidth={1}
          borderColor="$gray10"
          backgroundColor="#CDEBEE"
        />

        {loading ? (
          <Spinner size="large" color="black" />
        ) : weatherData ? (
          <ScrollView>
            <YStack>
              <Text fontWeight="bold">Temperature: {current?.temperature}°C</Text>
              <Text>Wind: {current?.windspeed} km/h</Text>
              <Text>Humidity (hourly): {hourly?.relative_humidity_2m?.[0]}%</Text>
              <Text>UV Index (hourly): {hourly?.uv_index?.[0]}</Text>

              <Text fontWeight="bold">5-Day Forecast:</Text>
              {daily?.time?.slice(0, 5).map((day: string, i: number) => (
                <YStack key={day} space="$1">
                  <Text>📅 {day}</Text>
                  <Text>🌡️ {daily.temperature_2m_min[i]}°C - {daily.temperature_2m_max[i]}°C</Text>
                  <Text>💨 Wind Max: {daily.windspeed_10m_max[i]} km/h</Text>
                  <Text>🌧️ Precipitation: {daily.precipitation_sum[i]} mm</Text>
                  <Text>🔆 Max UV: {daily.uv_index_max[i]}</Text>
                </YStack>
              ))}
            </YStack>
          </ScrollView>
        ) : (
          <Text>Error loading weather data.</Text>
        )}
      </YStack>
    </Card>
  )
}
