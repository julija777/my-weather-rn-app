import { Text, YStack, Anchor } from "tamagui";

import React from "react";
import { ExternalLink } from "@/components/ExternalLink";

export default function More() {
  return (
    <YStack
      flex={1}
      padding="$4"
      gap="$4"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="$5" textAlign="center">
        This weather app uses the{" "}
        <ExternalLink
          href="https://open-meteo.com/en/docs"
          style={{ color: "#007AFF", fontWeight: "600" }}
        >
          Open-Meteo API
        </ExternalLink>{" "}
        to fetch reliable and free weather data.
      </Text>

      <Text fontSize="$5" textAlign="center">
        You can view a{" "}
        <ExternalLink
          href="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&hourly=temperature_2m,precipitation,windspeed_10m,cloudcover,pressure_msl&daily=temperature_2m_max,precipitation_sum,windspeed_10m_max&current=temperature_2m,relative_humidity_2m&timezone=auto"
          style={{ color: "#007AFF", fontWeight: "600" }}
        >
          sample API request
        </ExternalLink>{" "}
        for Berlin.
      </Text>
    </YStack>
  );
}
