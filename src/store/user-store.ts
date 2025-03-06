import { create } from "zustand";

import { MemberInformation } from "@/types/auth";

interface UserState {
  userInformation: MemberInformation | null;

  actions: {
    setUserInfo: (userInfo: MemberInformation) => void;
    removeUserInfo: () => void;
  };
}

export const useUserStore = create<UserState>()((set) => ({
  userInformation: null,

  actions: {
    setUserInfo: ({ id, email, name }: MemberInformation) =>
      set({ userInformation: { id, email, name } }),
    removeUserInfo: () => set({ userInformation: null }),
  },
}));

export const useUserActions = () => useUserStore((state) => state.actions);
