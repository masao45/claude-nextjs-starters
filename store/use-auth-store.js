import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async ({ email }) => {
        set({ isLoading: true })
        // TODO: 실제 API 연동 시 이 부분을 fetch("/api/login", ...) 호출로 교체
        await new Promise((resolve) => setTimeout(resolve, 800))
        set({
          user: { email, name: email.split("@")[0] },
          isLoading: false,
        })
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-store" }
  )
)
