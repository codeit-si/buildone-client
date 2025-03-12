interface TagItemProps {
  tag: string;
}

export default function TagItem({ tag }: TagItemProps) {
  return (
    <li className="rounded-16 border border-dark-blue-300 bg-dark-blue-100 p-4">
      <p className="text-12 font-medium text-slate-700">#{tag}</p>
    </li>
  );
}
