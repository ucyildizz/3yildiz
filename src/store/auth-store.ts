import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuthenticated: boolean
  user: { username: string; role: string } | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Basit auth sistemi - Supabase kurulduktan sonra güncellenmeli
const ADMIN_CREDENTIALS = {
  username: 'metal',
  password: '5858',
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (username: string, password: string) => {
        if (
          username === ADMIN_CREDENTIALS.username &&
          password === ADMIN_CREDENTIALS.password
        ) {
          set({
            isAuthenticated: true,
            user: { username, role: 'admin' },
          })
          return true
        }
        return false
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        })
      },
    }),
    {
      name: 'ucyildiz-admin-auth',
    }
  )
)
