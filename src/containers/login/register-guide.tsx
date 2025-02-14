import Link from "next/link";

export default function RegisterGuide() {
  return (
    <p className="mt-40 flex justify-center gap-x-4 text-sm font-medium">
      빌던이 처음이신가요?
      <Link href="/signup" className="text-purple-500 underline">
        회원가입
      </Link>
    </p>
  );
}
