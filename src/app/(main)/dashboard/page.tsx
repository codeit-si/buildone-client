import MyProgressContainer from "@/components/dashboard/my-progress/my-progress-container";
import RecentlyTodoContainer from "@/components/dashboard/recently-todo/recently-todo-container";
import TodosByGoalContainer from "@/components/dashboard/todos-by-goal/todos-by-goal-container";

export default function DashboardPage() {
  // eslint-disable-next-line no-console
  console.log("dashboard");
  return (
    <div className="grid h-full min-h-screen w-full grid-rows-[repeat(2,_258px)_1fr] gap-x-24 gap-y-8 overflow-y-scroll bg-slate-100 px-16 md:grid-cols-2 md:grid-rows-[auto_250px_1fr]">
      <h1 className="hidden text-base font-semibold md:col-span-2 md:block md:text-lg">
        대시보드
      </h1>
      <RecentlyTodoContainer />
      <MyProgressContainer />
      <TodosByGoalContainer />
    </div>
  );
}
