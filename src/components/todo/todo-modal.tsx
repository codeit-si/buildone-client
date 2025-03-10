import React, { useState, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { createTodo, updateTodo } from "@/services/todos";
import { refetchTodo } from "@/services/todos/query";
import { TodoResponse } from "@/types/todo";

import LoadingSpinner from "../@common/loading-spinner";

export default function TodoModal({
  onClose,
  selectedTodo,
}: {
  onClose: () => void;
  selectedTodo?: TodoResponse | null;
}) {
  const [title, setTitle] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setIsDone(selectedTodo.isDone);
    }
  }, [selectedTodo]);

  const mutation = useMutation({
    mutationFn: (newTodo: TodoResponse) =>
      newTodo.id ? updateTodo(newTodo) : createTodo(newTodo),
    onSuccess: () => {
      refetchTodo();
      onClose();
    },
  });

  const handleSubmit = async () => {
    if (!title) return;
    const newTodo: TodoResponse = {
      id: selectedTodo ? selectedTodo.id : 0,
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
    mutation.mutate(newTodo);
  };

  return (
    <div className="modal fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      {mutation.isPending ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </div>
  );
}
