/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Save, Clock, Loader2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUpdateAvailabilityMutation, useGetTechProfileQuery } from "@/app/redux/api/technicianApi"
import { toast } from "sonner"

// ডিফল্ট টাইম স্লট
const initialTimeSlots = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: true },
]

export default function TechnicianScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [slots, setSlots] = useState(initialTimeSlots)
  
  // ১. এপিআই হুকস
  const [updateAvailability, { isLoading: isSaving }] = useUpdateAvailabilityMutation()
  const { data: profileRes } = useGetTechProfileQuery()

  // ২. প্রোফাইল থেকে আগের শিডিউল লোড করা (ঐচ্ছিক)
// ২. প্রোফাইল থেকে আগের শিডিউল লোড করা (টাইপ-সেফ ভার্সন)
useEffect(() => {
  // ডাটাবেস থেকে আসা প্রোফাইল ডাটাটি আগে একটি ভেরিয়েবলে নাও
  const rawData = profileRes?.data;
  
  // এখানে টাইপ কাস্টিং করে দাও যাতে টিএস কনফিউজ না হয়
  const techProfile = (rawData?.bio ? rawData : (rawData as any)?.technicianProfile);

  if (techProfile?.availability) {
    const savedAvailability = techProfile.availability as string;
    
    // ঐচ্ছিক: যদি তুমি চাও ডাটাবেসে যা সেভ আছে তা এখানে লোড হবে
    // তবে এটি করতে হলে স্ট্রিং ভেঙে স্লট আপডেট করার লজিক লাগবে।
    // আপাতত এরর দূর করার জন্য এই চেকটিই যথেষ্ট।
    console.log("Current availability in DB:", savedAvailability);
  }
}, [profileRes]);

  // ৩. স্লট টগল করার ফাংশন
  const toggleSlot = (index: number) => {
    const newSlots = [...slots]
    newSlots[index].available = !newSlots[index].available
    setSlots(newSlots)
  }

  // ৪. শিডিউল সেভ করার ফাংশন
  const handleSaveSchedule = async () => {
    // স্লটগুলোকে একটি সুন্দর স্ট্রিংয়ে রূপান্তর (যেমন: "09:00 AM, 10:00 AM")
    const availableSlots = slots
      .filter(s => s.available)
      .map(s => s.time)
      .join(", ")

    const payload = {
      availability: availableSlots // তোমার ব্যাকএন্ড এই ফরম্যাটে ডাটা চায়
    }

    try {
      await updateAvailability(payload).unwrap()
      toast.success("Availability updated successfully!")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save schedule")
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Work Scheduler</h1>
        <p className="text-gray-600 mt-1 font-medium">Set your working hours to let customers know when you are available.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বাম পাশ: ক্যালেন্ডার */}
        <Card className="lg:col-span-1 border-0 shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Select Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-6 bg-white">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow-sm"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </CardContent>
        </Card>

        {/* ডান পাশ: টাইম স্লট পিকার */}
        <Card className="lg:col-span-2 border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 py-5 px-8">
            <div>
              <CardTitle className="text-lg font-black text-gray-800">
                Daily Slots
              </CardTitle>
              <CardDescription className="font-medium">Toggle slots for {selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</CardDescription>
            </div>
            <Button 
              onClick={handleSaveSchedule} 
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg px-6 rounded-xl font-bold"
            >
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {slots.map((slot, index) => (
                <button
                  key={slot.time}
                  onClick={() => toggleSlot(index)}
                  className={cn(
                    "flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 active:scale-95",
                    slot.available 
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" 
                      : "border-gray-100 bg-gray-50 text-gray-400 grayscale"
                  )}
                >
                  <Clock size={20} className={cn("mb-2", slot.available ? "text-blue-600" : "text-gray-300")} />
                  <span className="font-black text-sm">{slot.time}</span>
                  <Badge 
                    variant={slot.available ? "default" : "secondary"} 
                    className={cn("mt-3 text-[9px] uppercase font-black", slot.available ? "bg-blue-600" : "bg-gray-200")}
                  >
                    {slot.available ? "Ready" : "Blocked"}
                  </Badge>
                </button>
              ))}
            </div>

            <div className="mt-10 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4 items-start">
               <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0"><Info size={20} /></div>
               <div>
                  <h4 className="text-sm font-bold text-blue-900">How it works?</h4>
                  <p className="text-xs text-blue-700 leading-relaxed mt-1 font-medium">
                    Blue slots are marked as <b>Available</b>. Gray slots are <b>Blocked</b>. 
                    Customers can only book you during your Ready hours. Make sure to save after making changes!
                  </p>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}