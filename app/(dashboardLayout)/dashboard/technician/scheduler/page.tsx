/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Save, Clock, Loader2, Info, CalendarDays, Sparkles, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUpdateAvailabilityMutation, useGetTechProfileQuery } from "@/app/redux/api/technicianApi"
import { toast } from "sonner"

const initialTimeSlots = [
  { time: '09:00 AM', available: false },
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: false },
  { time: '02:00 PM', available: false },
  { time: '03:00 PM', available: false },
  { time: '04:00 PM', available: false },
  { time: '05:00 PM', available: false },
]

export default function TechnicianScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [slots, setSlots] = useState(initialTimeSlots)
  
  const [updateAvailability, { isLoading: isSaving }] = useUpdateAvailabilityMutation()
  const { data: profileRes, isLoading: isFetching } = useGetTechProfileQuery()

  // ১. ডাটাবেজ থেকে আগের ডাটা এনে স্লটগুলো ফিল-আপ করা
  useEffect(() => {
    if (profileRes?.data?.availability) {
      const savedTimes = profileRes.data.availability.split(", ");
      const syncedSlots = initialTimeSlots.map(slot => ({
        ...slot,
        available: savedTimes.includes(slot.time)
      }));
      setSlots(syncedSlots);
    }
  }, [profileRes]);

  const toggleSlot = (index: number) => {
    const newSlots = [...slots]
    newSlots[index].available = !newSlots[index].available
    setSlots(newSlots)
  }

  const handleSaveSchedule = async () => {
    const availableSlots = slots
      .filter(s => s.available)
      .map(s => s.time)
      .join(", ")

    if (!availableSlots) {
       toast.error("Please select at least one available slot.");
       return;
    }

    try {
      await updateAvailability({ availability: availableSlots }).unwrap()
      toast.success("Work schedule updated successfully!")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save schedule")
    }
  }

  if (isFetching) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>

  return (
    <div className="space-y-10 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase italic">
            Work <span className="text-primary NOT-italic">Scheduler</span>
          </h1>
          <p className="mt-1 text-muted-foreground font-medium">Manage your daily availability and working hours.</p>
        </div>
        <Button 
          onClick={handleSaveSchedule} 
          disabled={isSaving}
          className="h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95"
        >
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Update Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Calendar (4 Columns) */}
        <Card className="lg:col-span-4 border-border bg-card/50 backdrop-blur-md rounded-[2.5rem] shadow-xl shadow-primary/5 overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 p-8">
            <div className="flex items-center gap-3">
               <CalendarDays className="text-primary w-5 h-5" />
               <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Select Date</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center p-8">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-2xl border-none shadow-none bg-transparent"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </CardContent>
        </Card>

        {/* Right: Time Slots (8 Columns) */}
        <Card className="lg:col-span-8 border-border bg-card shadow-2xl shadow-primary/5 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between border-b border-border/50 bg-muted/30 p-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
                 <CardTitle className="text-xl font-black italic uppercase tracking-tight text-foreground">
                   Daily Time Slots
                 </CardTitle>
              </div>
              <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </CardDescription>
            </div>
            <div className="hidden md:block">
               <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1 rounded-lg font-bold">Auto-sync Active</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {slots.map((slot, index) => (
                <button
                  key={slot.time}
                  onClick={() => toggleSlot(index)}
                  className={cn(
                    "group relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all duration-300 active:scale-95",
                    slot.available 
                      ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5" 
                      : "border-border bg-muted/30 text-muted-foreground grayscale-[0.5]"
                  )}
                >
                  <Clock size={24} className={cn("mb-3 transition-colors", slot.available ? "text-primary" : "text-muted-foreground")} />
                  <span className="font-black text-sm tracking-tighter">{slot.time}</span>
                  
                  <div className={cn(
                    "mt-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1",
                    slot.available ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  )}>
                    {slot.available ? <CheckCircle2 size={10} /> : null}
                    {slot.available ? "Ready" : "Offline"}
                  </div>

                  {slot.available && (
                    <div className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Instruction Box */}
            <div className="mt-12 p-8 bg-indigo-600 rounded-[2rem] text-white relative overflow-hidden shadow-xl shadow-primary/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="flex gap-5 items-start relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white shrink-0"><Info size={24} /></div>
                  <div>
                     <h4 className="text-lg font-black uppercase tracking-tighter italic">Scheduling Guide</h4>
                     <p className="text-sm text-indigo-100 leading-relaxed mt-2 font-medium">
                       Select the hours you are comfortable working. Blue slots are <b>Publicly Visible</b> for bookings. 
                       Blocked slots will prevent customers from scheduling services during those times. 
                       <span className="block mt-2 font-bold text-white  tracking-wide text-sm">Note: Changes apply instantly after saving.</span>
                     </p>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}