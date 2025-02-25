interface CompletedTodoListProps {
  goalId: string;
}

export default function CompletedTodoList({ goalId }: CompletedTodoListProps) {
  // 완료된 투두 리스트 api 요청으로 가져오기
  const data = null; // 데이터가 없는 경우 가정

  return (
    <div className="relative min-h-228 w-full rounded-12 bg-slate-200 px-24 py-16">
      <h3 className="slate-800 text-lg font-bold">Done</h3>
      {data ? (
        <div className="mt-16">
          <p>완료된 투두 리스트 영역 (id: {goalId})</p>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-normal text-slate-500">
            다 한 일이 아직 없어요
          </span>
        </div>
      )}
    </div>
  );
}
