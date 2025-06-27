import { colours } from "@/themes/colours";
import { THEME_COLORS } from "@/types/colourTypes";
import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";
import { YStack, XStack, Text } from "tamagui";

export const HourlyHeader = ({
  day,
  onBack,
}: {
  day: string;
  onBack: () => void;
}) => (
  <YStack
    paddingTop="$8"
    paddingHorizontal="$4"
    paddingBottom="$4"
    backgroundColor={colours.tealPrimary}
  >
    <XStack alignItems="center" gap="$3">
      <Pressable
        onPress={onBack}
        style={{
          backgroundColor: colours.greyPrimary,
          padding: 8,
          borderRadius: 8,
        }}
      >
        <ArrowLeft size={24} color="white" />
      </Pressable>
      <Text fontSize="$6" fontWeight="bold" color="white">
        {day === "today" ? "Today" : "Tomorrow"} - Hourly Forecast
      </Text>
    </XStack>
  </YStack>
);
