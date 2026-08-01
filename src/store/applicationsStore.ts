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

export const useApplicationStore = create<ApplicationStore>()( // create, creates a global store
    persist(
        (set, get) => ({ // set is used to update the state. get is used to get the current state inside the store itself.
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
            editApplication: (id, application) => set((state) => ({ // this method is prefered when new state depends on the previous state rather set({applications: [...]})
                applications: state.applications.map((app) =>
                    app.id === id ? { ...app, ...application } : app // spread synatx is used to create a new array
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

