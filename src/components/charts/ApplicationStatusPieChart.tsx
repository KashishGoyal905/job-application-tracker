import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { chartConfig } from "./configs/applicationStatusPieChartConfig";


type ApplicationStatusPieChartProps = {
    chartData: { status: string, count: number }[],
}

export default function ApplicationStatusPieChart({ chartData }: ApplicationStatusPieChartProps) {
    return (
        <Card className="w-full rounded-xl border bg-white dark:bg-slate-900 p-4">
            <CardHeader>
                <CardTitle>Applications by Status</CardTitle>
                <CardDescription>Distribution of your job applications</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <PieChart>
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="status"
                            innerRadius={50}
                            stroke="hsl(var(--background))"
                            labelLine={false}
                            outerRadius={80}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="status" />}
                            className="-translate-y-2 flex gap-1 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}