import StreakBoard from "@/components/dashboard/streak-board/streak-board";

export default function MyProgressContainer(): JSX.Element {
  return (
    <section className="relative flex h-258 w-full flex-col gap-16 rounded-2xl bg-white p-16 md:h-250">
      <StreakBoard />
    </section>
  );
}
