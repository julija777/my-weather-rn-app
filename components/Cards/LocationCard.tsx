import React from "react";
import { YStack, Text, Spinner } from "tamagui";
import { useLocation } from "@/hooks/useLocation";
import { colours } from "@/themes/colours";

export const LocationCard: React.FC = () => {
  const { city, error } = useLocation();

  return (
    <YStack
      backgroundColor={colours.glassBackgroundColor}
      borderRadius="$4"
      padding="$3"
      minWidth={140}
      alignItems="center"
      marginHorizontal={16}
      marginTop="$4"
      marginBottom={"$4"}
    >
      <Text fontSize="$6" fontWeight="600">
        Weather for
      </Text>
      {city ? (
        <>
          <Text fontSize="$5" fontWeight="bold">
            {city}
          </Text>
        </>
      ) : error ? (
        <Text color="$red10">{error}</Text>
      ) : (
        <>
          <Text>Fetching location...</Text>
          <Spinner size="large" />
        </>
      )}
    </YStack>
  );
};
