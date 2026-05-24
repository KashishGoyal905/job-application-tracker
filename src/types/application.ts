export type ApplicationStatusType = "Applied" | "Interview" | "Offer" | "Rejected";

export type ApplicationType = {
    id: number,
    company: string,
    role: string,
    status: ApplicationStatusType,
    appliedDate: string;
}