import { colours } from "@/themes/colours";
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
      backgroundColor={colours.greyPrimary}
      borderColor={colours.borderColorPrimary}
      borderWidth={1}
      color={colours.textWhite}
      pressStyle={{
        backgroundColor: colours.glassBackgroundColor ,
      }}
    >
      {children}
    </Button>
  );
};

export default FlyAwayButton;
