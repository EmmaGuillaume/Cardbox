import { createClient } from '@/lib/supabase/client'

export const watchlistService = {
  getWatchlist: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('movie_status')
      .select('*')
      .eq('user_id', user.id)
      .eq('in_watchlist', true)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data
  },
}