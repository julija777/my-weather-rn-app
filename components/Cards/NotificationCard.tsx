import { colours } from "@/themes/colours";
import { LucideTrash2 } from "lucide-react-native";
import { Card, Stack, Text, XStack, Button } from "tamagui";

type NotificationCardProps = {
  icon?: React.ReactNode;
  message: string;
  description?: string;
  onPress?: () => void;
  onClose?: () => void;
  backgroundColor?: string;
};

const NotificationCard = ({
  icon,
  message,
  description,
  backgroundColor,
  onPress,
  onClose,
}: NotificationCardProps) => (
  <Card
    elevate
    backgroundColor={backgroundColor}
    padding="$5"
    onPress={onPress}
    position="relative"
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
      {onClose && (
        <Button
          size="$2"
          circular
          backgroundColor="transparent"
          onPress={onClose}
        >
          <LucideTrash2 size={16} color={colours.accent} />
        </Button>
      )}
    </XStack>
  </Card>
);

export default NotificationCard;
