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

      const currentWeather = {
        city: name,
        temperature: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
      };

      setWeather(currentWeather);

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

  // Liquid glass card styles
  const glassCardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(20px)",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  };

  const glassTextStyle = {
    color: "rgba(255, 255, 255, 0.95)",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
            backgroundColor="rgba(255, 255, 255, 0.2)"
            borderColor="rgba(255, 255, 255, 0.4)"
            color="white"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />
          <Button
            onPress={handleSearch}
            backgroundColor="rgba(255, 255, 255, 0.2)"
            borderColor="rgba(255, 255, 255, 0.4)"
            borderWidth={1}
            color="white"
            pressStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            Search
          </Button>
          {weather && (
            <Card
              padding="$4"
              marginTop="$4"
              backgroundColor="transparent"
              borderRadius="$6"
              style={glassCardStyle}
            >
              <Text fontSize="$6" fontWeight="600" style={glassTextStyle}>
                {weather.city}
              </Text>
              <Text style={glassTextStyle}>
                Temperature: {weather.temperature}°C
              </Text>
              <Text style={glassTextStyle}>
                Wind Speed: {weather.wind} km/h
              </Text>
            </Card>
          )}
          <Separator
            marginTop="$4"
            marginBottom="$4"
            backgroundColor="rgba(255, 255, 255, 0.3)"
          />
          <Text
            fontSize="$8"
            fontWeight="800"
            fontStyle="italic"
            color={"#fff"}
            alignSelf="center"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.6)",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }}
          >
            Saved Cities
          </Text>
          <YStack gap="$3" marginTop="$2">
            {cityState.savedCities.get().map((cityObj, idx) => (
              <YStack
                key={idx}
                padding="$3"
                backgroundColor="transparent"
                borderRadius="$4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Card
                  padding="$4"
                  backgroundColor="transparent"
                  borderRadius="$6"
                  style={glassCardStyle}
                >
                  <Text fontSize="$6" fontWeight="600" style={glassTextStyle}>
                    {cityObj.weather.city}
                  </Text>
                  <Text style={glassTextStyle}>
                    Temperature: {cityObj.weather.temperature}°C
                  </Text>
                  <Text style={glassTextStyle}>
                    Wind Speed: {cityObj.weather.wind} km/h
                  </Text>
                </Card>
              </YStack>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}
