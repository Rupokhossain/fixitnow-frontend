
"use client"

import HeroSection from "@/components/shared/hero-section"
import ServiceCard from "@/components/shared/service-card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Shield, Loader2 } from "lucide-react"
import { useGetServicesQuery } from "../redux/api/baseApi"
import { ServiceSkeleton } from "@/components/shared/service-skeleton"

interface IProvider {
  name: string;
}

interface IService {
  id: string;
  name: string;
  image?: string;
  provider?: IProvider;
  rating?: number;
  reviewCount?: number;
  price: number;
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
            <h2 className="mb-4 text-3xl font-bold text-balance text-foreground md:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-balance text-muted-foreground">
              Browse through our wide range of professional home services
              provided by experienced and certified technicians.
            </p>
          </div>

          {/* Service Cards Grid */}

          {isLoading ? (
              <ServiceSkeleton/>
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

      {/* Features Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Why Choose FixItNow?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-balance text-white/90">
            Join thousands of satisfied homeowners who trust FixItNow for their
            home service needs.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="bg-white px-8 py-3 font-semibold text-primary hover:bg-gray-100">
              Browse Services
            </Button>
            <Button
              variant="outline"
              className="bg-white px-8 py-3 font-semibold text-primary hover:bg-gray-100"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="rounded-lg bg-secondary p-2">
                  <svg
                    className="h-5 w-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.5-4.5m0 0L12 17m-6.5-6.5L6 11"
                    />
                  </svg>
                </div>
                <span className="text-lg font-bold">FixItNow</span>
              </div>
              <p className="text-white/60">
                Your trusted home service marketplace.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Services</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Plumbing
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Electrical
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    HVAC
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Support</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2026 FixItNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
