import { useSuspenseQuery } from "@tanstack/react-query";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

import { getDashboardProgressOptions } from "@/services/dashboard/query";

export default function MyProgress() {
  const { data } = useSuspenseQuery(getDashboardProgressOptions());

  const progressData = [{ name: "내 진행 상황", value: data?.progress ?? 0 }];

  return (
    <ResponsiveContainer>
      <PieChart width={730} height={250}>
        <Pie
          data={progressData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#ffffff"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
