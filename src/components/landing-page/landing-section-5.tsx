import ShowExam7 from "@/assets/landing-page/show_exam_7.svg";
export default function LandingSection5() {
  return (
    <section className="flex h-705 items-center justify-center gap-75 bg-dark-blue-100">
      <div className="flex flex-col gap-18">
        <span className="text-30 font-bold text-dark-blue-500">03</span>
        <h2 className="text-40 font-bold text-slate-800">
          GitHub 스타일 스트릭 & 뱃지 시스템
        </h2>
        <h3 className="text-32 font-medium text-slate-600">
          꾸준함이 성과로! 개발자로서의 성장을
          <br />
          시각적으로 확인하세요.
        </h3>
      </div>
      <ShowExam7 />
    </section>
  );
}
