import { create } from "zustand";

interface AuthState {
  accessToken: string;
  expiredTime: string;

  actions: {
    setAccessToken: (token: string) => void;
    removeAccessToken: () => void;
  };
}

const initialState = {
  accessToken: "",
  expiredTime: "",
};

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,

  actions: {
    setAccessToken: (token: string) => set({ accessToken: token }),
    setExpiredTime: (time: string) => set({ expiredTime: time }),
    removeAccessToken: () => set(initialState),
  },
}));

export const useAuthActions = () => useAuthStore((state) => state.actions);
