"use client"

import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-primary p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">FixItNow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="#services"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Browse Services
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center space-x-3 md:flex">
            <Button
              variant="outline"
              className="text-primary hover:bg-secondary"
            >
              Login
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground transition-colors hover:text-primary"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
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
          <div className="border-t border-border pb-4 md:hidden">
            <Link
              href="#services"
              className="block py-2 font-medium text-foreground hover:text-primary"
            >
              Browse Services 
            </Link>
            <div className="mt-4 flex flex-col space-y-2 border-t border-border pt-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full text-primary hover:bg-secondary"
                >
                  Login
                </Button>
              </Link>
              <Button className="w-full bg-primary text-white hover:bg-primary/90">
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
