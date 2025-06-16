import Header from "@/components/Header";
import { cityState } from "@/store/cityStore";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import {
  Button,
  Card,
  Input,
  ScrollView,
  Separator,
  Text,
  YStack,
} from "tamagui";
import FlyAwayGoodWeather from "../../assets/images/FlyAwayGoodWeather.png";

export default function FlyAway() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<null | {
    city: string;
    temperature: number;
    wind: number;
  }>(null);

  const handleSearch = async () => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`,
      );

      const weatherData = await weatherRes.json();

      // Create the weather object that matches what we display
      const currentWeather = {
        city: name,
        temperature: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
      };

      setWeather(currentWeather);

      // Save the same structure we display
      const existing = cityState.savedCities.get();
      if (!existing.find((c) => c.name === name)) {
        cityState.savedCities.set((prev) => [
          ...prev,
          { name, weather: currentWeather },
        ]);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  };

  return (
    <ImageBackground
      source={FlyAwayGoodWeather}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Header title="🌤 Where to Fly Away?" color={"#00596B"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
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
              <Text fontSize="$6" fontWeight="600">
                {weather.city}
              </Text>
              <Text>Temperature: {weather.temperature}°C</Text>
              <Text>Wind Speed: {weather.wind} km/h</Text>
            </Card>
          )}
          <Separator marginTop="$4" marginBottom="$4" />
          <Text
            fontSize="$8"
            fontWeight="800"
            fontStyle="italic"
            color={"#fff"}
            alignSelf="center"
          >
            Saved Cities
          </Text>
          <YStack gap="$3" marginTop="$2">
            {cityState.savedCities.get().map((cityObj, idx) => (
              <YStack
                key={idx}
                padding="$3"
                backgroundColor="$backgroundLight"
                borderRadius="$2"
              >
                <Card elevate padding="$4">
                  <Text fontSize="$6" fontWeight="600">
                    {cityObj.weather.city}
                  </Text>
                  <Text>Temperature: {cityObj.weather.temperature}°C</Text>
                  <Text>Wind Speed: {cityObj.weather.wind} km/h</Text>
                </Card>
              </YStack>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}
