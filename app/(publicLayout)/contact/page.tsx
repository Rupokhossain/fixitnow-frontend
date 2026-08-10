"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Loader2, 
  MessageSquare, 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Form Validation Schema (Requirement 10)
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
    setIsSubmitting(false)
    toast.success("Message sent successfully! We'll get back to you soon.")
    reset()
  }

  return (
    <main className="bg-background min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative py-16 overflow-hidden bg-muted/20 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Contact Support
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-6 leading-tight">
            How Can We <span className="text-primary ">Help You?</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto italic">
            Have a question or need assistance with a booking? Our team is here to help 24/7.
          </p>
        </div>
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-0" />
      </section>

      {/* 2. Contact Content Grid */}
      <section className="py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Contact Information */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight">Connect With Us</h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Choose the most convenient way to reach us. Our experts are ready to assist you with any service-related queries.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Phone, title: "Call Us", detail: "+880 1234 567 890", sub: "Mon-Sat, 9am-6pm", color: "text-primary", bg: "bg-primary/10" },
                { icon: Mail, title: "Email Us", detail: "support@fixitnow.com", sub: "24/7 Online Support", color: "text-secondary", bg: "bg-secondary/10" },
                { icon: MapPin, title: "Our Office", detail: "123 Service Lane, Tech City", sub: "Dhaka, Bangladesh", color: "text-primary", bg: "bg-primary/10" },
                { icon: Clock, title: "Working Hours", detail: "09:00 AM - 08:00 PM", sub: "Everyday Service", color: "text-secondary", bg: "bg-secondary/10" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all group">
                   <div className={`h-14 w-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                   </div>
                   <div>
                      <h4 className="font-extrabold text-foreground text-lg">{item.title}</h4>
                      <p className="text-foreground font-bold">{item.detail}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.sub}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form (Requirement 10) */}
          <div className="lg:col-span-7">
            <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="p-8 md:p-12">
                <div className="mb-10 flex items-center gap-4">
                   <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                      <MessageSquare className="h-6 w-6 text-white" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-extrabold  tracking-tight">Send a Message</h3>
                      <p className="text-sm font-bold text-muted-foreground italic uppercase">We usually respond within 2 hours</p>
                   </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-bold ml-1">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        {...register("name")} 
                        className={`h-12 rounded-xl bg-background border-border/60 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="text-xs font-bold text-red-500 ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-bold ml-1">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        {...register("email")} 
                        className={`h-12 rounded-xl bg-background border-border/60 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-xs font-bold text-red-500 ml-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-bold ml-1">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help?" 
                      {...register("subject")} 
                      className={`h-12 rounded-xl bg-background border-border/60 ${errors.subject ? 'border-red-500' : ''}`}
                    />
                    {errors.subject && <p className="text-xs font-bold text-red-500 ml-1">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-bold ml-1">Your Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your issue or query in detail..." 
                      {...register("message")} 
                      className={`min-h-[150px] rounded-2xl bg-background border-border/60 ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-xs font-bold text-red-500 ml-1">{errors.message.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-7 rounded-2xl bg-primary hover:bg-primary/90 text-white font-extrabold  text-lg uppercase tracking-widest shadow-xl shadow-primary/20 group transition-all"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Bottom Trust Bar */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
          <h2 className="text-3xl font-black mb-8 relative z-10">Prefer social media? Follow us!</h2>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
             {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
               <button key={social} className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-slate-950 font-bold transition-all">
                  {social}
               </button>
             ))}
          </div>
        </div>
      </section>

    </main>
  )
}