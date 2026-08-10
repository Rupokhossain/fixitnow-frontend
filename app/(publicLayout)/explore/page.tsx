/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Sparkles,
  Trophy,
  MapPin,
  Zap,
  ArrowRight,
  Star,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/shared/service-card"
import { useGetServicesQuery } from "@/app/redux/api/baseApi"
import Image from "next/image"

export default function ExplorePage() {
  const { data } = useGetServicesQuery({})
  const trending = data?.data?.slice(0, 3) || []

  const experts = [
    {
      name: "Alex Rivera",
      role: "Certified Electrician",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbece8?q=80&w=2070",
    },
    {
      name: "Sarah Connor",
      role: "Master Plumber",
      rating: "4.8",
      img: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=2070",
    },
    {
      name: "David Miller",
      role: "HVAC Specialist",
      rating: "5.0",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069",
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
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
        {/* 1. Explore Hero Banner */}
        <div className="relative flex min-h-[400px] items-center overflow-hidden rounded-[3.5rem] bg-indigo-600 shadow-2xl">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"
              alt="Service Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-600/80 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-6 p-8 md:p-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-white uppercase backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-secondary" /> Discovery Hub
            </div>
            <h1 className="text-4xl leading-tight font-black tracking-tighter text-white uppercase italic md:text-6xl">
              Find Your{" "}
              <span className="NOT-italic text-secondary">Top Expert</span>
            </h1>
            <p className="text-lg leading-relaxed font-medium text-indigo-100">
              Skip the search and discover our most-booked professionals and
              exclusive seasonal deals tailored for you.
            </p>
            <Button className="rounded-2xl bg-white px-8 py-6 font-black tracking-widest text-primary uppercase transition-all hover:bg-secondary hover:text-white">
              Claim 20% Offer
            </Button>
          </div>
        </div>

        {/* 2. Trending Services */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <Zap className="h-6 w-6 fill-secondary text-secondary" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">
                Trending{" "}
                <span className="NOT-italic text-primary">Services</span>
              </h2>
            </div>
            <Button
              variant="ghost"
              className="group gap-2 font-bold hover:text-primary"
            >
              Explore More{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {trending.map((service: any) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </section>

        {/* 3. Top Rated Experts (Requirement 7 logic) */}
        <section className="relative space-y-12 overflow-hidden rounded-[4rem] border border-border/50 bg-muted/30 p-8 md:p-16">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />

          <div className="relative z-10 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.3em] text-primary uppercase">
              <Trophy className="h-4 w-4" /> Elite Professionals
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic md:text-5xl">
              Our Top{" "}
              <span className="NOT-italic text-primary">Rated Experts</span>
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((expert, i) => (
              <div
                key={i}
                className="bg-card group space-y-6 rounded-[2.5rem] border border-border p-8 text-center transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative mx-auto h-28 w-28">
                  <div className="absolute inset-0 scale-95 rotate-6 rounded-[2rem] bg-primary opacity-20 transition-transform group-hover:rotate-12" />
                  <div className="relative h-28 w-28 overflow-hidden rounded-[2rem] border-2 border-primary/20 bg-muted shadow-lg transition-colors group-hover:border-primary">
                    <Image
                      src={expert.img}
                      alt={expert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -right-2 -bottom-2 rounded-full border-2 border-background bg-secondary p-1.5 text-white shadow-lg">
                    <ShieldCheck size={16} />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground">
                    {expert.name}
                  </h4>
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {expert.role}
                  </p>
                </div>
                <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full bg-secondary/5 px-4 py-2">
                  <Star size={14} className="fill-secondary text-secondary" />
                  <span className="text-sm font-black text-foreground">
                    {expert.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Visual Category Grid */}
        <section className="border-t border-border py-20">
          <div className="mb-12 text-center">
            <p className="text-xs font-black tracking-[0.4em] text-muted-foreground uppercase">
              Browse by Department
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Plumbing",
                img: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=500",
              },
              {
                name: "Electrical",
                img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500",
              },
              {
                name: "Cleaning",
                img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500",
              },
              {
                name: "HVAC",
                img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=500",
              },
              {
                name: "Painting",
                img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=500",
              },
            ].map((cat) => (
              <div
                key={cat.name}
                className="group relative h-40 w-40 cursor-pointer overflow-hidden rounded-[2rem] border border-border shadow-sm"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-primary/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black tracking-widest text-white uppercase">
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
