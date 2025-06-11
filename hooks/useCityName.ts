// // hooks/useCityName.ts
// import { useEffect, useState } from 'react';

// export function useCityName(lat: number, lon: number) {
//   const [city, setCity] = useState<string>('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!lat || !lon) return;
//     setLoading(true);
//     fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`)
//       .then(res => res.json())
//       .then(json => {
//         console.log('City API result:', json);
//         setCity(json?.results?.[0]?.name || '');
//       })
//       .catch((err) => {
//         console.log('City API error:', err);
//         // setCity('');
//       })
//       .finally(() => setLoading(false));
//   }, [lat, lon]);

//   return { city, loading };
// }
