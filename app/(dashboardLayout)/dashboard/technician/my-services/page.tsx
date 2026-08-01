/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { useUpdateTechProfileMutation } from "@/app/redux/api/technicianApi"

// ১. Zod Schema (এখানে pricing কে সহজ রাখার জন্য string রাখা হয়েছে যাতে ইনপুটে সমস্যা না হয়)
const profileSchema = z.object({
  bio: z.string().min(10, "Bio is too short"),
  skills: z.string().min(3, "Skills are required"),
  experience: z.string().min(1, "Experience is required"),
  pricing: z.string().min(1, "Pricing is required"), // সহজ করার জন্য string
  location: z.string().min(2, "Location is required"),
})


// ২. অটোমেটিক টাইপ জেনারেশন (এটিই বেস্ট প্র্যাকটিস)
type ProfileFormValues = z.infer<typeof profileSchema>

export default function MyServicesPage() {
  // ৩. useForm সেটআপ (সব টাইপ এখন অটোমেটিক মিলে যাবে)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      skills: "",
      experience: "",
      pricing: "",
      location: "",
    },
  })
const [updateProfile] = useUpdateTechProfileMutation()


  // ৪. সাবমিট হ্যান্ডেলার
  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      // ৩. ডাটাবেসে পাঠানোর আগে ডাটা ঠিক করে নাও
      const payload = {
        bio: data.bio,
        skills: data.skills,
        experience: data.experience,
        pricing: Number(data.pricing), // স্ট্রিং থেকে নাম্বারে কনভার্ট
        location: data.location
      };

      // ৪. আসল এপিআই কল
      await updateProfile(payload).unwrap();
      
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manage My Services</h1>
      <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-lg">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="text-lg font-bold">
            Update Professional Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Bio</label>
              <Textarea
                {...register("bio")}
                placeholder="Write your professional bio..."
              />
              {errors.bio && (
                <p className="text-xs font-medium text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Skills
              </label>
              <Input
                {...register("skills")}
                placeholder="Skills (e.g. Plumbing, AC Repair)"
              />
              {errors.skills && (
                <p className="text-xs font-medium text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Experience
                </label>
                <Input {...register("experience")} placeholder="e.g. 5 Years" />
                {errors.experience && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Pricing ($/hr)
                </label>
                <Input
                  {...register("pricing")}
                  type="text"
                  placeholder="Price per hour"
                />
                {errors.pricing && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.pricing.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Location
              </label>
              <Input
                {...register("location")}
                placeholder="Your Location (City)"
              />
              {errors.location && (
                <p className="text-xs font-medium text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-primary font-bold"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Save className="mr-2 h-5 w-5" />
              )}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
