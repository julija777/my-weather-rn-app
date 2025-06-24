import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface LocationData {
  city: string | null;
  error: string | null;
  latitude: number | null;
  longitude: number | null;
}

const DEFAULT_COORDINATES = { latitude: 51.5072, longitude: -0.1276 }; // London coordinates

export function useLocation(): LocationData {
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(
    DEFAULT_COORDINATES.latitude,
  );
  const [longitude, setLongitude] = useState<number | null>(
    DEFAULT_COORDINATES.longitude,
  );

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError(
            "Location permission denied. Using default location (London).",
          );
          setCity("London");
          return;
        }

        // Get current position
        let location = await Location.getCurrentPositionAsync({});
        const { latitude: lat, longitude: lng } = location.coords;

        setLatitude(lat);
        setLongitude(lng);

        // Reverse geocode to get city name
        let [address] = await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lng,
        });

        if (address) {
          const cityName =
            address.city ||
            address.subregion ||
            address.region ||
            "Unknown Location";
          setCity(cityName);
        } else {
          setCity("Unknown Location");
        }
      } catch (err) {
        console.error("Error getting location:", err);
        setError("Failed to get location. Using default location (London).");
        setCity("London");
        // Keep default coordinates
      }
    }

    getCurrentLocation();
  }, []);

  return { city, error, latitude, longitude };
}
