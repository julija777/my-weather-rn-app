import { API_BASE_URL, DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "@/constants/constants";
import { TemperatureUnit, WeatherApiResponse } from "@/types/types";

export const fetchWeatherData = async (
  latitude: number = DEFAULT_LATITUDE,
  longitude: number = DEFAULT_LONGITUDE,
  temperatureUnit: TemperatureUnit = 'fahrenheit'
): Promise<WeatherApiResponse> => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    temperature_unit: temperatureUnit,
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    timeformat: 'unixtime',
    timezone: 'auto'
  });

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch weather data: ${response.status} ${errorBody}`);
  }
  
  const data: WeatherApiResponse = await response.json();
  return data;
};