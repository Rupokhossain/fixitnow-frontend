'use client'

import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link' 

interface ServiceCardProps {
  id: string 
  image: string
  serviceName: string
  technicianName: string
  rating: number
  reviews: number
  startingPrice: number
}

export default function ServiceCard({
  id,
  image,
  serviceName,
  technicianName,
  rating,
  reviews,
  startingPrice,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-border group">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={serviceName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
          {serviceName}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 font-medium">{technicianName}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-900 ml-1">
            {rating}
          </span>
          <span className="text-xs text-gray-400 font-medium">({reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting from</p>
          <p className="text-2xl font-black text-primary">
            ${startingPrice}
          </p>
        </div>

        <Link href={`/services/${id}`} className="w-full mt-auto">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-lg shadow-md transition-all active:scale-95">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}