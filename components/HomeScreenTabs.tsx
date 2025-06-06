import { Button, XStack } from 'tamagui'

type Tab = 'now' | 'hourly' | 'weekly'

export default function HomeScreenTabs({
  activeTab,
  setActiveTab
}: {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}) {
  const TABS = [
    { key: 'now', label: 'Now', color: '#00596B' },
    { key: 'hourly', label: 'Hourly', color: '#191D64' },
    { key: 'weekly', label: 'Weekly', color: '#301934' },
  ]

  return (
    <XStack gap="$2" justifyContent="space-between">
      {TABS.map(({ key, label, color }) => (
        <Button
          key={key}
          onPress={() => setActiveTab(key as Tab)}
          backgroundColor={color}
          color="white"
          flex={1}
        >
          {label}
        </Button>
      ))}
    </XStack>
  )
}
