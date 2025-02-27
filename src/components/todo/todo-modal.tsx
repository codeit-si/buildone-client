import React, { useState, useEffect } from "react";

import { InfiniteData } from "@tanstack/react-query";

import getQueryClient from "@/lib/get-query-client";
import { createTodo, updateTodo } from "@/services/todos";
import { Todo, TodoListResponse } from "@/types/todo";

export default function TodoModal({
  onClose,
  selectedTodo,
}: {
  onClose: () => void;
  selectedTodo?: Todo | null;
}) {
  const queryClient = getQueryClient();
  const [title, setTitle] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setIsDone(selectedTodo.isDone);
    }
  }, [selectedTodo]);

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    const newTodo: Todo = {
      id: selectedTodo ? selectedTodo.id : 0, // 수정할 때는 기존 ID를 사용
      noteId: selectedTodo?.noteId ?? null,
      title,
      goalInformation: selectedTodo?.goalInformation ?? null,
      linkUrl: selectedTodo?.linkUrl ?? null,
      fileUrl: selectedTodo?.fileUrl ?? null,
      isDone,
      createdAt: selectedTodo
        ? selectedTodo.createdAt
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTodo = selectedTodo
      ? await updateTodo(newTodo)
      : await createTodo(newTodo);

    // 수정 후 쿼리 데이터 업데이트
    queryClient.setQueryData(
      ["todos"],
      (oldData: InfiniteData<TodoListResponse> | undefined) => {
        if (!oldData) return;

        const updatedPages = oldData.pages.map((page) => {
          const updatedTodos = page.todos.some(
            (todo) => todo.id === updatedTodo.id,
          )
            ? page.todos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo,
              )
            : [...page.todos, updatedTodo];

          return {
            ...page,
            todos: updatedTodos,
          };
        });

        return {
          ...oldData,
          pages: updatedPages,
        };
      },
    );

    // 쿼리 무효화 후 데이터 새로 가져오기
    queryClient.invalidateQueries({
      queryKey: ["todos"],
      refetchActive: true,
    });

    onClose();
  };

  return (
    <div className="modal fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content h-2/3 max-h-540 w-2/3 max-w-520 rounded-10 bg-white p-15 text-slate-600">
        <div className="mb-10 flex justify-between">
          <h2>{selectedTodo ? "수정하기" : "추가하기"}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label htmlFor="title">내용:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {selectedTodo && (
            <div>
              <label htmlFor="isDone">완료 여부:</label>
              <input
                id="isDone"
                type="checkbox"
                checked={isDone}
                onChange={() => setIsDone((prev) => !prev)}
              />
            </div>
          )}
          <button type="submit">확인</button>
        </form>
      </div>
    </div>
  );
}
