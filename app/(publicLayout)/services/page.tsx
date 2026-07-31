"use client"

import { useState, useMemo } from 'react'
import { useGetServicesQuery } from '@/app/redux/api/baseApi'
import ServiceCard from '@/components/shared/service-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Search, Filter, Loader2, SlidersHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// --- টাইপ ডিফিনিশন ---
interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: { name: string };
  technician?: { name: string };
}

export default function AllServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])

  // ১. এপিআই থেকে সব ডাটা নিয়ে আসা
  const { data, isLoading } = useGetServicesQuery({})
  const allServices = data?.data || [];

  // ২. ফ্রন্টএন্ড ফিল্টারিং লজিক (Search & Category)
  const filteredServices = useMemo(() => {
    return allServices.filter((service: IService) => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory.length === 0 || 
                              selectedCategory.includes(service.category?.name || "")
      return matchesSearch && matchesCategory
    })
  }, [allServices, searchTerm, selectedCategory])

  const categories = ["Plumbing", "Electrical", "Cleaning", "Painting", "HVAC"]

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার এবং সার্চ বার */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Explore Professional Services</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Search for any service (e.g. AC Repair)..." 
              className="pl-12 h-14 text-lg shadow-sm border-0 rounded-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:row gap-8 lg:flex-row">
          
          {/* বাম পাশ: ফিল্টার সাইডবার */}
          <aside className="w-full lg:w-64 space-y-6">
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6 font-bold text-gray-900 border-b pb-4">
                  <SlidersHorizontal size={18} /> Filters
                </div>

                {/* ক্যাটাগরি ফিল্টার */}
                <div className="space-y-4">
                  <Label className="text-sm font-black uppercase text-gray-400 tracking-widest">Categories</Label>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-3">
                        <Checkbox 
                          id={cat} 
                          checked={selectedCategory.includes(cat)}
                          onCheckedChange={() => handleCategoryChange(cat)}
                        />
                        <label htmlFor={cat} className="text-sm font-medium leading-none cursor-pointer text-gray-600">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* ডান পাশ: সার্ভিস গ্রিড */}
          <main className="flex-1">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service: IService) => (
                  <ServiceCard 
                    key={service.id}
                    image={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"}
                    serviceName={service.name}
                    technicianName={service.technician?.name || "Professional"}
                    rating={4.9}
                    reviews={150}
                    startingPrice={service.price}
  
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-dashed">
                 <p className="text-gray-400 text-lg font-medium">No services found matching your criteria.</p>
                 <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedCategory([])}}>Clear all filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}