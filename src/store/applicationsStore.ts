import { ApplicationType } from "@/types/application"
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ApplicationStore = {
    applications: ApplicationType[];
    addApplication: (application: Omit<ApplicationType, "id">) => void;
    editApplication: (id: number, application: Omit<ApplicationType, "id">) => void;
    deleteApplication: (id: number) => void;
    getApplication: (id: number) => ApplicationType | undefined;
}

// const dummyApplications: ApplicationType[] = [
//     {
//         id: 1,
//         company: "Google",
//         role: "Frontend Developer",
//         status: "Interview" as const,
//         appliedDate: "12 May 2026",
//     },
//     {
//         id: 2,
//         company: "Microsoft",
//         role: "Frontend Developer",
//         status: "Applied" as const,
//         appliedDate: "12 May 2026",
//     },
//     {
//         id: 3,
//         company: "Netflix",
//         role: "Frontend Developer",
//         status: "Rejected" as const,
//         appliedDate: "12 May 2026",
//     },
//     {
//         id: 4,
//         company: "Netflix",
//         role: "Frontend Developer",
//         status: "Rejected" as const,
//         appliedDate: "12 May 2026",
//     },
//     {
//         id: 5,
//         company: "Netflix",
//         role: "Frontend Developer",
//         status: "Rejected" as const,
//         appliedDate: "12 May 2026",
//     },
//     {
//         id: 6,
//         company: "Netflix",
//         role: "Frontend Developer",
//         status: "Rejected" as const,
//         appliedDate: "12 May 2026",
//     },
// ];

export const useApplicationStore = create<ApplicationStore>()(
    persist(
        (set, get) => ({
            applications: [],
            addApplication: (application) => set((state) => ({
                applications: [
                    {
                        id: Math.random() * 100000,
                        ...application,
                    },
                    ...state.applications,
                ]
            })),
            editApplication: (id, application) => set((state) => ({
                applications: state.applications.map((app) =>
                    app.id === id ? { ...app, ...application } : app
                )
            })),
            deleteApplication: (id) => set((state) => ({
                applications: state.applications.filter((app) => app.id !== id)
            })),
            getApplication: (id) => get().applications.find((app) => app.id === id)
        }),
        { name: "application-storage" }
    )
);

