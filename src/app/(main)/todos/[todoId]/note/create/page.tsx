"use client";

import { ChangeEvent, useRef, useState } from "react";

import Button from "@/components/@common/button";
import Counting from "@/components/@common/counting";
import LoadNoteModal from "@/components/@common/load-modal";
import Goal from "@/components/note/goal";
import LinkAttached from "@/components/note/link-attached";
import LoadNoteToastManager, {
  NoteData,
} from "@/components/note/load-note-toast-manager";
import TagInput from "@/components/note/tag";
import TempSaveManager, {
  TempSaveManagerRef,
} from "@/components/note/temp-save-manager";
import Tiptap from "@/components/note/tiptap";
import Todo from "@/components/note/todo";
import "@/styles/note.css";
import { countWithoutSpaces, countWithSpaces } from "@/utils/text-utils";

export default function NotesPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [showLink, setShowLink] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loadedNote, setLoadedNote] = useState<NoteData | null>(null);

  const tempSaveManagerRef = useRef<TempSaveManagerRef>(null);

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
              >
                작성 완료
              </Button>
            </div>
          </div>

          <div className="mt-16">
            {/* 임시 저장 노트 로드 토스트 */}
            <LoadNoteToastManager onLoadNote={handleOpenLoadModal} />

            {/* 목표 표시 */}
            <Goal goalText="자바스크립트로 웹 서비스 만들기" />

            {/* To do 항목 */}
            <Todo todoText="자바스크립트 기초 챕터1 듣기" />

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
            <TagInput />

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
