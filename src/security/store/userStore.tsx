import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  id:string;
  name: string;
  email: string;
  status: string;
  rol: string;
  setUser: (id: string, name: string, email: string, status: string, rol: string) => void;
  clearUser: () => void;
}

export const UserStore = create<UserState>()(
  persist(
    (set) => ({
      id: "",
      name: "",
      email: "",
      status: "",
      rol: "",
      setUser: (id, name, email, status, rol) =>
        set({ id, name, email, status, rol }),
      clearUser: () =>
        set({ id: "", name: "", email: "", status: "", rol: "" }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ id: state.id, name: state.name, email: state.email, status: state.status, rol: state.rol }),
    }
  )
);
