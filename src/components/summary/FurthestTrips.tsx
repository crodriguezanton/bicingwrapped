"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { EnrichedTrip } from "~/server/api/bicing/types";

interface FurthestTripsProps {
  data: EnrichedTrip[];
}

export default function FurthestTrips({ data }: FurthestTripsProps) {
  return (
    <Card variant="blur">
      <CardHeader>
        <CardTitle>
          <span className="pr-2 text-3xl">🏅</span> Trajectes més llargs
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {data.map((trip, i) => (
          <div key={trip.id} className="flex flex-row items-center gap-2">
            <div className="w-10 text-center text-xl font-bold">{i + 1}</div>
            <div className="flex-1 leading-tight">
              <p className="font-medium">{trip.startStationName}</p>
              <p className="font-medium">{trip.endStationName}</p>
            </div>
            <p className="text-lg font-semibold">
              {(trip.distance / 1000).toFixed(2)}
              <span className="text-base font-medium"> km</span>
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
