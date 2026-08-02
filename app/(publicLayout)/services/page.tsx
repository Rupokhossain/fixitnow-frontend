"use client"

import { useState, useMemo } from "react"
import { useGetServicesQuery } from "@/app/redux/api/baseApi"
import ServiceCard from "@/components/shared/service-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { ServiceSkeleton } from "@/components/shared/service-skeleton"

interface IService {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: { name: string }
  technician?: { name: string }
}

export default function AllServicesPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("searchTerm") || ""

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])

  const { data, isLoading } = useGetServicesQuery({})
  const allServices = data?.data || []

  const filteredServices = useMemo(() => {
    return allServices.filter((service: IService) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory.length === 0 ||
        selectedCategory.includes(service.category?.name || "")
      return matchesSearch && matchesCategory
    })
  }, [allServices, searchTerm, selectedCategory])

  const categories = ["Plumbing", "Electrical", "Cleaning", "Painting", "HVAC"]

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <ServiceSkeleton />
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-black text-gray-900">
            Explore Professional Services
          </h1>
          <div className="relative mx-auto max-w-2xl">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search for any service (e.g. AC Repair)..."
              className="h-14 rounded-2xl border-0 pl-12 text-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="lg:row flex flex-col gap-8 lg:flex-row">
          <aside className="w-full space-y-6 lg:w-64">
            <Card className="rounded-2xl border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-2 border-b pb-4 font-bold text-gray-900">
                  <SlidersHorizontal size={18} /> Filters
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-black tracking-widest text-gray-400 uppercase">
                    Categories
                  </Label>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-3">
                        <Checkbox
                          id={cat}
                          checked={selectedCategory.includes(cat)}
                          onCheckedChange={() => handleCategoryChange(cat)}
                        />
                        <label
                          htmlFor={cat}
                          className="cursor-pointer text-sm leading-none font-medium text-gray-600"
                        >
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                    rating={4.9}
                    reviews={150}
                    startingPrice={service.price}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed bg-white p-20 text-center shadow-sm">
                <p className="text-lg font-medium text-gray-400">
                  No services found matching your criteria.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory([])
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
