import Link from "next/link";

import DeleteIcon from "@/assets/icons-small/delete.svg";
import EmbedIcon from "@/assets/icons-small/embed.svg";
import { cn } from "@/lib/cn";
import "@/styles/note.css";

interface LinkAttachedProps {
  link: string;
  onRemove?: () => void;
  onClick?: () => void;
}

export default function LinkAttached({
  link,
  onRemove,
  onClick,
}: LinkAttachedProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center rounded-20 bg-slate-200 px-6 py-4",
        "mb-8 mt-12 h-32 w-full cursor-pointer",
      )}
    >
      <button onClick={onClick} className="flex-shrink-0">
        <EmbedIcon className="mr-8 flex-shrink-0" width="24" height="24" />
      </button>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-full flex-grow truncate text-start text-slate-800",
          "flex-shrink hover:underline",
        )}
      >
        {link}
      </Link>
      {onRemove && (
        <button onClick={onRemove} className="flex-shrink-0">
          <DeleteIcon width="24" height="24" />
        </button>
      )}
    </div>
  );
}
