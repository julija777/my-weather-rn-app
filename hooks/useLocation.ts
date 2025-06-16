import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        console.log("[useLocation] Requesting permissions...");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          const msg = "Location permission denied";
          console.error("[useLocation] ❌", msg);
          setError(msg);
          return;
        }

        console.log("[useLocation] Getting current position...");
        const { coords } = await Location.getCurrentPositionAsync({});
        console.log("[useLocation] ✅ Location:", coords);
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });

        console.log("[useLocation] Reverse geocoding...");
        const [place] = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        if (place) {
          const fullCity = `${place.city || ""}, ${place.region || ""}, ${place.country || ""}`;
          console.log("[useLocation] 🏙️ City:", fullCity);
          setCity(fullCity);
        } else {
          setCity("Unknown location");
        }
      } catch (err) {
        const msg = `Unexpected error: ${(err as Error).message}`;
        console.error("[useLocation] ❌", msg);
        setError(msg);
      }
    };

    getLocationAsync();
  }, []);

  return { location, city, error };
};
