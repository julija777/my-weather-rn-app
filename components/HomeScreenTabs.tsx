import { Tabs, SizableText } from 'tamagui';
import type { ColorScheme, TabOption } from '../types';
import { headerColors } from '@/constants/Colors';

type HomeScreenTabsProps = {
  options: TabOption[];
  active: ColorScheme;
  onChange: (key: ColorScheme) => void;
};

export default function HomeScreenTabs({ options, active, onChange }: HomeScreenTabsProps) {
  return (
    <Tabs
      value={active}
      onValueChange={(value) => onChange(value as ColorScheme)}
      alignSelf="center"
      marginTop="$6"
      backgroundColor="transparent"
    >
      <Tabs.List flexDirection="row" gap="$4">
        {options.map(option => (
          <Tabs.Tab
            key={option.key}
            value={option.key}
            unstyled
            backgroundColor={active === option.key ? headerColors[option.key] : 'white'}
            borderRadius="$10"
            paddingHorizontal="$6"
            paddingVertical="$3"
            minWidth={100}
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            borderColor={active === option.key ? headerColors[option.key] : '$gray6'}
            shadowColor="black"
            shadowOpacity={active === option.key ? 0.1 : 0}
            shadowRadius={8}
          >
            <SizableText
              color={active === option.key ? 'white' : '$color'}
              fontWeight={active === option.key ? 'bold' : 'normal'}
            >
              {option.label}
            </SizableText>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
