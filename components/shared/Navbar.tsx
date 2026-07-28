'use client'

import { Button } from '@/components/ui/button'
import { Wrench } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">FixItNow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Browse Services
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              className="text-primary hover:bg-secondary"
            >
              Login
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link
              href="#services"
              className="block text-foreground hover:text-primary py-2 font-medium"
            >
              Browse Services
            </Link>
            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full text-primary hover:bg-secondary"
              >
                Login
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
