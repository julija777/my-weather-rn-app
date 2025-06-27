import { colours } from "@/themes/colours";
import React from "react";
import { Input } from "tamagui";

type FlyAwayInputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
};

const FlyAwayInput: React.FC<FlyAwayInputProps> = ({
  placeholder = "Enter city name",
  value,
  onChangeText,
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      marginBottom="$2"
      backgroundColor={colours.greyPrimary}
      borderColor={colours.borderColorPrimary}
      color={colours.textWhite}
      placeholderTextColor={colours.textPlaceholder}
    />
  );
};

export default FlyAwayInput;
