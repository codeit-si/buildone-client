interface ArrowDropIconProps {
  reversal?: boolean;
}

export default function ArrowDropdownIcon({
  reversal = false,
}: ArrowDropIconProps) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={reversal ? "rotate(180)" : ""}
    >
      <path
        d="M7.71513 7.4653C7.3975 7.76539 6.90085 7.7654 6.58321 7.4653L0.8047 2.00605C0.262753 1.49404 0.625105 0.582861 1.37066 0.582861L12.9276 0.582862C13.6732 0.582862 14.0355 1.49404 13.4936 2.00604L7.71513 7.4653Z"
        fill="#1E293B"
      />
    </svg>
  );
}
