import React from "react";
import { Pressable } from "react-native";
import { Text, YStack } from "tamagui";
import { THEME_COLORS } from "@/types/colourTypes";

interface Props {
  message: string;
  onBack: () => void;
}

const ErrorState = ({ message, onBack }: Props) => (
  <YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
    <Text color="red" fontSize="$5" textAlign="center">
      {message}
    </Text>
    <Pressable
      onPress={onBack}
      style={{
        marginTop: 20,
        backgroundColor: THEME_COLORS.teal,
        padding: 12,
        borderRadius: 8,
      }}
    >
      <Text color="white" fontWeight="600">
        Go Back
      </Text>
    </Pressable>
  </YStack>
);

export default ErrorState;
