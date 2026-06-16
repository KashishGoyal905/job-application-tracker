import z from "zod";

export const addApplicationSchema = z.object({
    company: z
        .string()
        .trim()
        .min(2, "Company name must be at least 2 characters"),
    role: z
        .string()
        .trim()
        .min(2, "Role must be at least 2 characters"),
    status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
    appliedDate: z
        .string()
        .min(1, "Applied date is required"),
})

export const editApplicationSchema = z.object({
    company: z
        .string()
        .trim()
        .min(2, "Company name must be at least 2 characters"),
    role: z
        .string()
        .trim()
        .min(2, "Role must be at least 2 characters"),
    status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
    applied: z
        .string()
        .min(1, "Applied date is required"),
})

export type ApplicationFormData = z.infer<typeof addApplicationSchema>;
export type EditApplicationFormData = z.infer<typeof editApplicationSchema>;