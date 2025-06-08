import React from 'react'
import { XStack, Button, YStack } from 'tamagui'

type TabKey = 'teal' | 'blue' | 'purple'

interface TabOption {
  key: TabKey
  label: string
}

interface SlidingTabsProps {
  options: readonly TabOption[]
  active: TabKey
  onChange: (key: TabKey) => void
  themeColors: TabKey
}


const TAB_CONTAINER_COLORS = {
  teal: '#00596B',
  blue: '#191D64',
  purple: '#301934',
}

const TAB_BG_COLORS: Record<TabKey, string> = {
  teal: '#00596B',
  blue: '#191D64',
  purple: '#301934',
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
  paddingBottom="$2"
  paddingTop="$2"
>
  <XStack
      justifyContent="space-around"
      alignItems="center"
      padding="$1"
      borderRadius="$10"
      backgroundColor={TAB_BG_COLORS[themeColors]}
      elevation="$2"
    >
      {options.map((tab) => {
        const isActive = tab.key === active
        return (
          <Button
            key={tab.key}
            size="$3"
            borderRadius="$10"
            fontWeight="600"
            flex={1}
            onPress={() => onChange(tab.key)}
            backgroundColor={isActive ? 'yellow' : 'transparent'}
            color={isActive ? '$color' : '#fff'}
            pressStyle={{
              backgroundColor: isActive ? 'yellow' : 'rgba(255,255,255,0.1)',
            }}
          >
            {tab.label}
          </Button>
        )
      })}
    </XStack>
    </YStack>
  )
}
