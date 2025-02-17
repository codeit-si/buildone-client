import { create } from "zustand";

interface AuthState {
  accessToken: string;

  actions: {
    setAccessToken: (token: string) => void;
    removeAccessToken: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: "",
  actions: {
    setAccessToken: (token: string) => set({ accessToken: token }),
    removeAccessToken: () => set({ accessToken: "" }),
  },
}));

export const useAuthActions = () => useAuthStore((state) => state.actions);
