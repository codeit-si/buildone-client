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
import { NoteResponse } from "@/types/note";

import EmbeddedFrame from "../@common/embeded-frame";

import LinkAttached from "./link-attached";

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
        <LinkAttached link={linkUrl} onClick={() => setSheetOpen(!sheetOpen)} />
      )}
      <div className="markdown-body scrollbar overflow-y-auto pt-16 text-base font-normal">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {note.content}
        </ReactMarkdown>
      </div>
    </Sheet.Content>
  );
}
