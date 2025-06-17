import React from "react";
import { observer } from "@legendapp/state/react";
import { YStack } from "tamagui";
import { cityState } from "@/store/cityStore";
import FlyAwayCard from "@/components/Cards/FlyAwayCard";

const SavedCitiesList = observer(() => {
  const saved = cityState.savedCities.get();

  return (
    <YStack gap="$3" marginTop="$2">
      {saved.map((cityObj, idx) => (
        <YStack key={idx}>
          <FlyAwayCard
            city={cityObj.weather.city}
            temperature={cityObj.weather.temperature}
            wind={cityObj.weather.wind}
            unit="C"
            windUnit="km/h"
            icon={null}
            onDelete={() => {
              cityState.savedCities.set((prev) =>
                prev.filter((c) => c.name !== cityObj.name)
              );
            }}
          />
        </YStack>
      ))}
    </YStack>
  );
});

export default SavedCitiesList;
