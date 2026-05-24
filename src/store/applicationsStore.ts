import { ApplicationType } from "@/types/application"
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ApplicationStore = {
    applications: ApplicationType[];
    addApplications: (application: Omit<ApplicationType, "id">) => void;
}

const dummyApplications: ApplicationType[] = [
    {
        id: 1,
        company: "Google",
        role: "Frontend Developer",
        status: "Interview" as const,
        appliedDate: "12 May 2026",
    },
    {
        id: 2,
        company: "Microsoft",
        role: "Frontend Developer",
        status: "Applied" as const,
        appliedDate: "12 May 2026",
    },
    {
        id: 3,
        company: "Netflix",
        role: "Frontend Developer",
        status: "Rejected" as const,
        appliedDate: "12 May 2026",
    },
    {
        id: 4,
        company: "Netflix",
        role: "Frontend Developer",
        status: "Rejected" as const,
        appliedDate: "12 May 2026",
    },
    {
        id: 5,
        company: "Netflix",
        role: "Frontend Developer",
        status: "Rejected" as const,
        appliedDate: "12 May 2026",
    },
    {
        id: 6,
        company: "Netflix",
        role: "Frontend Developer",
        status: "Rejected" as const,
        appliedDate: "12 May 2026",
    },
];

export const useApplicationStore = create<ApplicationStore>()(
    persist(
        (set) => ({
            applications: dummyApplications,
            addApplications: (application) => set((state) => ({
                applications: [
                    {
                        id: state.applications.length + 1,
                        ...application,
                    },
                    ...state.applications,
                ]
            })),
        }),
        { name: "application-storage" }
    )
);

