import React from "react";
import { Card, Text, XStack, YStack, Button } from "tamagui";
import { glassCardStyle, glassTextStyle } from "../ui/glassCardStyle";
import { colours } from "@/themes/colours";
import { LucideTrash2, Sun } from "lucide-react-native";

type FlyAwayCardProps = {
  city: string;
  temperature: number;
  wind: number;
  icon?: React.ReactNode;
  onDelete?: () => void;
  unit?: "C" | "F"; // default to C
  windUnit?: "km/h" | "mph"; // default to km/h
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
            backgroundColor={colours.deleteButton}
            borderColor={colours.borderColorLight}
            borderWidth={1}
            color={colours.accent}
            onPress={onDelete}
            position="absolute"
            top="$2"
            right="$2"
          >
            <LucideTrash2 size={16} color={colours.accent} />
          </Button>
        )}
      </YStack>
    </Card>
  );
};

export default FlyAwayCard;
