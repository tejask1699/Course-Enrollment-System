import { Skeleton } from "@/components/ui/skeleton";

export const EnrollmentSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Course Title */}
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/4" />

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Side - Curriculum */}
        <div className="flex-1 space-y-4">
          {/* Tabs */}
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>

          {/* Chapters */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 2 }).map((_, j) => (
                  <Skeleton key={j} className="h-8 w-3/4 ml-6" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Preview & Pricing */}
        <div className="w-80 space-y-4">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-3/4" />
          ))}
        </div>
      </div>
    </div>
  );
};
