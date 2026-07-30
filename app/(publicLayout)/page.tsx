/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import HeroSection from '@/components/shared/hero-section'
import ServiceCard from '@/components/shared/service-card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Clock, Shield, Loader2 } from 'lucide-react'
import { useGetServicesQuery } from '../redux/api/baseApi'


// const services = [
//   {
//     id: 1,
//     image: '/images/plumbing.png',
//     serviceName: 'Plumbing Services',
//     technicianName: 'John Smith',
//     rating: 4.8,
//     reviews: 156,
//     startingPrice: 79,
//   },
//   {
//     id: 2,
//     image: '/images/electrical.png',
//     serviceName: 'Electrical Work',
//     technicianName: 'Mike Johnson',
//     rating: 4.9,
//     reviews: 203,
//     startingPrice: 89,
//   },
//   {
//     id: 3,
//     image: '/images/hvac.png',
//     serviceName: 'HVAC Maintenance',
//     technicianName: 'David Wilson',
//     rating: 4.7,
//     reviews: 128,
//     startingPrice: 99,
//   },
//   {
//     id: 4,
//     image: '/images/cleaning.png',
//     serviceName: 'House Cleaning',
//     technicianName: 'Sarah Miller',
//     rating: 4.9,
//     reviews: 342,
//     startingPrice: 59,
//   },
//   {
//     id: 5,
//     image: '/images/painting.png',
//     serviceName: 'Interior Painting',
//     technicianName: 'Robert Brown',
//     rating: 4.8,
//     reviews: 98,
//     startingPrice: 129,
//   },
//   {
//     id: 6,
//     image: '/images/carpentry.png',
//     serviceName: 'Carpentry & Repairs',
//     technicianName: 'James Davis',
//     rating: 4.6,
//     reviews: 87,
//     startingPrice: 119,
//   },
// ]

const features = [
  {
    icon: CheckCircle2,
    title: 'Verified Professionals',
    description: 'All technicians are thoroughly vetted and insured',
  },
  {
    icon: Clock,
    title: 'Fast Scheduling',
    description: 'Book services same-day or schedule for later',
  },
  {
    icon: Shield,
    title: 'Guaranteed Satisfaction',
    description: '100% satisfaction guarantee on all services',
  },
]

export default function Page() {

  const { data, isLoading, isError } = useGetServicesQuery({})
  const services = data?.data || [] 
  
  return (
    <main className="bg-background">
      <HeroSection />

      {/* Services Grid Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Browse through our wide range of professional home services
              provided by experienced and certified technicians.
            </p>
          </div>

          {/* Service Cards Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.image}
                serviceName={service.serviceName}
                technicianName={service.technicianName}
                rating={service.rating}
                reviews={service.reviews}
                startingPrice={service.startingPrice}
              />
            ))}
          </div> */}
                    {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Fetching latest services...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500">
              Something went wrong while fetching services.
            </div>
          ) : (
            /* ৬. আসল ডাটা দিয়ে গ্রিড রেন্ডার করা */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service: any) => (
                <ServiceCard
                  key={service._id || service.id}
                  image={service.image || '/images/plumbing.png'} // ব্যাকএন্ডে ইমেজ না থাকলে ফলব্যাক
                  serviceName={service.name} // তোমার ডাটাবেসের ফিল্ড অনুযায়ী নাম দাও
                  technicianName={service.provider?.name || "Verified Pro"}
                  rating={service.rating || 5.0}
                  reviews={service.reviewCount || 0}
                  startingPrice={service.price}
                />
              ))}
            </div>
          )}
          
          {services.length === 0 && !isLoading && (
            <p className="text-center text-muted-foreground">No services available right now.</p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose FixItNow?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
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
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto text-balance">
            Join thousands of satisfied homeowners who trust FixItNow for
            their home service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold"
            >
              Browse Services
            </Button>
            <Button
              variant="outline"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-secondary rounded-lg p-2">
                  <svg
                    className="w-5 h-5 text-foreground"
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
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Plumbing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Electrical
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    HVAC
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2026 FixItNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
