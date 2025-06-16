import { TAB_CONTAINER_COLORS, THEME_COLORS } from "@/types/colourTypes";
import React from "react";
import { Button, XStack, YStack } from "tamagui";

type TabKey = "teal" | "blue" | "purple";

interface TabOption {
  key: TabKey;
  label: string;
}

interface SlidingTabsProps {
  options: readonly TabOption[];
  active: TabKey;
  onChange: (key: TabKey) => void;
  themeColors: TabKey;
}

export const SlidingTabs: React.FC<SlidingTabsProps> = ({
  options,
  active,
  onChange,
  themeColors,
}) => {
  return (
    <YStack
      backgroundColor={TAB_CONTAINER_COLORS[active]}
      paddingBottom="$4"
      paddingTop="$4"
      paddingHorizontal="$5"
    >
      <XStack
        justifyContent="space-around"
        alignItems="center"
        borderRadius="$10"
        backgroundColor={THEME_COLORS[active]}
        elevation="$2"
      >
        {options.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Button
              key={tab.key}
              size="$3"
              borderRadius="$10"
              fontWeight="bold"
              flex={1}
              onPress={() => onChange(tab.key)}
              backgroundColor={isActive ? "yellow" : "transparent"}
              color={isActive ? "$color" : "#fff"}
              pressStyle={{
                backgroundColor: isActive ? "yellow" : "rgba(255,255,255,0.1)",
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </XStack>
    </YStack>
  );
};
