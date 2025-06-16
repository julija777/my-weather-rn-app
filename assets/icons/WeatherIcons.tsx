import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  CloudFog,
} from "lucide-react-native";

interface WeatherIconProps {
  size?: number;
  color?: string;
}

export const SunIcon: React.FC<WeatherIconProps> = ({
  size = 64,
  color = "#fce803",
}) => <Sun size={size} color={color} />;

export const CloudyIcon: React.FC<WeatherIconProps> = ({
  size = 64,
  color = "#49C9E3",
}) => <Cloud size={size} color={color} />;

export const RainIcon: React.FC<WeatherIconProps> = ({
  size = 64,
  color = "#49C9E3",
}) => <CloudRain size={size} color={color} />;

export const SnowIcon: React.FC<WeatherIconProps> = ({
  size = 64,
  color = "#49C9E3",
}) => <CloudSnow size={size} color={color} />;

export const ThunderstormIcon: React.FC<WeatherIconProps> = ({
  size = 64,
  color = "#49C9E3",
}) => <Zap size={size} color={color} />;

export const FogIcon: React.FC<WeatherIconProps> = ({
  size = 64,
  color = "#49C9E3",
}) => <CloudFog size={size} color={color} />;
