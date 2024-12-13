"use client";

interface TripsByMonthChartProps {
  data: Record<string, number>;
}

const monthNames = [
  "Gen",
  "Febr",
  "Març",
  "Abr",
  "Maig",
  "Juny",
  "Jul",
  "Ag",
  "Set",
  "Oct",
  "Nov",
  "Des",
];

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

export default function TripsByMonthChart({ data }: TripsByMonthChartProps) {
  const chartData = Object.entries(data).map(([month, trips]) => ({
    month: monthNames[parseInt(month) - 1],
    trips: trips,
  }));

  return (
    <Card variant="blur">
      <CardHeader>
        <CardTitle>
          <span className="pr-2 text-3xl">🗓️</span> Trajectes per mes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey="trips" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={10}
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
