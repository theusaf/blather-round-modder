import { create } from "zustand";
import { UserLoginDetails } from "../types/session";

interface UserStoreState {
  user: UserLoginDetails | null;
  setUser: (user: UserLoginDetails) => void;
  logout: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user: UserLoginDetails) => set({ user }),
  logout: () => set({ user: null }),
}));
