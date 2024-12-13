"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface TopBikesProps {
  data: {
    bike: string;
    count: number;
  }[];
}

export default function TopBikes({ data }: TopBikesProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <Card variant="blur">
      <CardHeader>
        <CardTitle>
          <span className="pr-2 text-3xl">⭐</span> Bicis més utilitzades
        </CardTitle>
        <CardDescription>
          Sí, a vegades has repetit de bicicleta. 😜
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {data.map((topBike, i) => (
          <div key={i} className="flex flex-row items-center gap-2">
            <div className="w-10 text-center text-xl font-bold">{i + 1}</div>
            <p className="flex-1 font-medium">
              Bicicleta núm. <span className="font-bold">{topBike.bike}</span>
            </p>
            <p className="text-lg font-semibold">{topBike.count}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
