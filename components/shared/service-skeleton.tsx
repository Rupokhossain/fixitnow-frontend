import { Skeleton } from "@/components/ui/skeleton"

export function ServiceSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-4 border rounded-2xl p-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-between items-center mt-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}