import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MemberInformation } from "@/types/auth";

interface UserState {
  userInformation: MemberInformation | null;

  actions: {
    setUserInfo: (userInfo: MemberInformation) => void;
    removeUserInfo: () => void;
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInformation: null,

      actions: {
        setUserInfo: ({ id, email, name }: MemberInformation) =>
          set({ userInformation: { id, email, name } }),
        removeUserInfo: () => set({ userInformation: null }),
      },
    }),
    {
      name: "user-information",
    },
  ),
);

export const useUserActions = () => useUserStore((state) => state.actions);
