import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  name: string;
  email: string;
  status: string;
  setUser: (name: string, email: string, status: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      status: "",
      setUser: (name, email, status) =>
        set({ name, email, status }),
      clearUser: () =>
        set({ name: "", email: "", status: "" }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ name: state.name, email: state.email, status: state.status }),
    }
  )
);
