'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import heroImg from "../../public/images/hero-cleaning-team.jpg"
import {
  Search,
  Star,
  Users,
  CheckCircle2,
  Wrench,
  Zap,
  Sparkles,
  Fan,
  ArrowRight,
} from 'lucide-react'

const categories = [
  { label: 'Plumbing', icon: Wrench },
  { label: 'Electrical', icon: Zap },
  { label: 'Cleaning', icon: Sparkles },
  { label: 'HVAC', icon: Fan },
]

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/services?searchTerm=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleTagClick = (tag: string) => {
    router.push(`/services?searchTerm=${encodeURIComponent(tag)}`)
  }

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-16 md:py-24">
      {/* Background Image with Overlay */}
      <Image
        src={heroImg}
        alt="Professional cleaning team at work"
        fill
        priority
        className="object-cover"
      />
      {/* Gradient overlay: Darker on left for readability, matching Primary Indigo tones */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/60 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center  lg:max-w-4xl">
          
          {/* Badge Style Heading */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-8 animate-pulse">
             <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" /> 
             The #1 Rated Home Service Platform
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-7xl leading-[1.1]">
            Expert Services <br />
            <span className="text-secondary">Right at Your Door.</span>
          </h1>

          <p className="mb-10 max-w-xl text-lg text-white/80  leading-relaxed">
            FixItNow connects you with verified professionals for plumbing, 
            electrical, cleaning, and more. Trusted by thousands.
          </p>

          {/* Trust Indicators */}
          <div className="mb-10 flex flex-wrap items-center justify-center  gap-x-6 gap-y-3 text-base font-bold text-white/90">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-secondary" />
              <span>10k+ Happy Users</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span>4.9 Avg Rating</span>
            </div>
          </div>

          <div className="max-w-2xl">
            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row p-2 rounded-2xl ">
              <div className="relative flex-1">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="h-14 w-full rounded-xl border-none bg-white pr-4 pl-12 text-slate-950 placeholder-slate-500 shadow-inner focus:ring-2 focus:ring-secondary focus:outline-none font-semibold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="h-14 bg-primary px-8 font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 hover:bg-primary/90 rounded-xl"
              >
                Search Now
              </Button>
            </form>

            {/* Category Cards - Requirement 4: Consistent Style */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => handleTagClick(label)}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-5 backdrop-blur-md transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-6 w-6 text-secondary transition-colors group-hover:text-primary" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-white transition-colors group-hover:text-primary">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Technician CTA - Using Secondary Color */}
            <button
              onClick={() => router.push('/auth/register')}
              className="mt-8 group inline-flex items-center gap-2 text-sm font-bold text-white transition-all hover:text-secondary"
            >
              <span className="bg-secondary/20 px-2 py-0.5 rounded text-xs uppercase sm:mr-1">Join as Pro</span>
              Are you a professional? Join as a Technician
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}