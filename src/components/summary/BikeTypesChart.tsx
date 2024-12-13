"use client";

import { Pie, PieChart } from "recharts";
import { Label } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
interface BikeType {
  bikeType: string;
  count: number;
}

interface BikeTypesChartProps {
  data: BikeType[];
}

const chartConfig = {
  ELECTRIC: {
    label: "⚡ Elèctrica",
    color: "hsl(var(--chart-1))",
  },
  MECHANICAL: {
    label: "💪 Mecànica",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function BikeTypesChart({ data }: BikeTypesChartProps) {
  const totalVisitors = data.reduce((acc, curr) => acc + curr.count, 0);
  const formattedData = data.map((item) => ({
    ...item,
    label: item.bikeType === "ELECTRIC" ? "Elèctrica" : "Mecànica",
    fill:
      item.bikeType === "ELECTRIC"
        ? "hsl(var(--chart-2))"
        : "hsl(var(--chart-1))",
  }));

  return (
    <Card className="flex flex-col" variant="blur">
      <CardHeader className="pb-0">
        <CardTitle>
          <span className="pr-2 text-3xl">🚲</span> Tipus de bicicleta
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={formattedData}
              dataKey="count"
              nameKey="bikeType"
              innerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Trajectes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="bikeType" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
