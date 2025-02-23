import DeleteIcon from "@/assets/delete.svg";
import EmbedIcon from "@/assets/embed.svg";
import { cn } from "@/lib/cn";
import "@/styles/note.css";

interface LinkAttachedProps {
  link: string;
  onRemove: () => void;
}

export default function LinkAttached({
  link,
  onRemove,
}: LinkAttachedProps): JSX.Element {
  return (
    <div
      className={cn(
        "container-width flex items-center rounded-20 bg-slate-200 p-4 pl-2 pr-2",
        "h-32 w-full",
      )}
    >
      <EmbedIcon className="ml-8 mr-8 flex-shrink-0" width="24" height="24" />
      <span className={cn("flex-grow truncate text-slate-800", "flex-shrink")}>
        {link}
      </span>
      <button onClick={onRemove} className="mr-8 flex-shrink-0">
        <DeleteIcon width="24" height="24" />
      </button>
    </div>
  );
}
