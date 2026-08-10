import { Sparkles, Send, BellRing, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24">
      {/* 1. Background Elements - Soft & Airy */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-75 w-75 rounded-full bg-secondary/5 blur-[80px]" />
        {/* Subtle Grid Pattern */}
        <div className="bg-size[40px_40px] absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group bg-card/40 relative overflow-hidden p-8 backdrop-blur-md transition-all hover:border-primary/20 md:p-16 lg:p-20">
          <div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left Content - Call to Action */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex animate-pulse items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-[10px] font-extrabold tracking-[0.2em] text-secondary uppercase">
                <Sparkles className="h-3 w-3" />
                Limited Time Promotion
              </div>

              <h2 className="text-4xl leading-[1.1] font-extrabold tracking-tighter text-foreground md:text-5xl">
                Ready to transform your{" "}
                <span className="text-primary italic">home experience?</span>
              </h2>

              <p className="max-w-lg text-lg leading-relaxed font-medium text-muted-foreground">
                Join 10,000+ happy homeowners who trust FixItNow for
                professional, reliable, and background-checked home services.
              </p>

              <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
                <Link href="/services">
                  <Button className="group h-16 rounded-2xl bg-primary px-10 text-base font-black tracking-widest text-white uppercase shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-95">
                    Book a Service{" "}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Newsletter Form (Requirement 2) */}
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-primary/5 blur-2xl transition-colors" />

              <div className="bg-card relative rounded-[2.5rem] border border-border p-8 shadow-xl md:p-10">
                <div className="mb-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                    <BellRing className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="mb-2 text-2xl font-black tracking-tighter text-foreground uppercase italic">
                    Stay Updated
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    Get exclusive maintenance tips and discount codes directly
                    in your inbox.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="h-14 w-full rounded-xl border border-border bg-muted/50 px-6 font-bold text-foreground transition-all outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <Button className="h-14 w-full rounded-xl bg-secondary font-black tracking-widest text-white uppercase shadow-lg shadow-secondary/20 transition-all hover:bg-secondary/90 active:scale-95">
                    <Send className="mr-2 h-5 w-5" /> Subscribe Now
                  </Button>
                </form>

                <p className="mt-4 text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  No Spam • Unsubscribe Anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
