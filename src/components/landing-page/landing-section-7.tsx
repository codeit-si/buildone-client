"use client";

import { useRouter } from "next/navigation";

export default function LandingSection7() {
  const router = useRouter();
  return (
    <section className="flex h-442 items-center justify-center bg-dark-blue-200">
      <div className="flex flex-col gap-30 text-center items-center">
        <h2 className="text-40 font-bold text-slate-800">
          목표를 정하고,
          <br />
          꾸준히 성장하세요!
        </h2>
        <button
          onClick={() => router.push("/login")}
          className="h-52 w-138 rounded-8 bg-dark-blue-500 text-18 font-bold text-white hover:bg-dark-blue-600"
        >
          지금 시작하기
        </button>
      </div>
    </section>
  );
}
