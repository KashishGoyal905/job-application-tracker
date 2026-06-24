import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

type ApplicationStatusPieChartProps = {
    chartData: { status: string, count: number }[],
}

const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#22c55e",
    "#ef4444",
];

export default function ApplicationStatusPieChart({ chartData }: ApplicationStatusPieChartProps) {
    return (
        <div className="h-[350px] rounded-xl border bg-white dark:bg-slate-900 p-6">
            <h2 className="mb-2 font-semibold text-slate-800 dark:text-white">Application Status</h2>
            {/* plotting */}
            <ResponsiveContainer width="100%" height={300} >
                <PieChart data={chartData}>
                    <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill={COLORS[0]}
                        label
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}