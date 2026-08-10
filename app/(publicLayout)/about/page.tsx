"use client"

import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  HeartHandshake,

} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Counter } from "@/components/shared/counter" 

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      
      {/* 1. About Hero Section */}
      <section className="relative py-24  overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(79,70,229,0.05)_0%,transparent_100%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
            Empowering Homes Since 2022
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-8 leading-[1.1]">
            Redefining Home Services <br /> 
            <span className="text-secondary italic">One Home at a Time.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            FixItNow is more than just a marketplace. We are a team of dedicated professionals committed to making home maintenance simple, safe, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Section (Two Column) */}
      <section className="py-16 border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full -z-10" />
            <div className="aspect-square relative rounded-[3rem] overflow-hidden border border-border bg-slate-300 shadow-2xl shadow-primary/10">
               <Image 
                 src="https://plus.unsplash.com/premium_photo-1663011218145-c1d0c3ba3542?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYW5pbmd8ZW58MHx8MHx8fDA%3D" 
                 alt="Our Mission" 
                 fill 
                 className="object-cover"
               />
            </div>
            {/* <div className="absolute -bottom-8 -right-8 bg-card border border-border p-8 rounded-[2.5rem] shadow-xl hidden md:block ">
               <Award className="h-10 w-10 text-secondary mb-4" />
               <p className="text-2xl font-black text-foreground italic tracking-tighter">#1 Rated App</p>
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">In Home Service Category</p>
            </div> */}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
               <h2 className="text-primary font-extrabold text-sm uppercase tracking-[0.2em]">Our Purpose</h2>
               <h3 className="text-4xl font-extrabold tracking-tight">Making Your Life Easier is Our Mission.</h3>
            </div>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              We started FixItNow because we saw how difficult it was to find reliable experts for urgent home repairs. Our goal was to build a bridge between skilled professionals and homeowners based on transparency and trust.
            </p>
            <div className="space-y-4 ">
              {[
                "100% Background-Checked Professionals",
                "Transparent Pricing Without Hidden Costs",
                "Guaranteed Quality and Satisfaction",
                "24/7 Dedicated Support System"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                  <span className="font-bold text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (Grid Section) */}
      <section className="py-24 ">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center mb-15">
           <h2 className="text-secondary font-extrabold text-xs uppercase tracking-[0.3em] mb-4">Core Values</h2>
           <h3 className="text-4xl font-extrabold tracking-tighter">What We Stand For.</h3>
        </div>
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Trust & Safety", desc: "Your safety is our top priority. We verify every pro on our platform." },
            { icon: Zap, title: "Efficiency", desc: "No more waiting for days. Book an expert and get service within hours." },
            { icon: HeartHandshake, title: "Integrity", desc: "We believe in fair pay for experts and fair pricing for homeowners." }
          ].map((val, i) => (
            <div key={i} className="bg-card border border-border p-10 rounded-[3rem] text-center hover:shadow-2xl hover:shadow-primary/5 transition-all group">
               <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                  <val.icon className="h-8 w-8 text-primary group-hover:text-white" />
               </div>
               <h4 className="text-2xl font-black mb-4">{val.title}</h4>
               <p className="text-muted-foreground font-medium leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Statistics (Reusing Counter Idea) */}
      <section className="py-20 bg-slate-950 text-white mb-24 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
         <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Community Members", value: "25,000+" },
              { label: "Verified Experts", value: "850+" },
              { label: "Service Cities", value: "15+" },
              { label: "Awards Won", value: "12+" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                 <p className="text-4xl md:text-5xl font-black tracking-tighter text-secondary">
                   <Counter value={stat.value} />
                 </p>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* 5. Final CTA */}
      <section className="pb-24 px-4 text-center">
         <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
               Be a Part of Our Growing <br /> <span className="text-primary  font-extrabold">Success Story.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
               <Link href="/services">
                 <Button className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg tracking-wide shadow-xl">
                   Browse Services
                 </Button>
               </Link>
               <Link href="/auth/register">
                 <Button variant="outline" className="h-16 px-10 rounded-2xl font-bold text-lg tracking-wide border-2">
                   Join as Expert
                 </Button>
               </Link>
            </div>
         </div>
      </section>

    </main>
  );
}