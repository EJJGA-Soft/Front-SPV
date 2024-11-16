import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  name: string;
  email: string;
  status: string;
  rol: string;
  setUser: (name: string, email: string, status: string, rol: string) => void;
  clearUser: () => void;
}

export const UserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      status: "",
      rol: "",
      setUser: (name, email, status, rol) =>
        set({ name, email, status, rol }),
      clearUser: () =>
        set({ name: "", email: "", status: "", rol: "" }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ name: state.name, email: state.email, status: state.status, rol: state.rol }),
    }
  )
);
