import { create } from "zustand";

import { MemberInformation } from "@/types/auth";

interface UserState {
  id: number;
  email: string;
  name: string;

  actions: {
    setUserInfo: (userInfo: MemberInformation) => void;
    removeUserInfo: () => void;
  };
}

const initialState = {
  id: 0,
  email: "",
  name: "",
};

export const useUserStore = create<UserState>()((set) => ({
  ...initialState,

  actions: {
    setUserInfo: ({ id, email, name }: MemberInformation) =>
      set({ id, email, name }),
    removeUserInfo: () => set(initialState),
  },
}));

export const useUserActions = () => useUserStore((state) => state.actions);
