import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MemberInformation } from "@/types/auth";

interface UserState {
  userInformation: MemberInformation | null;
  fcmToken?: string;

  setUserInfo: (userInfo: MemberInformation) => void;
  setFcmToken: (token: string) => void;
  removeUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInformation: null,

      setUserInfo: ({ id, email, name, streakGrade }: MemberInformation) =>
        set({ userInformation: { id, email, name, streakGrade } }),
      setFcmToken: (token: string) => set({ fcmToken: token }),
      removeUserInfo: () => set({ userInformation: null }),
    }),
    {
      name: "user-information",
    },
  ),
);
