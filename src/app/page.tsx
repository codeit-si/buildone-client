"use server";

import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ListTodo from "@/components/list-todo";
import TabSidemenu from "@/components/tab-sidemenu";

import getQueryClient from "../lib/get-query-client";

export default async function Home() {
  const queryClient = getQueryClient();

  return (
    <main>
      <h1>HomePage</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Streaming 컴포넌트트 */}
        <Suspense fallback={<h1>Loading...</h1>}>
          <TabSidemenu />
          <ListTodo />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
