import { PropsWithChildren } from "react";

export default function DashboardLoading({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
      {children}
    </div>
  );
}
