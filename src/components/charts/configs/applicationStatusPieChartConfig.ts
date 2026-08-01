import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
    Applied: { // these fields should match the data passed to the chart.
        label: "Applied",
        color: "var(--chart-2)",
    },

    Interview: { // these fields should match the data passed to the chart.
        label: "Interview",
        color: "var(--chart-3)",
    },

    Offer: { // these fields should match the data passed to the chart.
        label: "Offered",
        color: "var(--chart-4)",
    },

    Rejected: { // these fields should match the data passed to the chart. 
        label: "Rejected",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;