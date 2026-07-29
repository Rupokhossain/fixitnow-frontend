'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Save, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'


const initialTimeSlots = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: false },
  { time: '05:00 PM', available: true },
]

export default function TechnicianScheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [slots, setSlots] = useState(initialTimeSlots)

  const toggleSlot = (index: number) => {
    const newSlots = [...slots]
    newSlots[index].available = !newSlots[index].available
    setSlots(newSlots)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Availability Scheduler</h1>
        <p className="text-gray-600 mt-1">Manage your working hours and block out unavailable times.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Calendar selection */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Select Date</CardTitle>
            <CardDescription>Pick a date to set availability</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </CardContent>
        </Card>

        {/* Right: Time Slot Toggles */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Time Slots for {date?.toLocaleDateString()}</CardTitle>
              <CardDescription>Click on a slot to toggle availability</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Save size={18} /> Save Schedule
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slots.map((slot, index) => (
                <button
                  key={slot.time}
                  onClick={() => toggleSlot(index)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                    slot.available 
                      ? "border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-300" 
                      : "border-gray-100 bg-gray-50 text-gray-400"
                  )}
                >
                  <Clock size={20} className="mb-2" />
                  <span className="font-bold text-sm">{slot.time}</span>
                  <Badge variant={slot.available ? "default" : "secondary"} className="mt-2 text-[10px]">
                    {slot.available ? "Available" : "Blocked"}
                  </Badge>
                </button>
              ))}
            </div>

            {/* Availability Summary */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Summary for this day:</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                You are currently <span className="text-blue-600 font-bold">Available</span> for {slots.filter(s => s.available).length} slots 
                and <span className="text-red-500 font-bold">Unavailable</span> for {slots.filter(s => !s.available).length} slots on this date. 
                Customers will only see the available slots during booking.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}