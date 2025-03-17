import { MouseEvent, Suspense, useState } from "react";

import * as motion from "motion/react-client";
import { useRouter } from "next/navigation";

import ArrowDown from "@/assets/icons-small/arrow/arrow_down.svg";
import TodoModal from "@/components/todo-modal/todo-modal";
import TodoModalOpenButton from "@/components/todo-modal/todo-modal-open-button";
import { GoalResponse } from "@/types/dashboard";

import GoalContainer from "./goal-container";
import GoalItemProgressBar from "./goal-item-progress-bar";
import GoalTitle from "./goal-title";
import TodoListByDone, { SetNextType } from "./todo-list-by-done";

interface GoalItemProps {
  goal: GoalResponse;
}

export default function GoalItem({ goal }: GoalItemProps) {
  const [todoNext, setTodoNext] = useState<SetNextType>();
  const [doneNext, setDoneNext] = useState<SetNextType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const hasNext = !!todoNext?.hasNextPage || !!doneNext?.hasNextPage;

  const fetchAll = () => {
    if (todoNext?.hasNextPage) {
      todoNext.fetchNextPage();
    }
    if (doneNext?.hasNextPage) {
      doneNext.fetchNextPage();
    }
  };

  const handleClickGoalContainer = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    e.stopPropagation();
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("label") ||
      target.closest("[data-ignore-click]")
    ) {
      return;
    }
    router.push(`/goals/${goal.id}`);
  };

  return (
    <>
      <GoalContainer
        className="relative min-h-384 pb-72 md:min-h-304"
        onClick={handleClickGoalContainer}
      >
        <div className="flex justify-between">
          <GoalTitle>{goal.title}</GoalTitle>
          <TodoModalOpenButton onClick={() => setIsModalOpen(true)} />
        </div>
        <GoalItemProgressBar goalId={goal.id} />
        <div className="grid grid-rows-[repeat(2,_minmax(112px,_auto))] gap-24 md:grid-cols-2 md:grid-rows-[minmax(164px,_auto)]">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                할일 목록 로딩중...
              </div>
            }
          >
            <TodoListByDone
              isDone={false}
              goalId={goal.id}
              setNext={setTodoNext}
            />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                완료 목록 로딩중...
              </div>
            }
          >
            <TodoListByDone isDone goalId={goal.id} setNext={setDoneNext} />
          </Suspense>
        </div>
        {hasNext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut" },
            }}
          >
            <button
              className="absolute bottom-24 left-1/2 flex h-32 w-120 -translate-x-1/2 transform items-center justify-center gap-4 rounded-full bg-white text-sm font-semibold text-gray-900 shadow-sm duration-100 hover:scale-110"
              onClick={fetchAll}
            >
              {!todoNext?.isFetching && !doneNext?.isFetching ? (
                <>
                  더 보기 <ArrowDown />
                </>
              ) : (
                <>로딩 중...</>
              )}
            </button>
          </motion.div>
        )}
      </GoalContainer>
      {isModalOpen && (
        <TodoModal
          goalId={goal.id}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </>
  );
}
