import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Image from 'next/image'


interface ServiceCardProps {
  image: string
  serviceName: string
  technicianName: string
  rating: number
  reviews: number
  startingPrice: number
}

export default function ServiceCard({
  image,
  serviceName,
  technicianName,
  rating,
  reviews,
  startingPrice,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-border">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={serviceName}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        {/* Service Name */}
        <h3 className="text-lg font-bold text-foreground mb-1">
          {serviceName}
        </h3>

        {/* Technician Name */}
        <p className="text-sm text-muted-foreground mb-3">{technicianName}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground ml-1">
            {rating}
          </span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="text-xl font-bold text-primary">
            ${startingPrice}
          </p>
        </div>

        {/* Button */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-auto">
          View Details
        </Button>
      </div>
    </div>
  )
}
 