// This hook handles all the logic for "Now", "Tomorrow", and "Next 5 Days".
import { useEffect, useState } from 'react';

const DEFAULT_COORDINATES = { latitude: 51.5072, longitude: -0.1276 };

function getDateStrings() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextFiveDays = [];
  for (let i = 2; i <= 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    nextFiveDays.push(date.toISOString().split('T')[0]);
  }
  return {
    now: today.toISOString().split('T')[0],
    tomorrow: tomorrow.toISOString().split('T')[0],
    nextFiveDays,
  };
}

export function useWeatherData(activeTab: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { now, tomorrow, nextFiveDays } = getDateStrings();
    let url = '';
    if (activeTab === 'teal') {
      url = `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_COORDINATES.latitude}&longitude=${DEFAULT_COORDINATES.longitude}&current_weather=true&hourly=temperature_2m,weathercode&timezone=auto`;
    } else if (activeTab === 'blue') {
      url = `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_COORDINATES.latitude}&longitude=${DEFAULT_COORDINATES.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&start_date=${tomorrow}&end_date=${tomorrow}&timezone=auto`;
    } else if (activeTab === 'purple') {
      url = `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_COORDINATES.latitude}&longitude=${DEFAULT_COORDINATES.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&start_date=${nextFiveDays[0]}&end_date=${nextFiveDays[4]}&timezone=auto`;
    }
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [activeTab]);

  return { data, loading };
}
