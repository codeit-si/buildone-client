import Level1 from "@/assets/badge/level_1.svg";
import Level2 from "@/assets/badge/level_2.svg";
import Level3 from "@/assets/badge/level_3.svg";
import Level4 from "@/assets/badge/level_4.svg";
import Level5 from "@/assets/badge/level_5.svg";
import Level6 from "@/assets/badge/level_6.svg";

const badgeLevels = [Level1, Level2, Level3, Level4, Level5, Level6];

interface BadgeIconProps {
  level: number;
  className?: string;
}

export default function BadgeIcon({ level, className }: BadgeIconProps) {
  const Badge = badgeLevels[level];

  return <Badge className={className} />;
}
