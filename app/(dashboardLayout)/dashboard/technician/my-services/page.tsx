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
import { Loader2, Save, UserCircle, MapPin, Briefcase, DollarSign, PenTool } from "lucide-react"
import { useUpdateTechProfileMutation, useGetTechProfileQuery } from "@/app/redux/api/technicianApi"
import { useEffect } from "react"

const profileSchema = z.object({
  bio: z.string().min(10, "Bio is too short (min 10 chars)"),
  skills: z.string().min(3, "Skills are required"),
  experience: z.string().min(1, "Experience is required"),
  pricing: z.string().min(1, "Pricing is required").refine(val => !isNaN(Number(val)), "Must be a number"), 
  location: z.string().min(2, "Location is required"),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function MyServicesPage() {
  // ১. আগের প্রোফাইল ডাটা ফেচ করা (Pre-filling এর জন্য)
  const { data: profileRes, isLoading: isFetching } = useGetTechProfileQuery()
  const [updateProfile] = useUpdateTechProfileMutation()

  const {
    register,
    handleSubmit,
    reset,
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

  // ২. ডাটা আসলে ফর্ম ফিল্ডগুলো আপডেট করা
  useEffect(() => {
    if (profileRes?.data) {
      reset({
        bio: profileRes.data.bio || "",
        skills: profileRes.data.skills || "",
        experience: profileRes.data.experience || "",
        pricing: profileRes.data.pricing?.toString() || "",
        location: profileRes.data.location || "",
      })
    }
  }, [profileRes, reset])

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      const payload = {
        bio: data.bio,
        skills: data.skills,
        experience: data.experience,
        pricing: Number(data.pricing),
        location: data.location
      };
      await updateProfile(payload).unwrap();
      toast.success("Professional profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  }

  if (isFetching) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>

  return (
    <div className="max-w-4xl space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase italic">
             Manage <span className="text-primary NOT-italic">Profile</span>
           </h1>
           <p className="text-muted-foreground font-medium mt-1">Update your expert credentials to attract more clients.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form (2 Columns) */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden rounded-[2.5rem] border-border bg-card/50 backdrop-blur-md shadow-2xl shadow-primary/5">
            <CardHeader className="border-b border-border/50 bg-muted/30 px-8 py-6">
              <CardTitle className="text-xl font-black flex items-center gap-2 uppercase tracking-tight italic">
                <PenTool className="text-primary w-5 h-5" /> Professional Info
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Expert Bio</label>
                  <Textarea
                    {...register("bio")}
                    placeholder="Write about your expertise and service quality..."
                    className="min-h-[120px] rounded-2xl border-border bg-background focus:ring-primary"
                  />
                  {errors.bio && <p className="text-xs font-bold text-red-500 ml-1">{errors.bio.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Key Skills</label>
                  <Input
                    {...register("skills")}
                    placeholder="e.g. Master Plumbing, Leak Repair, AC Installation"
                    className="h-12 rounded-xl border-border bg-background"
                  />
                  {errors.skills && <p className="text-xs font-bold text-red-500 ml-1">{errors.skills.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Years of Experience</label>
                    <div className="relative">
                       <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                       <Input {...register("experience")} placeholder="e.g. 5+ Years" className="h-12 pl-10 rounded-xl bg-background" />
                    </div>
                    {errors.experience && <p className="text-xs font-bold text-red-500 ml-1">{errors.experience.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Pricing ($/hr)</label>
                    <div className="relative">
                       <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
                       <Input {...register("pricing")} type="text" placeholder="50" className="h-12 pl-10 rounded-xl bg-background" />
                    </div>
                    {errors.pricing && <p className="text-xs font-bold text-red-500 ml-1">{errors.pricing.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Working Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input {...register("location")} placeholder="City, State" className="h-12 pl-10 rounded-xl bg-background" />
                  </div>
                  {errors.location && <p className="text-xs font-bold text-red-500 ml-1">{errors.location.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 w-full rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                  Save Professional Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Tips (1 Column) */}
        <div className="space-y-6">
           <Card className="rounded-[2.5rem] bg-indigo-600 p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h4 className="text-xl font-black mb-4 tracking-tight">Pro Tip! 💡</h4>
              <p className="text-indigo-100 text-sm font-medium leading-relaxed">
                Expert profiles with detailed bios and accurate pricing receive 3x more bookings. Make sure to list all your specific certifications!
              </p>
           </Card>

           <div className="p-8 rounded-[2.5rem] border border-dashed border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3 mb-4">
                 <UserCircle className="text-primary" />
                 <p className="font-black uppercase text-[10px] tracking-widest">Profile Status</p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                 <div className="bg-secondary h-2 rounded-full w-[85%]" />
              </div>
              <p className="mt-2 text-xs font-bold text-muted-foreground text-right">85% Complete</p>
           </div>
        </div>

      </div>
    </div>
  )
}