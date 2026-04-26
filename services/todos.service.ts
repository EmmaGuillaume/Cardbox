import { createClient } from '@/lib/supabase/client'

export const todosService = {
  getAll: async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
  },
  create: async (title: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from('todos').insert({ title }).select().single()
    if (error) throw error
    return data
  },
}