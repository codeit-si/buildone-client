"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { useQuery } from "@tanstack/react-query";
import "github-markdown-css";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import Sheet from "@/components/@common/portal/sheet";
import Goal from "@/components/note/goal";
import Todo from "@/components/note/todo";
import { getNote } from "@/services/note";
import { noteKeys } from "@/services/query-key";
import { NoteResponse } from "@/types/note";

import EmbeddedFrame from "../@common/embeded-frame";

import LinkAttached from "./link-attached";

interface DetailSheetProps {
  noteId: number;
  linkUrl?: string | null;
}

const SHEET_BUTTON_CLASS =
  "rounded-8 border border-slate-400 md:px-12 md:py-8 px-6 py-6 text-sm md:text-base font-normal text-slate-400 hover:font-semibold transition-all duration-300";

export default function DetailSheet({
  noteId,
  linkUrl,
}: DetailSheetProps): JSX.Element {
  const { data: note, error } = useQuery<NoteResponse, Error>({
    queryKey: noteKeys.detail(noteId),
    queryFn: () => getNote(noteId),
  });
  const [sheetOpen, setSheetOpen] = useState(false);

  if (error || !note) return <div>Error loading detail.</div>;

  return (
    <Sheet.Content className="gap-0 p-24">
      {sheetOpen && linkUrl && <EmbeddedFrame linkUrl={linkUrl} />}
      <div className="mb-16" />
      {note.goalInformation.title !== null && (
        <Goal goalText={note.goalInformation.title} />
      )}
      <div className="flex items-center justify-between transition">
        <Todo
          todoText={note.todoInformation.title}
          date={new Date(note.createdAt).toLocaleDateString()}
        />
      </div>
      <div className="h-52 border-b border-t border-slate-200 pb-12 pt-12 text-lg font-medium text-slate-800">
        {note.title}
      </div>
      {linkUrl && (
        <LinkAttached link={linkUrl} onClick={() => setSheetOpen(!sheetOpen)} />
      )}
      <div className="markdown-body scrollbar h-full overflow-y-auto pt-16 text-base font-normal">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {note.content}
        </ReactMarkdown>
      </div>
      <div className="mt-16 flex gap-8 self-end">
        <button className={SHEET_BUTTON_CLASS}>수정하기</button>
        <button className={SHEET_BUTTON_CLASS}>삭제하기</button>
      </div>
    </Sheet.Content>
  );
}
