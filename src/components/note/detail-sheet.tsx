"use client";

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

interface DetailSheetProps {
  noteId: number;
}

export default function DetailSheet({ noteId }: DetailSheetProps): JSX.Element {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<NoteResponse, Error>({
    queryKey: ["noteDetail", noteId],
    queryFn: () => getNote(noteId),
  });

  if (isLoading) return <div>Loading detail...</div>;
  if (error || !note) return <div>Error loading detail.</div>;

  return (
    <Sheet.Content className="gap-0 p-24">
      <div className="mb-16" />
      <Goal goalText={note.goalInformation.title} />
      <div className="flex items-center justify-between">
        <Todo
          todoText={note.todoInformation.title}
          date={new Date(note.createdAt).toLocaleDateString()}
        />
      </div>
      <div className="h-52 border-b border-t border-slate-200 pb-12 pt-12 text-lg font-medium text-slate-800">
        {note.title}
      </div>
      <div className="markdown-body scrollbar overflow-y-auto pt-16 text-base font-normal">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {note.content}
        </ReactMarkdown>
      </div>
    </Sheet.Content>
  );
}
