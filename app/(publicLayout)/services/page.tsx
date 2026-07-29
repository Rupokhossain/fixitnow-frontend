'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Star } from 'lucide-react'

const timeSlots = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
]

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Excellent service! Fixed our HVAC system in record time. Professional and courteous.',
  },
  {
    id: 2,
    name: 'Mike Chen',
    rating: 5,
    text: 'Very knowledgeable. Diagnosed and repaired the electrical issue with great detail. Highly recommend!',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rating: 4,
    text: 'Great communication and thorough work. Would definitely use again.',
  },
]

const skills = [
  'HVAC Installation & Repair',
  'Electrical Wiring',
  'Plumbing',
  'Water Heater Service',
  'Gas Fitting',
  'Preventive Maintenance',
]

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}
        />
      ))}
      {count && <span className="ml-1 text-sm text-muted-foreground">({count})</span>}
    </div>
  )
}

export default function ServicePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBoking, setIsBooking] = useState(false)

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time')
      return
    }
    setIsBooking(true)
    setTimeout(() => {
      alert(
        `Booking confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}!`
      )
      setIsBooking(false)
    }, 500)
  }

  const averageRating = Math.round(
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card py-6">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-foreground">Expert Home Services</h1>
          <p className="mt-1 text-muted-foreground">FixItNow - Professional Technician Services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Technician Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Avatar */}
                  <Avatar className="size-24 ring-2 ring-primary/20">
                    <AvatarImage src="/images/technician-avatar.png" alt="James Miller" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-bold text-foreground">James Miller</h2>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle2 size={14} />
                        Verified
                      </Badge>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                      <StarRating rating={averageRating} count={reviews.length} />
                    </div>

                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                      With over 15 years of experience in residential and commercial services, I&apos;m
                      dedicated to providing reliable, efficient, and high-quality solutions. I take pride
                      in clear communication, transparent pricing, and leaving customers completely satisfied.
                    </p>

                    {/* Experience Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="border-l-2 border-primary pl-3">
                        <p className="text-sm text-muted-foreground">Years Experience</p>
                        <p className="text-xl font-bold text-foreground">15+</p>
                      </div>
                      <div className="border-l-2 border-primary pl-3">
                        <p className="text-sm text-muted-foreground">Jobs Completed</p>
                        <p className="text-xl font-bold text-foreground">1,200+</p>
                      </div>
                      <div className="border-l-2 border-primary pl-3">
                        <p className="text-sm text-muted-foreground">Repeat Clients</p>
                        <p className="text-xl font-bold text-foreground">87%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Core Skills & Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <div className="size-2 rounded-full bg-primary shrink-0" />
                      <span className="text-sm text-foreground font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Star className="fill-amber-400 text-amber-400" size={20} />
                  Customer Reviews
                </CardTitle>
                <CardDescription>
                  {averageRating.toFixed(1)} average rating from {reviews.length} verified customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-medium text-foreground">{review.name}</p>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-0 shadow-xl">
              <CardHeader className="border-b bg-linear-to-r from-primary/10 to-primary/5 p-4">
                <CardTitle>Book a Service</CardTitle>
                <CardDescription>Select your preferred date and time</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Calendar */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Select Date
                    </label>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          return date < today
                        }}
                        className="rounded-md border"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          size="sm"
                          className="h-9 text-xs"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Service Summary */}
                  {selectedDate && selectedTime && (
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                      <p className="text-xs text-muted-foreground">Selected Service</p>
                      <p className="font-medium text-foreground">
                        {selectedDate.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        at {selectedTime}
                      </p>
                    </div>
                  )}

                  {/* Book Now Button */}
                  <Button
                    onClick={handleBookNow}
                    disabled={!selectedDate || !selectedTime || isBoking}
                    className="w-full h-10 text-base font-semibold"
                    size="lg"
                  >
                    {isBoking ? 'Booking...' : 'Book Now'}
                  </Button>

                  {/* Info Text */}
                  <p className="text-xs text-muted-foreground text-center">
                    You will receive a confirmation and can reschedule anytime for free.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
