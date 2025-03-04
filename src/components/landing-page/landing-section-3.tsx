import ShowExam4 from "@/assets/landing-page/show_exam_4.svg";
import ShowExam5 from "@/assets/landing-page/show_exam_5.svg";

export default function LandingSection3() {
  return (
    <section className="flex h-705 items-center justify-center bg-dark-blue-100">
      <div className="flex items-center gap-116">
        <div className="flex flex-col gap-18">
          <span className="text-30 font-bold text-dark-blue-500">01</span>
          <h2 className="text-40 font-bold text-slate-800">
            목표 기반 할 일 &
            <br />
            진행률 관리
          </h2>
          <h3 className="text-32 font-medium text-slate-600">
            목표를 중심으로 할 일을 계획하고, 진행률을
            <br />
            한눈에 확인하세요.
          </h3>
        </div>
        <div className="flex flex-col">
          <ShowExam4 />
          <ShowExam5 />
        </div>
      </div>
    </section>
  );
}
