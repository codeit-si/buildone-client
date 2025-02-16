import Button from "@/components/button";

export default function ComposePage() {
  return (
    <div className="ml-16 mt-24 flex h-44 items-center md:ml-24 lg:ml-80">
      <div className="flex w-full items-center gap-8">
        <h1 className="w-166 truncate text-lg text-slate-900 md:w-422 lg:w-792">
          노트 작성
        </h1>
        <Button variant="outlined" size="sm" shape="square">
          임시저장
        </Button>
        <Button variant="solid" size="sm" shape="square">
          작성 완료
        </Button>
      </div>
    </div>
  );
}
