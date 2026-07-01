"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

type ApplicationsLineChartProps = {
    chartData: { month: string, applications: number }[]
}

const chartConfig = {
    applications: {
        label: "Applications",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export default function ApplicationsLineChart({ chartData }: ApplicationsLineChartProps) {
    return (
        <Card className="h-[350px] w-full rounded-xl border bg-white dark:bg-slate-900 p-4">
            <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Over the past 1yr</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            type="natural"
                            dataKey="applications"
                            stroke="var(--color-applications)"
                            strokeWidth={3}
                            dot={{
                                fill: "var(--color-applications)",
                            }}
                            activeDot={{
                                r: 7,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}