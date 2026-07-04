import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
    Applied: {
        label: "Applied",
        color: "var(--chart-2)",
    },

    Interview: {
        label: "Interview",
        color: "var(--chart-3)",
    },

    Offer: {
        label: "Offer",
        color: "var(--chart-4)",
    },

    Rejected: {
        label: "Rejected",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;