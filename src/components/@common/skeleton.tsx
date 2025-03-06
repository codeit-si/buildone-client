import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div role="status" className="animate-pulse">
      <div
        className={cn(
          "h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700",
          className,
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
