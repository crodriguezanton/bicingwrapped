import { env } from "~/env";
import {
  LoginResponseSchema,
  ProfileSchema,
  type Trip,
  TripsResponseSchema,
} from "./types";
import {
  fastestTrips,
  furthestTrips,
  getBikeTypes,
  getTopBikes,
  getTopEndStations,
  getTopStartStations,
  getTopStations,
  getTripsByDayOfTheWeek,
  getTripsByHourOfTheDay,
  getTripsByMonth,
  processTrips,
  topClimbingTrips,
  totalBikeMalfunction,
  totalCost,
  totalDistance,
  totalDuration,
  totalElevationGain,
} from "./stats";
import { stations } from "./stations";

export async function login(username: string, password: string) {
  const body = new URLSearchParams({
    grant_type: "password",
    client_id: "web",
    username,
    password,
    refresh_token: "null",
  });

  console.log(`Logging in with username ${username}`);

  const response = await fetch(
    "https://api.bsmsa.eu/ext/srvl/bsm/maas/app/v5/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${env.BICING_AUTH_HEADER}`,
      },
      body,
    },
  );

  return LoginResponseSchema.parse(await response.json());
}

export async function getProfile(accessToken: string) {
  const response = await fetch(
    "https://barcelona.publicbikesystem.net/customer/v3/profile",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-api-key": env.BICING_API_KEY,
      },
    },
  );

  return ProfileSchema.parse(await response.json());
}

export async function getTrips(accessToken: string) {
  const trips: Trip[] = [];
  let page = 1;
  let tripCount = 0;
  do {
    const response = await getTripsPage(accessToken, page);
    trips.push(...response.trips);
    tripCount = response.tripCount;
    page++;
  } while (tripCount !== 0);

  return trips;
}

async function getTripsPage(accessToken: string, page: number) {
  console.log(`Fetching trips page ${page}`);
  const response = await fetch(
    `https://barcelona.publicbikesystem.net/customer/v3/profile/trips?period=thisyear&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-api-key": env.BICING_API_KEY,
      },
    },
  );

  return TripsResponseSchema.parse(await response.json());
}

function addStationName(data: { station: string; count: number }) {
  return {
    ...data,
    stationName: stations.find((s) => s.id === parseInt(data.station))!.name,
  };
}

export function getStats(trips: Trip[]) {
  const processedTrips = processTrips(trips);
  return {
    topStations: getTopStations(processedTrips).map(addStationName),
    topStartStations: getTopStartStations(processedTrips).map(addStationName),
    topEndStations: getTopEndStations(processedTrips).map(addStationName),
    bikeTypes: getBikeTypes(processedTrips),
    totalTrips: processedTrips.length,
    totalDuration: totalDuration(processedTrips),
    totalDistance: totalDistance(processedTrips),
    totalElevationGain: totalElevationGain(processedTrips),
    totalBikeMalfunction: totalBikeMalfunction(processedTrips),
    totalCost: totalCost(processedTrips),
    furthestTrips: furthestTrips(processedTrips),
    fastestTrips: fastestTrips(processedTrips),
    topClimbingTrips: topClimbingTrips(processedTrips),
    topBikes: getTopBikes(processedTrips),
    tripsByMonth: getTripsByMonth(processedTrips),
    tripsByDayOfTheWeek: getTripsByDayOfTheWeek(processedTrips),
    tripsByHourOfTheDay: getTripsByHourOfTheDay(processedTrips),
  };
}

export async function generateReport(accessToken: string) {
  const profile = await getProfile(accessToken);
  const trips = await getTrips(accessToken);
  const stats = getStats(trips);
  return {
    profile,
    stats,
  };
}
