import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MemberInformation } from "@/types/auth";

interface UserState {
  userInformation: MemberInformation | null;

  setUserInfo: (userInfo: MemberInformation) => void;
  removeUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInformation: null,

      setUserInfo: ({ id, email, name, streakGrade }: MemberInformation) =>
        set({ userInformation: { id, email, name, streakGrade } }),
      removeUserInfo: () => set({ userInformation: null }),
    }),
    {
      name: "user-information",
    },
  ),
);
