"use client";

import React from "react";
import TopStationsChart from "~/components/summary/TopStationsChart";
import BikeTypesChart from "~/components/summary/BikeTypesChart";
import TripsByMonthChart from "~/components/summary/TripsByMonthChart";
import TripsByDayChart from "~/components/summary/TripsByDayChart";
import TripsByHourChart from "~/components/summary/TripsByHourChart";
import UserProfile from "~/components/summary/UserProfile";
import StatsOverview from "~/components/summary/StatsOverview";
import { useRouter } from "next/navigation";
import { useWrappedData } from "~/hooks/useWrappedData";
import FurthestTrips from "./FurthestTrips";
import FastestTrips from "./FastestTrips";
import TopClimbingTrips from "./TopClimbingTrips";
import TopBikes from "./TopBikes";

export default function Dashboard() {
  const router = useRouter();

  const { data, loading } = useWrappedData();

  if (!data && !loading) {
    void router.push("/");
    return null;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="space-y-4">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-x-4">
        <UserProfile profile={data.profile} />
        <StatsOverview stats={data.stats} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TopStationsChart
          topStations={data.stats.topStations}
          topStartStations={data.stats.topStartStations}
          topEndStations={data.stats.topEndStations}
        />

        <BikeTypesChart data={data.stats.bikeTypes} />
      </div>

      <TripsByMonthChart data={data.stats.tripsByMonth} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TripsByDayChart data={data.stats.tripsByDayOfTheWeek} />
        <TripsByHourChart data={data.stats.tripsByHourOfTheDay} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FurthestTrips data={data.stats.furthestTrips} />
        <FastestTrips data={data.stats.fastestTrips} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TopClimbingTrips data={data.stats.topClimbingTrips} />
        <TopBikes data={data.stats.topBikes} />
      </div>
    </main>
  );
}
