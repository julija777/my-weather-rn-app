import React from "react";
import { Card, Text, XStack, YStack, Button } from "tamagui";

type FlyAwayCardProps = {
  city: string;
  temperature: number;
  wind: number;
  icon?: React.ReactNode;
  onDelete?: () => void;
  unit?: "C" | "F"; // default to C
  windUnit?: "km/h" | "mph"; // default to km/h
};

const glassCardStyle = {
  backgroundColor: "rgba(170, 175, 178, 0.77)",
  borderWidth: 1,
  borderColor: "rgba(21, 28, 224, 0.52)",
  backdropFilter: "blur(20px)",
  shadowColor: "rgba(0, 0, 0, 0.1)",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 16,
  elevation: 8,
};

const glassTextStyle = {
  color: "rgba(12, 16, 78, 0.93)",
  textShadowColor: "rgba(0, 0, 0, 0.68)",
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 2,
};

const FlyAwayCard: React.FC<FlyAwayCardProps> = ({
  city,
  temperature,
  wind,
  icon,
  onDelete,
  unit = "C",
  windUnit = "km/h",
}) => {
  return (
    <Card
      padding="$4"
      borderRadius="$6"
      style={glassCardStyle}
      role="region"
      aria-label="Fly Away Card"
      marginTop={"$4"}
    >
      <YStack gap="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$6" fontWeight="600" style={glassTextStyle}>
            {city}
          </Text>
          {icon && <>{icon}</>}
        </XStack>
        <Text style={glassTextStyle}>
          Temperature: {temperature}°{unit}
        </Text>
        <Text style={glassTextStyle}>
          Wind Speed: {wind} {windUnit}
        </Text>
        {onDelete && (
          <Button
            size="$2"
            backgroundColor="rgba(72, 190, 229, 0.62)"
            borderColor="rgba(14, 27, 203, 0.7)"
            borderWidth={1}
            color="black"
            onPress={onDelete}
            alignSelf="flex-end"
            pressStyle={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
          >
            x
          </Button>
        )}
      </YStack>
    </Card>
  );
};

export default FlyAwayCard;
