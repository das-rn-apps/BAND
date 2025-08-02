// store/useAdminAuth.ts
import { create } from "zustand";

interface AdminAuthState {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin@825318825318";

export const useAdminAuth = create<AdminAuthState>((set) => ({
  isAdmin: localStorage.getItem("isAdmin") === "true",

  login: (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      set({ isAdmin: true });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("isAdmin");
    set({ isAdmin: false });
  },
}));
