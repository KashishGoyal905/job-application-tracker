import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type ApplicationStatusBarChartProps = {
    chartData: { status: string, count: number }[],
}

export default function ApplicationStatusBarChart({ chartData }: ApplicationStatusBarChartProps) {
    return (
        <div className="h-[350px] rounded-xl border bg-white dark:bg-slate-900 p-6">
            <h2 className="mb-2 font-semibold text-slate-800 dark:text-white">Application Status</h2>
            {/* plotting */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="count"
                        radius={[10, 10, 0, 0]}
                        fill="#6366f1"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}