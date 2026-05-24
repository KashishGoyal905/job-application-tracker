export type ApplicationStatusType = "Applied" | "Interview" | "Rejected";

export type ApplicationType = {
    id: number,
    company: string,
    role: string,
    status: ApplicationStatusType,
    appliedDate: string;
}