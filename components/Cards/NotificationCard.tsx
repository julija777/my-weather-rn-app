import { Card, Stack, Text, XStack } from "tamagui";

type NotificationCardProps = {
  icon?: React.ReactNode;
  message: string;
  description?: string;
  onPress?: () => void;
  backgroundColor?: string;
};

const NotificationCard = ({
  icon,
  message,
  description,
  backgroundColor,
  onPress,
}: NotificationCardProps) => (
  <Card
    elevate
    backgroundColor={backgroundColor}
    padding="$5"
    onPress={onPress}
  >
    <XStack alignItems="center" gap="$2">
      {icon && <Text fontSize="$4">{icon}</Text>}
      <Stack flex={1}>
        <Text fontWeight="bold" fontSize="$5">
          {message}
        </Text>
        {description && (
          <Text fontSize="$4" color="$gray500">
            {description}
          </Text>
        )}
      </Stack>
    </XStack>
  </Card>
);

export default NotificationCard;
