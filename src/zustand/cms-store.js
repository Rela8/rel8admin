import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCmsAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set(() => ({ user: userData })),
      delUser: () => set(() => ({ user: null })),
    }),
    { name: "cmsuser" }
  )
);
