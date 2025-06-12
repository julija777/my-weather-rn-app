import React, { useState } from 'react';
import { Button, Card, Input, ScrollView, Separator, Text, YStack } from 'tamagui';
import { ImageBackground } from 'react-native';
import { cityState } from '@/store/cityStore';
import WeatherDayCard from '@/components/Cards/WeatherDayCard';
import Header from '@/components/Header';
import FlyAwayGoodWeather from "../../assets/images/FlyAwayGoodWeather.png"; 

export default function FlyAway() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<null | {
    city: string;
    temperature: number;
    wind: number;
  }>(null);

  const handleSearch = async () => {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert('City not found');
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`
      );

      const weatherData = await weatherRes.json();

      const today = 0;

      const cityWeather = {
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.daily.weathercode[today],
        date: weatherData.daily.time[today],
        min: weatherData.daily.temperature_2m_min[today],
        max: weatherData.daily.temperature_2m_max[today],
      };

      setWeather({
        city: name,
        temperature: cityWeather.temperature,
        wind: cityWeather.windspeed,
      });

      const existing = cityState.savedCities.get();
      if (!existing.find((c) => c.name === name)) {
        cityState.savedCities.set((prev) => [...prev, { name, weather: cityWeather }]);
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
    }
  };
  return (
    <ImageBackground
      source={FlyAwayGoodWeather} 
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Header title="🌤 Where to Fly Away?" color={'#42d7f5'} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <YStack padding="$4" flex={1}>
          <Input
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
            marginBottom="$2"
          />
          <Button onPress={handleSearch}>Search</Button>
          {weather && (
            <Card elevate padding="$4" marginTop="$4">
              <Text fontSize="$6" fontWeight="600">{weather.city}</Text>
              <Text>Temperature: {weather.temperature}°C</Text>
              <Text>Wind Speed: {weather.wind} km/h</Text>
            </Card>
          )}
          <Separator marginTop="$4" marginBottom="$4" />
          <Text fontSize="$8" fontWeight="800" fontStyle='italic' color={'#fff'} alignSelf='center'>Saved Cities</Text>
          <YStack gap="$3" marginTop="$2">
            {cityState.savedCities.get().map((cityObj, idx) => (
              <YStack key={idx} padding="$3" backgroundColor="$backgroundLight" borderRadius="$2">
                <Text fontSize="$8" fontWeight="800" color={'#42d7f5'} alignSelf='center' paddingBottom="$2">{cityObj.name}</Text>
                <WeatherDayCard
                  date={cityObj.weather.date}
                  min={cityObj.weather.min}
                  max={cityObj.weather.max}
                  weatherCode={cityObj.weather.weathercode}
                  unitSymbol="°C"
                />
              </YStack>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}
