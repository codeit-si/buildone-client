import Level1 from "@/assets/badge/level_1.svg";
import Level2 from "@/assets/badge/level_2.svg";
import Level3 from "@/assets/badge/level_3.svg";
import Level4 from "@/assets/badge/level_4.svg";
import Level5 from "@/assets/badge/level_5.svg";
import Level6 from "@/assets/badge/level_6.svg";

interface BadgeProps {
  streakGrade: number;
}

const badgeLevels = [Level1, Level2, Level3, Level4, Level5, Level6];

export default function Badge({ streakGrade }: BadgeProps) {
  const level = Math.min(Math.max(streakGrade, 0), 5);
  const BadgeIcon = badgeLevels[level];

  return (
    <div className="flex items-center justify-center">
      <BadgeIcon className="h-24 w-24" />
    </div>
  );
}
