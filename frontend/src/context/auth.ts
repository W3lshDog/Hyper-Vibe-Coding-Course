import { create } from 'zustand'
import { User } from '../types/database'
import { supabase } from '../lib/supabase'

interface AuthState {
  user: User | null
  session: unknown | null
  loading: boolean
  setUser: (user: User | null) => void
  setSession: (session: unknown | null) => void
  setLoading: (loading: boolean) => void
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },
}))

// Initialize auth listener
supabase.auth.onAuthStateChange(async (event, session) => {
  const set = useAuthStore.setState
  set({ session, loading: true })

  if (session?.user) {
    // Fetch detailed user profile from public.users
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    set({ user: userProfile as User, loading: false })
  } else {
    set({ user: null, loading: false })
  }
})
