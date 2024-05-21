"use client";
import { create } from "zustand";
import { UserLogin } from "../types/session";

interface UserStoreState {
  user: UserLogin;
  setUser: (user: UserLogin) => void;
  logout: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: { loggedIn: false },
  setUser: (user: UserLogin) => set({ user }),
  logout: () => set({ user: { loggedIn: false } }),
}));
