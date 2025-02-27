const STROKE = {
  "dark-blue": "#6F63FF",
} as const;

interface PlusIconProps {
  stroke: keyof typeof STROKE;
}

export default function PlusIcon({ stroke = "dark-blue" }: PlusIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33301 8H12.333"
        stroke={STROKE[stroke]}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.83301 12.5L7.83301 3.5"
        stroke={STROKE[stroke]}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
