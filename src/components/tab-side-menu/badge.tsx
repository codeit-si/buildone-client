import BadgeIcon from "../badge/badge-icon";

interface BadgeProps {
  streakGrade: number;
}

export default function Badge({ streakGrade }: BadgeProps) {
  const level = Math.min(Math.max(streakGrade, 0), 5);

  return (
    <div className="flex items-center justify-center">
      <BadgeIcon level={level} className="h-20 w-20 md:h-24 md:w-24" />
    </div>
  );
}
