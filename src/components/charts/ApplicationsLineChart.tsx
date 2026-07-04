"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { chartConfig } from "./configs/applicationsLineChartConfig";

type ApplicationsLineChartProps = {
    chartData: { month: string, applications: number }[]
}

export default function ApplicationsLineChart({ chartData }: ApplicationsLineChartProps) {
    return (
        <Card className="w-full rounded-xl border bg-white dark:bg-slate-900 p-4">
            <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Monthly application trend</CardDescription>
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
                            strokeWidth={2}
                            dot={false}
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