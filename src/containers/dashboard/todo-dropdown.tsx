import FileIcon from "@/assets/file.svg";
import LinkIcon from "@/assets/link.svg";
import Dropdown from "@/components/dropdown";
import { TodoResponse } from "@/types/services";

interface TodoEditAndDeleteAndIconsProps {
  todo: TodoResponse;
}

export default function TodoDropdown({ todo }: TodoEditAndDeleteAndIconsProps) {
  return (
    <div className="flex items-center gap-8">
      {todo.linkUrl && <LinkIcon />}
      {todo.fileUrl && <FileIcon />}
      <Dropdown
        items={[
          { id: "0", label: "수정하기", onClick: () => {} },
          { id: "1", label: "수정하기", onClick: () => {} },
        ]}
      />
    </div>
  );
}
