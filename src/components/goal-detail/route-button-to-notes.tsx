import Link from "next/link";

import NoteIcon from "@/assets/icons-small/note_compose.svg";

interface RouteButtonToNotesProps {
  goalId: string;
}

export default function RouteButtonToNotes({
  goalId,
}: RouteButtonToNotesProps) {
  return (
    <Link
      href={`/notes/${goalId}`}
      className="flex items-center gap-x-8 rounded-12 border border-slate-100 bg-dark-blue-200 px-24 py-16"
    >
      <NoteIcon />
      <span className="text-lg font-bold text-slate-800">노트 모아보기</span>
    </Link>
  );
}
