import { useEffect, useState } from "react";

export function useGeoPosition(active = true, options?: PositionOptions) {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    let canceled = false;

    if (active) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          if (!canceled) {
            setPosition(position);
          }
        },
        (error) => {
          if (!canceled) {
            setError(error);
          }
        },
        options
      );
    }
    return () => {
      canceled = true;
    };
  }, [options, active]);

  return [position, error] as [GeolocationPosition, GeolocationPositionError];
}
