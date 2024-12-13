import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface StatsOverviewProps {
  stats: {
    totalDistance: number;
    totalElevationGain: number;
    totalBikeMalfunction: number;
    totalDuration: number;
    totalCost: number;
  };
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <Card className="col-span-3" variant="blur">
      <CardHeader>
        <CardTitle>Resum d&apos;estadístiques</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <div>
          <p className="text-sm font-medium text-foreground">
            Distància total 🌍
          </p>
          <p className="text-3xl font-semibold">
            {(stats.totalDistance / 1000).toFixed(2)}
            <span className="text-xl"> km</span>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Temps total ⏳</p>
          <p className="text-3xl font-semibold">
            {(stats.totalDuration / 60).toFixed(0)}
            <span className="text-xl"> min</span>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Desnivell positiu ⛰️
          </p>
          <p className="text-3xl font-semibold">
            {stats.totalElevationGain}
            <span className="text-xl"> m</span>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Cost total 🤑</p>
          <p className="text-3xl font-semibold">
            {(stats.totalCost ?? 0).toFixed(2)}
            <span className="text-xl"> €</span>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Bicicletes espatllades 🛠️
          </p>
          <p className="text-3xl font-semibold">{stats.totalBikeMalfunction}</p>
        </div>
      </CardContent>
    </Card>
  );
}
