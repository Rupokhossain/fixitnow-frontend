import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Heading */}
      <div>
        <Skeleton className="mb-2 h-8 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-32 rounded-2xl" />
        ))}
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}