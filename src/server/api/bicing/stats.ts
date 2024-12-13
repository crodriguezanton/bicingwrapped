import { type EnrichedTrip, type ProcessedTrip, type Trip } from "./types";
import { stations } from "./stations";

export function processTrips(trips: Trip[]): ProcessedTrip[] {
  return trips.map(processTrip);
}

function processTrip(trip: Trip): ProcessedTrip {
  const startStation = stations.find(
    (station) => station.id === trip.startStationId,
  );
  const endStation = stations.find(
    (station) => station.id === trip.endStationId,
  );

  if (!startStation || !endStation) {
    console.error(
      `Station not found for trip ${trip.startStationId} -> ${trip.endStationId}`,
    );
    return trip;
  }

  const distance = getDistance(startStation.location, endStation.location);

  return {
    ...trip,
    startStationLocation: startStation.location,
    endStationLocation: endStation.location,
    distance,
    elevationGain: getElevationGain(startStation.altitude, endStation.altitude),
    speed: getSpeed(trip.duration, distance),
  };
}

function tripsWithEnrichedData(trips: ProcessedTrip[]): EnrichedTrip[] {
  return trips.filter(
    (trip) => "startStationLocation" in trip && "endStationLocation" in trip,
  );
}

function tripsWithElevationGainData(trips: ProcessedTrip[]): EnrichedTrip[] {
  return tripsWithEnrichedData(trips).filter(
    (trip) => "elevationGain" in trip && trip.elevationGain !== null,
  );
}

function getDistance(
  startStationLocation: [number, number],
  endStationLocation: [number, number],
): number {
  const [lon1, lat1] = startStationLocation;
  const [lon2, lat2] = endStationLocation;

  const R = 6371000;
  const phi1 = lat1 * (Math.PI / 180);
  const phi2 = lat2 * (Math.PI / 180);
  const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
  const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

function getElevationGain(
  startStationAltitude: number | null,
  endStationAltitude: number | null,
): number | null {
  if (startStationAltitude === null || endStationAltitude === null) {
    return null;
  }

  return endStationAltitude - startStationAltitude;
}

function getSpeed(duration: number, distance: number): number {
  return distance / 1000 / (duration / 3600);
}

export function getTopStations(trips: ProcessedTrip[]) {
  const stations = trips
    .map((trip) => trip.startStationId)
    .concat(trips.map((trip) => trip.endStationId));
  const stationCounts = stations.reduce(
    (acc, station) => {
      acc[station] = (acc[station] ?? 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return Object.entries(stationCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([station, count]) => ({
      station,
      count,
    }))
    .slice(0, 10);
}

export function getTopStartStations(trips: ProcessedTrip[]) {
  const stations = trips.map((trip) => trip.startStationId);
  const stationCounts = stations.reduce(
    (acc, station) => {
      acc[station] = (acc[station] ?? 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return Object.entries(stationCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([station, count]) => ({
      station,
      count,
    }))
    .slice(0, 10);
}

export function getTopEndStations(trips: ProcessedTrip[]) {
  const stations = trips.map((trip) => trip.endStationId);
  const stationCounts = stations.reduce(
    (acc, station) => {
      acc[station] = (acc[station] ?? 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return Object.entries(stationCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([station, count]) => ({
      station,
      count,
    }))
    .slice(0, 10);
}

export function getBikeTypes(trips: ProcessedTrip[]) {
  const bikeTypes = trips.map((trip) => trip.bikeType);
  const bikeTypeCounts = bikeTypes.reduce(
    (acc, bikeType) => {
      acc[bikeType] = (acc[bikeType] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(bikeTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([bikeType, count]) => ({
      bikeType,
      count,
    }))
    .slice(0, 10);
}

export function totalDuration(trips: ProcessedTrip[]) {
  return trips.reduce((acc, trip) => acc + trip.duration, 0);
}

export function totalDistance(trips: ProcessedTrip[]) {
  return tripsWithEnrichedData(trips).reduce(
    (acc, trip) => acc + trip.distance,
    0,
  );
}

export function totalElevationGain(trips: ProcessedTrip[]) {
  return tripsWithElevationGainData(trips)
    .filter((trip) => trip.elevationGain! > 0)
    .reduce((acc, trip) => acc + trip.elevationGain!, 0);
}

export function totalBikeMalfunction(trips: ProcessedTrip[]) {
  return trips.filter(
    (trip) =>
      trip.startStationId === trip.endStationId && trip.duration < 5 * 60,
  ).length;
}

export function totalCost(trips: ProcessedTrip[]) {
  return trips.reduce((acc, trip) => acc + trip.price, 0);
}

export function fastestTrips(trips: ProcessedTrip[]) {
  return tripsWithEnrichedData(trips)
    .sort((a, b) => b.speed - a.speed)
    .slice(0, 10);
}

export function furthestTrips(trips: ProcessedTrip[]) {
  return tripsWithEnrichedData(trips)
    .sort((a, b) => b.distance - a.distance)
    .filter(
      (trip, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.startStationId === trip.startStationId &&
            t.endStationId === trip.endStationId,
        ),
    )
    .slice(0, 10);
}

export function topClimbingTrips(trips: ProcessedTrip[]) {
  return tripsWithElevationGainData(trips)
    .sort((a, b) => b.elevationGain! - a.elevationGain!)
    .filter(
      (trip, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.startStationId === trip.startStationId &&
            t.endStationId === trip.endStationId,
        ),
    )
    .slice(0, 10);
}

export function getTopBikes(trips: ProcessedTrip[]) {
  const bikes = trips.map((trip) => trip.bikeId);
  const bikeCounts = bikes.reduce(
    (acc, bike) => {
      acc[bike] = (acc[bike] ?? 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return Object.entries(bikeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([bike, count]) => ({
      bike,
      count,
    }))
    .filter((bike) => bike.count > 1);
}

export function getTripsByMonth(trips: ProcessedTrip[]) {
  return trips.reduce(
    (acc, trip) => {
      const month = new Date(trip.startTime).getMonth() + 1;
      acc[month] = (acc[month] ?? 0) + 1;
      return acc;
    },
    {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    } as Record<number, number>,
  );
}

export function getTripsByDayOfTheWeek(trips: ProcessedTrip[]) {
  return trips.reduce(
    (acc, trip) => {
      const day = new Date(trip.startTime).getDay();
      acc[day] = (acc[day] ?? 0) + 1;
      return acc;
    },
    {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    } as Record<number, number>,
  );
}

export function getTripsByHourOfTheDay(trips: ProcessedTrip[]) {
  return trips.reduce(
    (acc, trip) => {
      const hour = new Date(trip.startTime).getHours();
      acc[hour] = (acc[hour] ?? 0) + 1;
      return acc;
    },
    {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
    } as Record<number, number>,
  );
}
