'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="bg-linear-to-br from-primary/5 to-primary/10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Your Trusted Home Service Platform
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            Connect with verified professionals for all your home maintenance
            and repair needs. Quick, reliable, and affordable.
          </p>

          {/* Search Bar Area */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search services (e.g., plumbing, cleaning...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
                />
              </div>
              <Button
                type="submit"
                className="h-14 bg-primary hover:bg-primary/90 text-white px-8 font-semibold shadow-md transition-all active:scale-95"
              >
                Search
              </Button>
            </form>

            {/* Popular Tags - Fixed Alignment */}
            <div className="mt-8 flex items-center justify-center flex-wrap gap-3">
              <span className="text-sm font-medium text-muted-foreground">Popular:</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Plumbing', 'Electrical', 'Cleaning', 'HVAC'].map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-1.5 bg-white border border-border rounded-full text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}