/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Sparkles,
  Trophy,
  Zap,
  ArrowRight,
  Star,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/shared/service-card"
import { useGetServicesQuery } from "@/app/redux/api/baseApi"
import Image from "next/image"
import Link from "next/link"
import { ServiceSkeleton } from "@/components/shared/service-skeleton"

export default function ExplorePage() {
  // Destructuring data and isLoading properly
  const { data, isLoading } = useGetServicesQuery({})
  
  // Safe data extraction
  const trending = data?.data?.slice(0, 3) || []

  const experts = [
    {
      name: "Alex Rivera",
      role: "Certified Electrician",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Sarah Connor",
      role: "Master Plumber",
      rating: "4.8",
      img: "https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "David Miller",
      role: "HVAC Specialist",
      rating: "5.0",
      img: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Emma Wilson",
      role: "Interior Expert",
      rating: "4.7",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069",
    },
  ]

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        
        {/* 1. Explore Hero Banner - Glassmorphism UI */}
        <div className="relative flex min-h-[450px] items-center overflow-hidden rounded-[3.5rem] bg-indigo-600 shadow-2xl">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"
              alt="Service Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-600/80 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-8 p-8 md:p-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-secondary" /> Discovery Hub
            </div>
            <h1 className="text-4xl leading-[1.1] font-black tracking-tighter text-white uppercase italic md:text-7xl">
              Discover <br />
              <span className="NOT-italic text-secondary">The Elite</span>
            </h1>
            <p className="text-lg leading-relaxed font-medium text-indigo-100 max-w-lg">
              Explore our highest-rated experts and trending services. Your home deserves the best professional care.
            </p>
            <div className="flex flex-wrap gap-4">
               <Button className="rounded-2xl bg-white px-10 py-7 font-black tracking-widest text-primary uppercase transition-all hover:bg-secondary hover:text-white shadow-xl">
                Get 20% Off
              </Button>
            </div>
          </div>
        </div>

        {/* 2. Trending Services - Dynamic Data Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-border pb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10">
                <Zap className="h-7 w-7 fill-secondary text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">
                  Trending <span className="NOT-italic text-primary">Services</span>
                </h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Most booked this week</p>
              </div>
            </div>
            <Link href="/services">
              <Button variant="ghost" className="group gap-2 font-black uppercase text-xs tracking-widest hover:text-primary">
                View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // Requirement 3: Skeleton Loader
              [...Array(3)].map((_, i) => <ServiceSkeleton key={i} />)
            ) : trending.length > 0 ? (
              trending.map((service: any) => (
                <ServiceCard
                  key={service.id || service._id}
                  id={service.id || service._id}
                  image={service.image}
                  serviceName={service.name}
                  technicianName={service.technician?.name || service.provider?.name || "Verified Expert"}
                  rating={service.averageRating || service.rating || 4.8}
                  reviews={service.reviewCount || service.reviews || 0}
                  startingPrice={service.price || 0}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center rounded-[3rem] border border-dashed border-border bg-card/50">
                 <p className="text-muted-foreground font-black uppercase tracking-widest italic">No trending services found</p>
              </div>
            )}
          </div>
        </section>

        {/* 3. Top Rated Experts - Section 7 highlight logic */}
        <section className="relative space-y-12 overflow-hidden rounded-3xl border border-border/50 bg-muted/30 p-8 md:p-20">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/5 blur-[120px]" />

          <div className="relative z-10 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.4em] text-primary uppercase bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
              <Trophy className="h-4 w-4" /> Elite Professionals
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic md:text-6xl text-foreground">
              Our Top <span className="NOT-italic text-primary">Rated Experts</span>
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((expert, i) => (
              <div
                key={i}
                className="bg-card group space-y-6 rounded-4xl border border-border/50 p-10 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary/20"
              >
                <div className="relative mx-auto h-32 w-32">
                  <div className="absolute inset-0 scale-105 rotate-6 rounded-[2.5rem] bg-primary opacity-20 transition-transform group-hover:rotate-12" />
                  <div className="relative h-32 w-32 overflow-hidden rounded-[2.5rem] border-4 border-background shadow-2xl transition-colors group-hover:border-primary/30">
                    <Image
                      src={expert.img}
                      alt={expert.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -right-2 -bottom-2 rounded-full border-4 border-background bg-secondary p-2 text-white shadow-xl">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-foreground">
                    {expert.name}
                  </h4>
                  <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                    {expert.role}
                  </p>
                </div>
                <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-xl bg-secondary/10 px-4 py-2 border border-secondary/20">
                  <Star size={14} className="fill-secondary text-secondary" />
                  <span className="text-sm font-black text-foreground">
                    {expert.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Visual Category Discovery */}
        <section className="pb-12">
          <div className="mb-16 text-center space-y-2">
            <h3 className="text-xs font-black tracking-[0.5em] text-muted-foreground uppercase">Department Discovery</h3>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Plumbing", img: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=500" },
              { name: "Electrical", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500" },
              { name: "Cleaning", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500" },
              { name: "HVAC", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=500" },
              { name: "Painting", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=500" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="group relative h-48 w-48 cursor-pointer overflow-hidden rounded-[2.5rem] border border-border shadow-lg transition-all hover:shadow-primary/10"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-slate-900/40 transition-colors group-hover:bg-primary/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black tracking-[0.2em] text-white uppercase shadow-sm">
                    {cat.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}