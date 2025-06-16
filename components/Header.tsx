import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, XStack, Heading } from "tamagui";

type HeaderProps = {
  color: string;
  title: string;
  notification?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Header({
  color,
  title,
  notification,
  right,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <YStack
      backgroundColor={color}
      paddingTop={insets.top + 18}
      paddingBottom="$4"
      paddingHorizontal="$5"
      width="100%"
      alignSelf="center"
      elevation="$3"
    >
      <XStack alignItems="center" justifyContent="space-between" width="100%">
        <Heading color="white" size="$7" fontWeight="700">
          {title}
        </Heading>
        {right}
      </XStack>
      {notification && <YStack marginTop="$3">{notification}</YStack>}
    </YStack>
  );
}
