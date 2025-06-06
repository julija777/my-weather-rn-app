import { Card, Text, YStack } from 'tamagui'

type Props = {
  title: string
  value: string | number
  unit?: string
}

export default function WeatherCard({ title, value, unit }: Props) {
  return (
    <Card elevate size="$4" width={180} padding="$4" marginRight="$3">
      <YStack gap="$2" alignItems="center">
        <Text fontWeight="600">{title}</Text>
        <Text fontSize="$7">{value}{unit}</Text>
      </YStack>
    </Card>
  )
}
