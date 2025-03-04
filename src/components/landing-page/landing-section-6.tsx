import ShowExam8 from "@/assets/landing-page/show_exam_8.svg";
export default function LandingSection6() {
  return (
    <section className="flex h-705 items-center justify-center gap-243 bg-white">
      <ShowExam8 />
      <div className="flex flex-col gap-18">
        <span className="text-30 font-bold text-dark-blue-500">04</span>
        <h2 className="text-40 font-bold text-slate-800">거북목 방지 알림</h2>
        <h3 className="text-32 font-medium text-slate-600">
          일도 중요하지만 건강도 중요하니까,
          <br />
          일정 시간마다 건강한 자세를 유지하세요.
        </h3>
      </div>
    </section>
  );
}
