"use client";
import { create } from "zustand";
import type { UserLogin } from "../types/session";

interface UserStoreState {
	user: UserLogin;
	setUser: (user: UserLogin) => void;
	logout: () => void;
}

/**
 * Retrieves and manages the user's login global state.
 */
export const useUserStore = create<UserStoreState>((set) => ({
	user: { loggedIn: false },
	setUser: (user: UserLogin) => set({ user }),
	logout: () => set({ user: { loggedIn: false } }),
}));
