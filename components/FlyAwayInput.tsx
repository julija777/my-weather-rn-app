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
      backgroundColor="rgba(255, 255, 255, 0.2)"
      borderColor="rgba(255, 255, 255, 0.4)"
      color="white"
      placeholderTextColor="rgba(255, 255, 255, 0.7)"
    />
  );
};

export default FlyAwayInput;
