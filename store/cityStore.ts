import { observable } from '@legendapp/state';

export const cityState = observable({
  savedCities: [] as { name: string; weather: CurrentWeatherData }[],
});

export interface CurrentWeatherData {
  city: string;
  temperature: number;
  wind: number;
}

