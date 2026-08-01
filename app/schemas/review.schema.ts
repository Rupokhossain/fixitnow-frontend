import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please select at least 1 star").max(5),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;