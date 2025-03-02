import { create } from "zustand";

interface AuthState {
  accessToken: string | null;

  actions: {
    setAccessToken: (token: string) => void;
    removeAccessToken: () => void;
  };
}

const initialState = {
  accessToken: null,
};

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,

  actions: {
    setAccessToken: (token: string) => set({ accessToken: token }),
    removeAccessToken: () => set(initialState),
  },
}));

export const useAuthActions = () => useAuthStore((state) => state.actions);
