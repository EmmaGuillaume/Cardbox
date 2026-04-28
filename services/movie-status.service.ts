import { createClient } from '@/lib/supabase/client'

export const movieStatusService = {
  getStatus: async (movieApiId: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data } = await supabase
      .from('movie_status')
      .select('*')
      .eq('user_id', user.id)
      .eq('movie_api_id', movieApiId)
      .single()

    return data
  },

  upsertStatus: async (
    movieApiId: string,
    patch: { watched?: boolean; liked?: boolean; in_watchlist?: boolean }
  ) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non connecté')

    const { data, error } = await supabase
      .from('movie_status')
      .upsert(
        { user_id: user.id, movie_api_id: movieApiId, ...patch, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,movie_api_id' }
      )
      .select()
      .single()

    if (error) throw error
    return data
  },
}