import { TabInput } from "@/components/tab-input";
import { AddGoalSectionProps } from "@/types/tab-sidemenu";

import CustomButton from "./CustomButton";

const AddGoalSection = ({
  isAdding,
  setIsAdding,
  handleSubmit,
  setNewGoal,
  newGoal,
  goals,
}: AddGoalSectionProps) => {
  return (
    <div className={`${goals.length !== 0 && "mt-10"}`}>
      {!isAdding ? (
        <CustomButton
          isMobile={false}
          onClick={() => setIsAdding(!isAdding)}
          variant="outlined"
          color="blue"
        >
          새목표
        </CustomButton>
      ) : (
        <form onSubmit={handleSubmit}>
          <TabInput
            onInputChange={(id, newValue) => setNewGoal(newValue)}
            onInputBlur={() => {}}
            tab={{ id: 0, text: newGoal }}
            className="text-purple-700"
          />
        </form>
      )}
    </div>
  );
};
export default AddGoalSection;
