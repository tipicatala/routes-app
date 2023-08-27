
interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface Distance {
  from: string;
  to: string;
  distance: number;
}

// interface APIResponse<T> {
//   data: T;
// }

const cityDataArray: [string, number, number][] = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.369780],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.579180],
  ['Lille', 50.629250, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.494370, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928000],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.041480],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
];

export const citiesDatabase: City[] = cityDataArray.map(([name, lat, lon]) => ({ name, lat, lon }));

const simulateDelay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const simulateFail = (phrase: string) => phrase.toLowerCase().includes('fail');

export const searchCities = async (keyword: string): Promise<City[]> => {
  await simulateDelay(500);

  if (simulateFail(keyword)) {
    throw new Error('Failed to retrieve cities.');
  }

  const filteredCities = citiesDatabase.filter(city =>
    city.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return filteredCities;
};


export const calculateDistance = async (cityNames: string[]): Promise<{ totalDistance: number; distances: Distance[] }> => {
  await simulateDelay(800);

  if (cityNames.includes('Dijon')) {
    throw new Error('Failed to calculate distance.');
  }

  const selectedCities = citiesDatabase.filter(city => cityNames.includes(city.name));

  const distances: Distance[] = selectedCities.slice(0, -1).map((cityA, index) => {
    const cityB = selectedCities[index + 1];
    const distance = haversineDistance(cityA.lat, cityA.lon, cityB.lat, cityB.lon);
    return { from: cityA.name, to: cityB.name, distance };
  });

  const totalDistance = distances.reduce((total, current) => total + current.distance, 0);

  return { totalDistance, distances };
};

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
