import TabInput from "@/components/tab-side-menu/tab-input";
import { cn } from "@/lib/cn";
import { AddGoalSectionProps } from "@/types/tab-side-menu";

import CustomButton from "./custom-button";

export default function AddGoalSection({
  isAdding,
  setIsAdding,
  handleSubmit,
  setNewGoal,
  newGoal,
  goals,
}: AddGoalSectionProps) {
  return (
    <div>
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className={cn(goals.length > 0 && "pt-10")}
        >
          <TabInput
            onInputChange={(id, newValue) => setNewGoal(newValue)}
            onInputBlur={() => {}}
            tab={{ id: 0, text: newGoal }}
          />
        </form>
      )}
      <CustomButton
        isMobile={false}
        onClick={() => setIsAdding(!isAdding)}
        variant="outlined"
        color="blue"
        className={cn((goals.length > 0 || isAdding) && "mt-24")}
      >
        새 목표
      </CustomButton>
    </div>
  );
}
