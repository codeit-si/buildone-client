"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { useQuery } from "@tanstack/react-query";
import "github-markdown-css";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import DeleteIcon from "@/assets/icons-small/delete.svg";
import Sheet from "@/components/@common/portal/sheet";
import Goal from "@/components/note/goal";
import Todo from "@/components/note/todo";
import { getNote } from "@/services/note";
import { NoteResponse } from "@/types/note";

import EmbeddedFrame from "../@common/embeded-frame";

interface DetailSheetProps {
  noteId: number;
  linkUrl?: string | null;
}

export default function DetailSheet({
  noteId,
  linkUrl,
}: DetailSheetProps): JSX.Element {
  const { data: note, error } = useQuery<NoteResponse, Error>({
    queryKey: ["noteDetail", noteId],
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
      <div className="flex items-center justify-between">
        <Todo
          todoText={note.todoInformation.title}
          date={new Date(note.createdAt).toLocaleDateString()}
        />
      </div>
      <div className="h-52 border-b border-t border-slate-200 pb-12 pt-12 text-lg font-medium text-slate-800">
        {note.title}
      </div>
      {linkUrl && (
        <button
          onClick={() => setSheetOpen(!sheetOpen)}
          className="mt-16 flex items-center justify-between gap-16 rounded-full bg-slate-200 py-4 pl-16 pr-6 text-16 text-slate-800"
        >
          <p className="line-clamp-1 w-full text-start">{linkUrl}</p>
          <DeleteIcon />
        </button>
      )}
      <div className="markdown-body scrollbar overflow-y-auto pt-16 text-base font-normal">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {note.content}
        </ReactMarkdown>
      </div>
    </Sheet.Content>
  );
}
