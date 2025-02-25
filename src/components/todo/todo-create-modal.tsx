import React, { useState } from "react";

import getQueryClient from "@/lib/get-query-client";
import { createTodo } from "@/services/todos";
import { Todo } from "@/types/todo";

interface TodoCreateModalProps {
  onClose: () => void; // 모달 닫기 함수
}

export default function TodoCreateModal({ onClose }: TodoCreateModalProps) {
  const queryClient = getQueryClient();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const newTodo: Todo = {
        id: 0, // 서버에서 받은 id로 덮어쓸 예정
        noteId: null,
        title,
        goalInformation: null,
        linkUrl: null,
        fileUrl: null,
        isDone: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // 서버에서 생성된 Todo 객체를 받아옴
      const createdTodo = await createTodo(newTodo);
      // 서버에서 받은 id를 새로운 Todo 객체에 반영
      newTodo.id = createdTodo.id;
      // 서버에서 반환된 id로 갱신
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
      // 기존 데이터 새로고침
      onClose();
      // 모달 닫기
    } catch (err) {
      setError(`할 일 추가에 실패했습니다. 다시 시도해 주세요. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content h-540 w-520 rounded-10 bg-white p-5 text-slate-600">
        <h2>할일 추가</h2>
        <form
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
          {error && <p className="text-red-600">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Todo"}
          </button>
        </form>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
