import Header from "@/components/Header";
import { cityState } from "@/store/cityStore";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { observer } from "@legendapp/state/react";
import {
  ScrollView,
  Separator,
  Text,
  YStack,
} from "tamagui";
import FlyAwayGoodWeather from "../../assets/images/FlyAwayGoodWeather.png";
import FlyAwayInput from "@/components/FlyAwayInput";
import FlyAwayButton from "@/components/FlyAwayButton";
import FlyAwayCard from "@/components/Cards/FlyAwayCard";
import SavedCitiesList from "@/components/SavedCitiesList";

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
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`
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
          <FlyAwayInput
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <FlyAwayButton onPress={handleSearch}>Search</FlyAwayButton>

          {weather && (
            <FlyAwayCard
              city={weather.city}
              temperature={weather.temperature}
              wind={weather.wind}
              unit="C"
              windUnit="km/h"
              icon={null}
            />
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

          <SavedCitiesList />
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}

