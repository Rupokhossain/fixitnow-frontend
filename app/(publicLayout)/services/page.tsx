/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import { useGetServicesQuery } from "@/app/redux/api/baseApi"
import ServiceCard from "@/components/shared/service-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  X,
  LayoutGrid,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { ServiceSkeleton } from "@/components/shared/service-skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface IService {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: { name: string }
  technician?: { name: string }
  rating?: number
  reviewCount?: number
}

export default function AllServicesPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("searchTerm") || ""

  // --- States (Requirement 5) ---
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("default")

  // --- API Call ---
  const { data, isLoading } = useGetServicesQuery({})
  const allServices = data?.data || []

  const categories = ["Plumbing", "Electrical", "Cleaning", "Painting", "HVAC"]

  // --- Filtering & Sorting Logic (Requirement 5.2 & 5.3) ---
  const filteredServices = useMemo(() => {
    const result = allServices.filter((service: IService) => {
      // ১. সার্চ ফিল্টার
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      // ২. ক্যাটাগরি ফিল্টার
      const matchesCategory =
        selectedCategory.length === 0 ||
        selectedCategory.includes(service.category?.name || "")
      // ৩. প্রাইস ফিল্টার
      let matchesPrice = true
      if (priceRange === "under-50") matchesPrice = service.price < 50
      else if (priceRange === "50-100")
        matchesPrice = service.price >= 50 && service.price <= 100
      else if (priceRange === "over-100") matchesPrice = service.price > 100

      return matchesSearch && matchesCategory && matchesPrice
    })

    // ৪. সর্টিং
    const sortedResult = [...result]
    if (sortBy === "price-low") sortedResult.sort((a, b) => a.price - b.price)
    if (sortBy === "price-high") sortedResult.sort((a, b) => b.price - a.price)

    return sortedResult
  }, [allServices, searchTerm, selectedCategory, priceRange, sortBy])

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  // --- Sidebar Content Helper ---
  const FilterSidebar = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-foreground uppercase">
          <SlidersHorizontal size={16} className="text-primary" /> Filters
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedCategory([])
            setPriceRange("all")
            setSearchTerm("")
          }}
          className="text-[10px] font-bold uppercase hover:text-primary"
        >
          Reset All
        </Button>
      </div>

      {/* Category Filter Field 1 */}
      <div className="space-y-4">
        <Label className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
          Service Categories
        </Label>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat} className="group flex items-center space-x-3">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategory.includes(cat)}
                onCheckedChange={() => handleCategoryChange(cat)}
                className="border-primary/30 data-[state=checked]:bg-primary"
              />
              <label
                htmlFor={`cat-${cat}`}
                className="cursor-pointer text-sm font-bold text-muted-foreground transition-colors group-hover:text-primary"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter Field 2 */}
      <div className="space-y-4">
        <Label className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
          Price Range
        </Label>
        <div className="space-y-3">
          {[
            { label: "All Prices", value: "all" },
            { label: "Under $50", value: "under-50" },
            { label: "$50 - $100", value: "50-100" },
            { label: "Over $100", value: "over-100" },
          ].map((range) => (
            <div key={range.value} className="flex items-center space-x-3">
              <input
                type="radio"
                name="price-range"
                id={range.value}
                checked={priceRange === range.value}
                onChange={() => setPriceRange(range.value)}
                className="h-4 w-4 cursor-pointer accent-primary"
              />
              <label
                htmlFor={range.value}
                className="cursor-pointer text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Page Header (Requirement 2 & 5) */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tighter text-foreground uppercase italic md:text-5xl">
            Find Your <span className="NOT-italic text-primary">Solution</span>
          </h1>
          {/* Search Bar (Requirement 5.1) */}
          <div className="group relative mx-auto max-w-2xl">
            <Search
              className="absolute top-1/2 left-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              size={20}
            />
            <Input
              placeholder="Search services (plumbing, ac repair, cleaning...)"
              className="bg-card h-16 rounded-2xl border-border pl-14 text-lg shadow-xl shadow-primary/5 focus-visible:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* 2. Desktop Sidebar Filter (Requirement 5.2) */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <Card className="bg-card/50 sticky top-24 rounded-[2.5rem] border-border shadow-sm backdrop-blur-md">
              <CardContent className="p-8">{FilterSidebar()}</CardContent>
            </Card>
          </aside>

          {/* 3. Main Listing Area (Requirement 3 & 5) */}
          <main className="flex-1 space-y-8">
            {/* Toolbar: Sorting & Count */}
            <div className="bg-card flex items-center justify-between rounded-3xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-3">
                {/* Mobile Trigger (Requirement 9) */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 rounded-xl border-primary/20 text-[10px] font-black tracking-widest text-primary uppercase"
                      >
                        <Filter size={14} /> Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[310px] rounded-r-[2.5rem] border-none"
                    >
                      <div className="px-2 py-12">{FilterSidebar()} </div>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                  <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                    <span className="text-foreground">
                      {filteredServices.length}
                    </span>{" "}
                    Services Found
                  </p>
                </div>
              </div>

              {/* Sorting (Requirement 5.3) */}
              <div className="relative z-20 md:flex items-center gap-2 hidden">
                {" "}
                <ArrowUpDown size={14} className="shrink-0 text-primary" />
                <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
                  <SelectTrigger className="w-40 border-none bg-transparent px-0 text-[10px] font-black tracking-wider uppercase focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>

                  <SelectContent className="bg-card z-[100] min-w-[180px] rounded-2xl border-border shadow-2xl">
                    <SelectItem
                      value="default"
                      className="cursor-pointer py-3 text-sm font-bold"
                    >
                      Default (Newest)
                    </SelectItem>
                    <SelectItem
                      value="price-low"
                      className="cursor-pointer py-3 text-sm font-bold"
                    >
                      Price: Low to High
                    </SelectItem>
                    <SelectItem
                      value="price-high"
                      className="cursor-pointer py-3 text-sm font-bold"
                    >
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Service Grid (Requirement 3 - 3 columns on desktop) */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <ServiceSkeleton key={i} />
                ))}
              </div>
            ) : filteredServices.length > 0 ? (
              <div className="grid animate-in grid-cols-1 gap-8 duration-700 slide-in-from-bottom-5 fade-in md:grid-cols-2 xl:grid-cols-3">
                {filteredServices.map((service: IService) => (
                  <ServiceCard
                    id={service.id}
                    key={service.id}
                    image={
                      service.image ||
                      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"
                    }
                    serviceName={service.name}
                    technicianName={service.technician?.name || "Professional"}
                    rating={4.8}
                    reviews={25}
                    startingPrice={service.price}
                  />
                ))}
              </div>
            ) : (
              /* Empty State (UX Rule 9) */
              <div className="bg-card/30 flex flex-col items-center justify-center rounded-[4rem] border border-dashed border-border py-32 text-center backdrop-blur-sm">
                <div className="mb-6 rounded-[2rem] bg-muted/50 p-8 text-muted-foreground shadow-inner">
                  <X size={54} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-foreground uppercase italic">
                  No Matches Found
                </h3>
                <p className="mx-auto mt-2 max-w-xs font-medium text-muted-foreground">
                  We couldnt find any services matching your current filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 rounded-2xl border-primary px-8 font-black tracking-widest text-primary uppercase transition-all hover:bg-primary hover:text-white"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory([])
                    setPriceRange("all")
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Pagination Logic Placeholder (Requirement 5.4) */}
            {filteredServices.length > 0 && (
              <div className="flex justify-center pt-12">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="h-12 w-12 rounded-2xl border-border font-bold"
                  >
                    1
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-12 w-12 rounded-2xl font-bold text-muted-foreground"
                  >
                    2
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-12 w-12 rounded-2xl font-bold text-muted-foreground"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
