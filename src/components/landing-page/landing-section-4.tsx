import ShowExam6 from "@/assets/landing-page/show_exam_6.svg";

export default function LandingSection4() {
  return (
    <section className="flex h-705 items-center justify-center gap-243 bg-white">
      <ShowExam6 />
      <div className="flex flex-col gap-18">
        <span className="text-30 font-bold text-dark-blue-500">02</span>
        <h2 className="text-40 font-bold text-slate-800">
          노트 기능 &
          <br />
          목표별 모아보기
        </h2>
        <h3 className="text-32 font-medium text-slate-600">
          목표와 관련된 학습 노트를 손쉽게
          <br />
          정리하고 관리하세요.
        </h3>
      </div>
    </section>
  );
}
