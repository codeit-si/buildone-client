import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import NoteCollectionClient from "@/components/note/NoteCollectionClient";
import getQueryClient from "@/lib/get-query-client";
import { getNotesByGoalIdOptions } from "@/services/goal/note/query";
import { getGoalOptions } from "@/services/goal/query";
import "@/styles/note.css";

interface NoteCollectionPageParams {
  params: {
    goalId: string;
  };
}

export default async function NoteCollectionPage({
  params,
}: NoteCollectionPageParams) {
  const goalId = Number(params.goalId);
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery(
      getNotesByGoalIdOptions({ goalId, size: 10 }),
    ),
    queryClient.prefetchQuery(getGoalOptions(goalId)),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteCollectionClient goalId={goalId} />
    </HydrationBoundary>
  );
}
