"use client"
import { useRouter } from "next/navigation";

import BuilDoneTitle from '@/assets/landing-page/buildone_title.svg'
import ShowExam1 from '@/assets/landing-page/show_exam_1.svg'
import ShowExam2 from '@/assets/landing-page/show_exam_2.svg'

export default function LandingSection1() {
  const router = useRouter();
  return (
    <section className="flex h-816 items-center justify-center bg-dark-blue-100 text-slate-800">
      <div className="flex items-center gap-154">
        <div className="flex flex-col gap-40">
          <div className="flex flex-col gap-12">
            <h1 className="text-36 font-bold">
              개발자를 위한 목표 & 학습 <br />
              관리 서비스
            </h1>
            <BuilDoneTitle/>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="h-52 w-138 rounded-8 bg-dark-blue-500 text-18 font-bold text-white hover:bg-dark-blue-600"
          >
            지금 시작하기
          </button>
        </div>
        <div className="flex flex-col gap-12">
          <ShowExam1/>
          <ShowExam2/>
        </div>
      </div>
    </section>
  );
}
