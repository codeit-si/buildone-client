"use client";

interface TodoProps {
  todoText: string;
}

function Todo({ todoText }: TodoProps) {
  return (
    <div className="mb-24 flex items-center">
      <div className="flex h-20 w-37 items-center justify-center rounded-4 bg-slate-100 text-xs text-slate-700">
        To do
      </div>
      <div className="ml-8 text-sm">{todoText}</div>
    </div>
  );
}

export default Todo;
