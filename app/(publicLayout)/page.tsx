"use client"

import HeroSection from "@/components/shared/hero-section"
import ServiceCard from "@/components/shared/service-card"
import {
  CheckCircle2,
  Clock,
  Shield,
  Loader2,
  Users,
  Wrench,
  Star,
  HeartHandshake,
  CalendarCheck,
  Search,
} from "lucide-react"
import { useGetServicesQuery } from "../redux/api/baseApi"
import { ServiceSkeleton } from "@/components/shared/service-skeleton"
import { Counter } from "@/components/shared/counter"
import Image from "next/image"
import { FAQSection } from "@/components/shared/faq"
import { FinalCTA } from "@/components/shared/cta"
import Footer from "@/components/shared/footar"
import BlogSection from "./blog/page"


interface IProvider {
  name: string
}

interface IService {
  id: string
  name: string
  image?: string
  provider?: IProvider
  rating?: number
  reviewCount?: number
  price: number
}

const features = [
  {
    icon: CheckCircle2,
    title: "Verified Professionals",
    description: "All technicians are thoroughly vetted and insured",
  },
  {
    icon: Clock,
    title: "Fast Scheduling",
    description: "Book services same-day or schedule for later",
  },
  {
    icon: Shield,
    title: "Guaranteed Satisfaction",
    description: "100% satisfaction guarantee on all services",
  },
]

export default function Page() {
  const { data, isLoading, isError } = useGetServicesQuery({})
  const services = data?.data || []

  return (
    <main className="bg-background">
      <HeroSection />

      {/* Services Grid Section */}
      <section id="services" className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Our Services
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />

            <p className="mx-auto mt-2 max-w-2xl text-lg text-balance text-muted-foreground">
              Browse through our wide range of professional home services
              provided by experienced and certified technicians.
            </p>
          </div>

          {/* Service Cards Grid */}

          {isLoading ? (
            <ServiceSkeleton />
          ) : isError ? (
            <div className="py-20 text-center text-red-500">
              Something went wrong while fetching services.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {services.map((service: IService) => (
                <ServiceCard
                  id={service.id}
                  key={service.id}
                  image={
                    service.image ||
                    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"
                  }
                  serviceName={service.name}
                  technicianName={service.provider?.name || "Verified Pro"}
                  rating={service.rating || 5.0}
                  reviews={service.reviewCount || 0}
                  startingPrice={service.price}
                />
              ))}
            </div>
          )}

          {services.length === 0 && !isLoading && (
            <p className="text-center text-muted-foreground">
              No services available right now.
            </p>
          )}
        </div>
      </section>

      {/* 5. Features Section - Professional & Light Feel */}
      <section className="relative overflow-hidden bg-background pt-14 pb-24">
        {/* Decorative Background Glows*/}
        <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-primary uppercase">
              Our Core Values
            </div>
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Why Choose <span className="text-primary italic">FixItNow?</span>
            </h2>
            <p className="text-lg leading-relaxed font-medium text-muted-foreground">
              We provide a seamless experience that guarantees quality and
              safety for every home maintenance task.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group bg-card/40 hover:bg-card relative flex flex-col items-center rounded-[2.5rem] border border-border/50 p-10 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)]"
                >
                  {/* Floating Icon Box */}
                  <div className="relative mb-10">
                    <div className="absolute inset-0 scale-0 rounded-full bg-primary/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-400 shadow-xl shadow-primary/20 transition-all duration-500 group-hover:rotate-[10deg] group-hover:rounded-[2rem]">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-black tracking-tight text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mb-8 leading-relaxed font-medium text-muted-foreground/80">
                    {feature.description}
                  </p>

                  {/* Sky Blue Accent Line */}
                  <div className="mt-auto h-1.5 w-12 rounded-full bg-secondary/20 transition-all duration-500 group-hover:w-32 group-hover:bg-secondary" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Subtle Grid Pattern to break the solid look */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] [background-size:32px_32px] opacity-30" />
      </section>

      {/* 6. Statistics Section - Responsive & Dark Mode Friendly */}
      <section className="relative overflow-hidden bg-background pb-24 transition-colors duration-300">
        {/* Soft Background Glow - Adapts to Dark/Light */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 opacity-50 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Outer Container: bg-card allows it to change color in dark mode */}
          <div className="bg-card relative overflow-hidden rounded-[3rem] border border-border p-1 shadow-2xl shadow-primary/5">
            {/* Inner Content Layer: Using backdrop-blur for a premium glass feel */}
            <div className="bg-card/50 relative flex flex-col items-center justify-between gap-12 rounded-[2.8rem] px-8 py-16 backdrop-blur-sm md:flex-row md:gap-8 md:px-12 md:py-20">
              {[
                {
                  label: "Bookings Completed",
                  value: "12,000+",
                  icon: CheckCircle2,
                },
                { label: "Verified Technicians", value: "450+", icon: Users },
                { label: "Service Categories", value: "35+", icon: Wrench },
                { label: "Client Satisfaction", value: "4.8", icon: Star },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative flex w-full flex-col items-center space-y-5 text-center transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Icon Container: Primary color with soft background */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-all duration-500 group-hover:rotate-12 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30">
                    <stat.icon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>

                  <div className="space-y-1">
                    {/* text-foreground ensures visibility in both modes */}
                    <h3 className="text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                      <Counter value={stat.value} />
                    </h3>
                    <p className="text-[10px] font-black tracking-[0.25em] text-muted-foreground uppercase md:text-xs">
                      {stat.label}
                    </p>
                  </div>

                  {/* Vertical Divider for Desktop */}
                  {i < 3 && (
                    <div className="absolute top-1/2 -right-4 hidden h-16 w-[1px] -translate-y-1/2 bg-border lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. How It Works Section - Step by Step Process */}
      <section className="bg-background pt-8 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <h2 className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-primary uppercase">
              Process
            </h2>
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              3 Simple Steps to Get it Fixed
            </h2>
            <p className="font-medium text-muted-foreground italic">
              Fixing your home issues is now just a few clicks away.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-16 md:grid-cols-3">
            {/* Connecting Dashed Line (Desktop Only) */}
            <div className="absolute top-12 right-[15%] left-[15%] -z-0 hidden h-0.5 border-t-2 border-dashed border-primary/20 lg:block" />

            {[
              {
                step: "01",
                title: "Find Your Expert",
                desc: "Search through our extensive list of verified professionals and check their ratings.",
                icon: Search,
              },
              {
                step: "02",
                title: "Schedule & Book",
                desc: "Pick a date and time that works best for you and confirm your booking instantly.",
                icon: CalendarCheck,
              },
              {
                step: "03",
                title: "Relax & Enjoy",
                desc: "Our pro arrives at your door, fixes the problem, and you pay only after completion.",
                icon: HeartHandshake,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative z-10 flex flex-col items-center text-center"
              >
                {/* Step Circle */}
                <div className="relative mb-8">
                  <div className="bg-card flex h-24 w-24 items-center justify-center rounded-[2.5rem] border border-border shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:border-primary group-hover:bg-primary">
                    <item.icon className="h-10 w-10 text-primary transition-colors group-hover:text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-secondary text-sm font-black text-white shadow-lg">
                    {item.step}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-black tracking-tighter text-foreground uppercase italic">
                  {item.title}
                </h3>
                <p className="max-w-[280px] leading-relaxed font-medium text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section - Social Proof */}
      <section className="rounded-md border border-border/50 bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="mb-4 text-xs font-extrabold tracking-[0.3em] text-secondary uppercase">
                Reviews
              </h2>
              <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Real Stories from Real Homeowners
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background p-3 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <span className="text-sm font-bold">4.9/5 Average Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                text: "The plumbing service was exceptional! The technician arrived on time and fixed the leak in minutes. Highly recommended!",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
              },
              {
                name: "Michael Chen",
                role: "Apartment Manager",
                text: "FixItNow has made managing repairs so much easier. I can find verified electricians in seconds. A lifesaver!",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
              },
              {
                name: "Emily Davis",
                role: "New Homeowner",
                text: "Clean, professional, and transparent pricing. I'll never go back to traditional methods again. Best platform ever!",
                img: "https://images.unsplash.com/photo-1624797432677-6f803a98acb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-card group rounded-[2.5rem] border border-border p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border-2 border-primary/20">
                    <Image
                      src={review.img}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-black text-foreground">{review.name}</p>
                    <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      {review.role}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-2 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="leading-relaxed font-medium text-muted-foreground italic">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <FAQSection/>

      <BlogSection/>

      <FinalCTA/>

<Footer/>
    </main>
  )
}
