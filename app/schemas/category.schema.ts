import { z } from "zod"

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(30, "Maximum 30 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
