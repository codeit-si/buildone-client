import CompletedTodoList from "@/components/goal-detail/completed-todo-list";
import GoalSummary from "@/components/goal-detail/goal-summary";
import RouteButtonToNotes from "@/components/goal-detail/route-button-to-notes";
import UncompletedTodoList from "@/components/goal-detail/uncompleted-todo-list";

export default function GoalDetailPage({
  params,
}: {
  params: { goalId: string };
}) {
  return (
    <div className="w-343 py-16 max-lg:mx-auto md:w-636 md:py-24 lg:ml-80 lg:w-1200">
      <h1 className="hidden text-lg font-semibold md:block">목표</h1>
      <div className="flex flex-col gap-y-16 md:gap-y-24">
        <GoalSummary goalId={params.goalId} />
        <RouteButtonToNotes goalId={params.goalId} />
        <div className="flex flex-col gap-y-24 lg:flex-row lg:gap-x-24">
          <UncompletedTodoList goalId={params.goalId} />
          <CompletedTodoList goalId={params.goalId} />
        </div>
      </div>
    </div>
  );
}
