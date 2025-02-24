import { useState } from "react";

import Button from "@/components/@common/button";
import ProgressBar from "@/components/@common/progress-bar";
import PlusIcon from "@/components/@svgr/plus-icon";
import { GoalResponse } from "@/types/dashboard";

import GoalContainer from "./goal-container";
import GoalTitle from "./goal-title";
import TodoListByDone, { SetNextType } from "./todo-list-by-done";

interface GoalItemProps {
  goal: GoalResponse;
}

export default function GoalItem({ goal }: GoalItemProps) {
  const [todoNext, setTodoNext] = useState<SetNextType>();
  const [doneNext, setDoneNext] = useState<SetNextType>();

  const hasNext = !!todoNext?.hasNextPage || !!doneNext?.hasNextPage;

  const fetchAll = () => {
    if (todoNext?.hasNextPage) {
      todoNext.fetchNextPage();
    }
    if (doneNext?.hasNextPage) {
      doneNext.fetchNextPage();
    }
  };

  return (
    <GoalContainer className="min-h-384 md:min-h-304">
      <div className="flex justify-between">
        <GoalTitle>{goal.title}</GoalTitle>
        <button className="flex items-center gap-5 text-sm font-semibold text-dark-blue-500">
          <PlusIcon stroke="dark-blue" />
          할일 추가
        </button>
      </div>
      {/* progress bar */}
      <div className="mb-16 mt-8">
        <ProgressBar total={1} current={0} />
      </div>
      <div className="grid grid-rows-[repeat(2,_minmax(112px,_auto))] gap-24 md:grid-cols-2 md:grid-rows-[minmax(164px,_auto)]">
        <TodoListByDone isDone={false} goal={goal} setNext={setTodoNext} />
        <TodoListByDone isDone goal={goal} setNext={setDoneNext} />
      </div>
      {hasNext && <Button onClick={fetchAll}>더 보기</Button>}
    </GoalContainer>
  );
}
