"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { type ChartConfig, ChartContainer } from "~/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface TopStation {
  station: string;
  stationName: string;
  count: number;
}

interface TopStationsChartProps {
  topStations: TopStation[];
  topStartStations: TopStation[];
  topEndStations: TopStation[];
}

const chartConfig = {
  count: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export default function TopStationsChart({
  topStations,
  topStartStations,
  topEndStations,
}: TopStationsChartProps) {
  return (
    <Tabs defaultValue="total">
      <Card variant="blur">
        <CardHeader>
          <CardTitle>
            <span className="pr-2 text-3xl">🔥</span> Estacions més utilitzades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TabsContent value="total">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={topStations}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="station"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="count" type="number" hide />
                <Bar
                  dataKey="count"
                  layout="vertical"
                  fill="hsl(var(--chart-1) / 0.7)"
                  radius={4}
                >
                  <LabelList
                    dataKey="stationName"
                    position="insideLeft"
                    offset={50}
                    className="fill-foreground font-semibold"
                    width={300}
                    textBreakAll={false}
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="count"
                    offset={8}
                    position="insideLeft"
                    className="fill-foreground text-lg font-bold"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="sortida">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={topStartStations}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="station"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="count" type="number" hide />
                <Bar
                  dataKey="count"
                  layout="vertical"
                  fill="hsl(var(--chart-2) / 0.2)"
                  radius={4}
                >
                  <LabelList
                    dataKey="stationName"
                    position="insideLeft"
                    offset={50}
                    className="fill-foreground font-semibold"
                    width={300}
                    textBreakAll={false}
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="count"
                    offset={8}
                    position="insideLeft"
                    className="fill-foreground text-lg font-bold"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="arribada">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={topEndStations}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="station"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="count" type="number" hide />
                <Bar
                  dataKey="count"
                  layout="vertical"
                  fill="hsl(var(--chart-3) / 0.2)"
                  radius={4}
                >
                  <LabelList
                    dataKey="stationName"
                    position="insideLeft"
                    offset={50}
                    className="fill-foreground font-semibold"
                    width={300}
                    textBreakAll={false}
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="count"
                    offset={8}
                    position="insideLeft"
                    className="fill-foreground text-lg font-bold"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="total">Total</TabsTrigger>
            <TabsTrigger value="sortida">Sortida</TabsTrigger>
            <TabsTrigger value="arribada">Arribada</TabsTrigger>
          </TabsList>
        </CardFooter>
      </Card>
    </Tabs>
  );
}
