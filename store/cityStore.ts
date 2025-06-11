import { observable } from '@legendapp/state';

export const cityState = observable({
  savedCities: [] as { name: string; weather: WeatherData }[],
});

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  date: string;
  min: number;
  max: number;
}
