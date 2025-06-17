import React from "react";
import { Button } from "tamagui";

type FlyAwayButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
};

const FlyAwayButton: React.FC<FlyAwayButtonProps> = ({ onPress, children }) => {
  return (
    <Button
      onPress={onPress}
      backgroundColor="rgba(255, 255, 255, 0.2)"
      borderColor="rgba(255, 255, 255, 0.4)"
      borderWidth={1}
      color="white"
      pressStyle={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
      }}
    >
      {children}
    </Button>
  );
};

export default FlyAwayButton;
