import { createClient } from '@/lib/supabase/client'

export const reviewService = {
  getByMovie: async (movieApiId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('review')
      .select('*, user(username, avatar_url)')
      .eq('movie_api_id', movieApiId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  upsert: async (movieApiId: string, rating: number, comment?: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non connecté')

    const { data, error } = await supabase
      .from('review')
      .upsert(
        { user_id: user.id, movie_api_id: movieApiId, rating, comment },
        { onConflict: 'user_id,movie_api_id' }
      )
      .select()
      .single()

    if (error) throw error
    return data
  },
}