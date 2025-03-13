interface TagItemProps {
  tag: string;
}

export default function TagItem({ tag }: TagItemProps) {
  return (
    <li className="rounded-16 border border-dark-blue-300 bg-dark-blue-100 px-4 py-2 md:p-4">
      <p className="text-9 font-medium text-slate-700 md:text-12">#{tag}</p>
    </li>
  );
}
