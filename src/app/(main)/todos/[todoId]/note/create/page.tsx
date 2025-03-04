"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/@common/button";
import Counting from "@/components/@common/counting";
import LoadNoteModal from "@/components/@common/load-modal";
import Goal from "@/components/note/goal";
import LinkAttached from "@/components/note/link-attached";
import LoadNoteToastManager, {
  NoteData,
} from "@/components/note/load-note-toast-manager";
import TagInput, { Tag } from "@/components/note/tag";
import TempSaveManager, {
  TempSaveManagerRef,
} from "@/components/note/temp-save-manager";
import Tiptap from "@/components/note/tiptap";
import Todo from "@/components/note/todo";
import { createNote, getNote, updateNote } from "@/services/note";
import "@/styles/note.css";
import { Note } from "@/types/note";
import { countWithoutSpaces, countWithSpaces } from "@/utils/text-utils";

export default function NotesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const noteIdParam = searchParams.get("noteId");
  // noteId가 있으면 수정모드, 없으면 새로 작성하는 모드
  const noteId = noteIdParam ? Number(noteIdParam) : null;
  // [todoId]는 라우트 동적 세그먼트에서 추출
  const todoId = params?.todoId ? Number(params.todoId) : null;
  const isEditMode = noteId !== null;

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [showLink, setShowLink] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loadedNote, setLoadedNote] = useState<NoteData | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  const tempSaveManagerRef = useRef<TempSaveManagerRef>(null);

  // 수정 모드일 경우에만 기존 노트 데이터를 불러옴
  const { data: noteData, isLoading } = useQuery<
    Note,
    Error,
    Note,
    [string, number]
  >({
    queryKey: ["noteDetail", noteId!],
    queryFn: () => getNote(noteId!),
    enabled: isEditMode,
    retry: false,
  });

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
      if (noteData.linkUrl && noteData.linkUrl.trim() !== "") {
        setLink(noteData.linkUrl);
        setShowLink(true);
      } else {
        setLink("");
        setShowLink(false);
      }
      if (noteData.tags && noteData.tags.length > 0) {
        setTags(
          noteData.tags.map((t: string, index: number) => ({
            id: `${t}-${index}`,
            text: t,
          })),
        );
      } else {
        setTags([]);
      }
    }
  }, [noteData]);

  const memoizedInitialTags = useMemo(() => {
    return noteData && noteData.tags
      ? noteData.tags.map((t: string, index: number) => ({
          id: `${t}-${index}`,
          text: t,
        }))
      : [];
  }, [noteData]);

  // mutationFn: 수정 모드이면 updateNote, 새 노트 작성이면 createNote 호출
  const mutation = useMutation<
    Note,
    Error,
    { title: string; content: string; linkUrl: string; tags: string[] }
  >({
    mutationFn: (data) => {
      if (isEditMode) {
        return updateNote(noteId!, data);
      }
      if (!todoId) {
        return Promise.reject(new Error("Missing todoId for note creation"));
      }
      return createNote({
        todoId,
        title: data.title,
        content: data.content,
        linkUrl: data.linkUrl,
        tags: data.tags,
      });
    },
    onSuccess: (data: Note) => {
      // data는 수정된 노트 혹은 새로 생성된 노트 정보를 포함함
      const goalId = data.goalInformation?.id;
      if (goalId) {
        router.push(`/goals/${goalId}/notes`);
      }
    },
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 30) {
      setTitle(newTitle);
    }
  };

  const handleRemoveLink = () => {
    setShowLink(false);
    setLink("");
  };

  const handleAddLink = (newLink: string) => {
    setLink(newLink);
    setShowLink(true);
  };

  // 로컬 스토리지에서 불러온 데이터를 toast에서 받은 경우, 모달을 연다.
  const handleOpenLoadModal = (data: NoteData) => {
    setLoadedNote(data);
    setModalOpen(true);
  };

  // 모달에서 "불러오기" 버튼 클릭 시 실행
  const handleLoadNote = (data: NoteData) => {
    setTitle(data.title);
    setContent(data.content);
    if (data.link && data.link.trim() !== "") {
      setLink(data.link);
      setShowLink(true);
    } else {
      setLink("");
      setShowLink(false);
    }
    setModalOpen(false);
  };

  // "임시저장" 버튼 클릭 시 TempSaveManager의 저장 함수 호출
  const handleTempSave = () => {
    tempSaveManagerRef.current?.saveTempNote();
  };

  const handleSubmit = () => {
    mutation.mutate({
      title,
      content,
      linkUrl: link,
      tags: tags.map((tag) => tag.text), // 태그 배열에서 텍스트 값만 전송
    });
  };

  if (isEditMode && isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="ml-16 pt-24 md:ml-24 lg:ml-80">
        <div className="container-width">
          {/* 헤더 */}
          <div className="grid h-44 grid-cols-[162px_auto] items-center">
            <h1 className="truncate font-semibold text-slate-900 md:text-lg">
              노트 작성
            </h1>
            <div className="flex justify-end gap-8">
              <Button
                variant="outlined"
                size="sm"
                shape="square"
                className="border-0"
                onClick={handleTempSave}
              >
                임시저장
              </Button>
              <Button
                variant="solid"
                size="sm"
                shape="square"
                disabled={!title.trim() || !content.trim()}
                onClick={handleSubmit}
              >
                작성 완료
              </Button>
            </div>
          </div>

          <div className="mt-16">
            {/* 임시 저장 노트 로드 토스트 */}
            <LoadNoteToastManager onLoadNote={handleOpenLoadModal} />
            {/* 목표 표시 */}
            <Goal goalText={noteData?.goalInformation.title ?? ""} />

            {/* To do 항목 */}
            <Todo todoText={noteData?.todoInformation.title ?? ""} />

            {/* 노트 제목 입력 */}
            <div className="flex items-center gap-8 border-b border-t border-slate-200">
              <input
                type="text"
                className="h-52 w-full text-lg placeholder:text-lg focus:outline-none"
                placeholder="노트의 제목을 입력해주세요"
                value={title}
                onChange={handleTitleChange}
              />
              <Counting type="title" count={title.length} total={30} />
            </div>
            {/* 태그 입력 영역 */}
            <TagInput
              initialTags={memoizedInitialTags}
              onTagsChange={(newTags) => setTags(newTags)}
            />

            {/* 에디터 영역 */}
            <div className="mt-12">
              <Counting
                type="text"
                count={countWithoutSpaces(content)}
                total={countWithSpaces(content)}
              />

              {/* 링크 첨부 */}
              <div className="mt-28">
                {showLink && (
                  <LinkAttached link={link} onRemove={handleRemoveLink} />
                )}
              </div>

              {/* 본문 */}
              <div className="mt-16">
                <Tiptap
                  content={content}
                  setContents={setContent}
                  onLinkSubmit={handleAddLink}
                />
              </div>
            </div>
            <TempSaveManager
              ref={tempSaveManagerRef}
              title={title}
              content={content}
              link={showLink ? link : ""}
            />
          </div>
        </div>

        {/* 모달 */}
        {loadedNote && (
          <LoadNoteModal
            open={modalOpen}
            setOpen={setModalOpen}
            storedTitle={
              loadedNote.title && loadedNote.title.trim() !== ""
                ? loadedNote.title
                : "제목 없음"
            }
            onLoad={() => handleLoadNote(loadedNote)}
          />
        )}
      </div>
    </div>
  );
}
