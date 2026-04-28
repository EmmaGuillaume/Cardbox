import { createClient } from '@/lib/supabase/client'

export const listService = {
  getUserLists: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('list')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  addMovieToList: async (listId: string, movieApiId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('list_movie')
      .insert({ list_id: listId, movie_api_id: movieApiId })
      .select()
      .single()

    if (error) throw error
    return data
  },

  removeMovieFromList: async (listId: string, movieApiId: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('list_movie')
      .delete()
      .eq('list_id', listId)
      .eq('movie_api_id', movieApiId)

    if (error) throw error
  },
}