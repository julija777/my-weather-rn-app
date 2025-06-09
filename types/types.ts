export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface CurrentWeather {
  location: unknown;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  time: string; 
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: CurrentWeather;
  daily: DailyWeather;
}

export interface CurrentWeatherCardProps {
  weatherData: WeatherApiResponse;
  currentTime: Date;
  temperatureUnit: TemperatureUnit;
  // locationName and onUnitChange are removed as they will be handled by the App component
}