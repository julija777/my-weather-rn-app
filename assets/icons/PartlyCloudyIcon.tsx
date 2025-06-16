import React from "react";
import { Svg, Circle, Path } from "react-native-svg";

export const PartlyCloudyIcon: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 72, height = 56 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 72 56"
    accessible
    accessibilityRole="image"
    accessibilityLabel="Partly cloudy icon: sun behind a cloud"
  >
    {/* Accessibility title for screen readers */}
    {/* <title>Partly cloudy icon: sun behind a cloud</title> */}
    {/* Sun */}
    <Circle cx={48} cy={22} r={14} fill="#FFD94D" />
    {/* Cloud */}
    <Path
      d="M56.6703 33.4267C56.0077 33.1403 55.3077 33 54.5837 33C50.9637 33 48.6037 30.7133 47.0037 28.2C46.1137 30.3867 43.7137 32.5333 40.5137 32.5333C37.4837 32.5333 35.4037 30.7133 34.0037 28.8533C32.7137 30.7133 30.4037 32.24 27.5137 32.24C23.5137 32.24 20.7137 29.1467 20.0037 27.0667C17.5137 27.7333 15.3337 30.4533 15.3337 33.5333C15.3337 37.6533 18.7137 41 22.8337 41H50.5137C54.6803 41 58.1637 37.8933 58.467 33.76C57.9403 33.7133 57.3003 33.6 56.6703 33.4267Z"
      fill="#FFFFFF"
    />
  </Svg>
);
