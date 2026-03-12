import { create } from 'zustand'
import type { User } from '../types/database'
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

supabase.auth.onAuthStateChange(async (_, session) => {
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

async function initializeAuth() {
  const { data } = await supabase.auth.getSession()
  const session = data.session

  const set = useAuthStore.setState
  set({ session, loading: true })

  if (session?.user) {
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()

    set({ user: userProfile as User, loading: false })
    return
  }

  set({ user: null, loading: false })
}

void initializeAuth()
