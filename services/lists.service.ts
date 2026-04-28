import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/types/database.types";

export type UserList = Tables<"list">;
export type ListMovie = Tables<"list_movie">;

export const listsService = {
  /**
   * Récupère toutes les listes d'un utilisateur (système et perso).
   */
  getByUser: async (userId: string): Promise<UserList[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("list")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  /**
   * Récupère une liste par id.
   */
  getById: async (listId: string): Promise<UserList | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("list")
      .select("*")
      .eq("id", listId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  /**
   * Récupère les ids TMDB des films d'une liste, triés par position.
   * NB : on ne stocke que l'id TMDB côté DB ; les détails du film
   * sont fetchés via TMDB côté UI (cf. moviesService.getById).
   */
  getMovieIds: async (listId: string): Promise<string[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("list_movie")
      .select("movie_api_id, position")
      .eq("list_id", listId)
      .order("position", { ascending: true, nullsFirst: false });
    if (error) throw error;
    return (data ?? []).map((row) => row.movie_api_id);
  },

  /**
   * Crée une nouvelle liste pour l'utilisateur courant.
   */
  create: async (params: {
    userId: string;
    name: string;
    type?: string | null;
  }): Promise<UserList> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("list")
      .insert({
        user_id: params.userId,
        name: params.name,
        type: params.type ?? null,
        is_system: false,
      })
      .select("*")
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Renomme / met à jour une liste.
   */
  update: async (listId: string, patch: Partial<UserList>): Promise<UserList> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("list")
      .update(patch)
      .eq("id", listId)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Supprime une liste (et, idéalement, ses list_movie via cascade DB).
   */
  remove: async (listId: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("list").delete().eq("id", listId);
    if (error) throw error;
  },

  /**
   * Ajoute un film (id TMDB) à une liste.
   */
  addMovie: async (params: { listId: string; movieApiId: string }) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("list_movie")
      .insert({
        list_id: params.listId,
        movie_api_id: params.movieApiId,
      })
      .select("*")
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Retire un film d'une liste.
   */
  removeMovie: async (params: { listId: string; movieApiId: string }) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("list_movie")
      .delete()
      .eq("list_id", params.listId)
      .eq("movie_api_id", params.movieApiId);
    if (error) throw error;
  },
};
