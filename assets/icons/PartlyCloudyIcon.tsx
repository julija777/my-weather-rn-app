import { CloudSun } from "lucide-react-native";

export const PartlyCloudyIcon: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({ width = 56, height = 48, color = "#FFD94D" }) => (
  <CloudSun size={Math.max(width, height)} color={color} />
);
