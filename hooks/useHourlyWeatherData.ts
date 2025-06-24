import { useEffect, useState } from "react";
import { useLocation } from "./useLocation";

interface HourlyWeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
    relative_humidity_2m?: number[];
    wind_speed_10m?: number[];
    precipitation?: number[];
  };
}

export function useHourlyWeatherData(day: "today" | "tomorrow") {
  const [data, setData] = useState<HourlyWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { latitude, longitude } = useLocation();

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchHourlyData = async () => {
      setLoading(true);
      setError(null);

      try {
        const targetDate = new Date();
        if (day === "tomorrow") {
          targetDate.setDate(targetDate.getDate() + 1);
        }

        const dateString = targetDate.toISOString().split("T")[0];

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,relative_humidity_2m,wind_speed_10m,precipitation&start_date=${dateString}&end_date=${dateString}&timezone=auto`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching hourly weather data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch hourly weather data",
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyData();
  }, [day, latitude, longitude]);

  return { data, loading, error };
}
