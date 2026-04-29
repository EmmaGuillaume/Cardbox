import { createClient } from '@/lib/supabase/client'

export const activityService = {
  getUserActivity: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { reviews: [], liked: [] }

    const [reviewsRes, likedRes] = await Promise.all([
      supabase
        .from('review')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('movie_status')
        .select('*')
        .eq('user_id', user.id)
        .eq('liked', true)
        .order('updated_at', { ascending: false }),
    ])

    if (reviewsRes.error) throw reviewsRes.error
    if (likedRes.error) throw likedRes.error

    return {
      reviews: reviewsRes.data,
      liked: likedRes.data,
    }
  },
}