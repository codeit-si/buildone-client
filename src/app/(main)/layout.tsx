import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import TabSideMenu from "@/components/tab-side-menu/tab-side-menu";
import getQueryClient from "@/lib/get-query-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-screen">
        <nav>
          <Suspense fallback={<h1>Loading...</h1>}>
            <TabSideMenu />
          </Suspense>
        </nav>
        <main className="w-full bg-slate-100 pt-48 md:pl-60 md:pt-0 lg:pl-280">
          <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
        </main>
      </div>
    </HydrationBoundary>
  );
}
