'use client'

import { Button } from "@/components/ui/button"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-500 mt-2">Internal Server Error or Network Issue.</p>
      <Button onClick={() => reset()} className="mt-6">Try again</Button>
    </div>
  )
}