import React from "react";
import { Spinner, Text, YStack } from "tamagui";
import { THEME_COLORS } from "@/types/colourTypes";

const LoadingState = () => (
  <YStack flex={1} alignItems="center" justifyContent="center">
    <Spinner size="large" color={THEME_COLORS.teal} />
    <Text marginTop="$4" fontSize="$5" fontWeight="600">
      Loading...
    </Text>
  </YStack>
);

export default LoadingState;
