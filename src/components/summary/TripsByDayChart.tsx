"use client";

interface TripsByDayChartProps {
  data: Record<string, number>;
}

const dayNames = ["Dg", "Dl", "Dt", "Dm", "Dc", "Dj", "Dv", "Ds"];

import { BarChart, Bar, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type ChartConfig, ChartContainer } from "~/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TripsByDayChart({ data }: TripsByDayChartProps) {
  const [sunday, ...days] = Object.entries(data);
  const chartData = [...days, sunday!].map(([day, trips]) => ({
    name: dayNames[parseInt(day)],
    trips,
  }));

  return (
    <Card variant="blur">
      <CardHeader>
        <CardTitle>
          <span className="pr-2 text-3xl">📆</span> Trajectes per dia de la
          setmana
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey="trips" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground font-semibold"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
