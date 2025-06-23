import { Separator, Text, YStack } from "tamagui";
import { ExternalLink } from "@/components/ExternalLink";
import { BookOpenText, Sun } from "lucide-react-native";
import React from "react";
import { colours } from "@/themes/colours";

export default function More() {
  return (
    <YStack
      flex={1}
      padding="$4"
      gap="$4"
      justifyContent="center"
      alignItems="center"
      backgroundColor={colours.moreBackground}
    >
      <BookOpenText size="42" color={colours.moreIcon} />
      <Text fontSize="$5" textAlign="center">
        This weather app uses the{" "}
        <ExternalLink
          href="https://open-meteo.com/en/docs"
          style={{ color: colours.externalLink, fontWeight: "600" }}
        >
          Open-Meteo API
        </ExternalLink>{" "}
        to fetch reliable and free weather data.
      </Text>
      <Separator borderColor={colours.moreIcon} width="80%" />
      <Text fontSize="$5" textAlign="center">
        You can view a{" "}
        <ExternalLink
          href="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&hourly=temperature_2m,precipitation,windspeed_10m,cloudcover,pressure_msl&daily=temperature_2m_max,precipitation_sum,windspeed_10m_max&current=temperature_2m,relative_humidity_2m&timezone=auto"
          style={{ color: colours.externalLink, fontWeight: "600" }}
        >
          sample API request
        </ExternalLink>{" "}
        for Berlin.
      </Text>
    </YStack>
  );
}
