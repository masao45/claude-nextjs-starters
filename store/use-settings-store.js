import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useSettingsStore = create(
  persist(
    (set) => ({
      profile: { name: "", email: "" },
      notifications: {
        emailUpdates: true,
        pushAlerts: false,
      },
      setProfile: (profile) => set({ profile }),
      setNotification: (key, value) =>
        set((state) => ({
          notifications: { ...state.notifications, [key]: value },
        })),
      reset: () =>
        set({
          profile: { name: "", email: "" },
          notifications: { emailUpdates: true, pushAlerts: false },
        }),
    }),
    { name: "settings-store" }
  )
)
