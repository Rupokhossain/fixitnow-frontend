"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"


const profileSchema = z.object({
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  skills: z.string().min(5, "Skills are required (e.g. Plumbing, Electrical)"),
  experience: z.string().min(1, "Experience years is required"),
  price: z.string().min(1, "Starting price is required"),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function TechnicianProfilePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      skills: "",
      experience: "",
      price: "",
    }
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // এখানে তোমার API কল হবে: await updateTechnicianProfile(data).unwrap()
      console.log(data)
      toast.success("Profile and services updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile")
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Services & Profile</h1>
        <p className="text-gray-600">Setup your professional profile to attract more customers.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
          <CardDescription>This information will be visible to potential customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Professional Bio</label>
              <Textarea 
                {...register("bio")} 
                placeholder="Describe your expertise and service quality..."
                className="min-h-[120px]"
              />
              {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills (Comma separated)</label>
                <Input {...register("skills")} placeholder="e.g. AC Repair, Pipe Fitting" />
                {errors.skills && <p className="text-xs text-red-500">{errors.skills.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Years of Experience</label>
                <Input {...register("experience")} type="number" placeholder="e.g. 5" />
                {errors.experience && <p className="text-xs text-red-500">{errors.experience.message}</p>}
              </div>
            </div>

            <div className="space-y-2 w-full md:w-1/2">
              <label className="text-sm font-medium">Starting Price ($)</label>
              <Input {...register("price")} type="number" placeholder="50" />
              {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-blue-600">
              {isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}