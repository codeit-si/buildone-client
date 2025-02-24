import PlusIcon from "@/assets/plus/plus_db_sm.svg";

interface UncompletedTodoListProps {
  goalId: string;
}

export default function UncompletedTodoList({
  goalId,
}: UncompletedTodoListProps) {
  // 투두 리스트 api 요청으로 가져오기
  const data = null; // 데이터가 없는 경우 가정

  return (
    <div className="relative min-h-228 w-full rounded-12 bg-white px-24 py-16">
      <div className="flex justify-between">
        <h3 className="slate-800 text-lg font-bold">To do</h3>
        <button
          type="button"
          className="z-10 flex cursor-pointer items-center gap-x-4 text-sm font-semibold text-dark-blue-500"
          aria-label="할일 추가하기"
        >
          <PlusIcon />
          <p>할일 추가</p>
        </button>
      </div>
      {data ? (
        <div className="mt-16">
          <p>투두 리스트 영역 (id: {goalId})</p>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <span className="text-sm font-normal text-slate-500">
            해야 할 일이 아직 없어요
          </span>
        </div>
      )}
    </div>
  );
}
