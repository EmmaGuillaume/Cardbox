import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/types/database.types";

export type UserProfile = Tables<"user">;

export const authService = {
  /**
   * Récupère l'utilisateur Supabase Auth courant (auth.users), null si déconnecté.
   */
  getCurrentUser: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    // Quand il n'y a pas de session, getUser renvoie une erreur "Auth session missing".
    // On ne traite pas ça comme une vraie erreur : on renvoie juste null.
    if (error) return null;
    return data.user;
  },

  /**
   * Récupère la ligne profil dans la table public.user pour un id donné.
   */
  getProfile: async (userId: string): Promise<UserProfile | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  signInWithPassword: async (email: string, password: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signUpWithPassword: async (params: {
    email: string;
    password: string;
    username: string;
  }) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        // Le username est lu côté trigger SQL ou côté insert dans public.user
        // (cf. README : à toi de créer le trigger côté Supabase).
        data: { username: params.username },
      },
    });
    if (error) throw error;

    // Création de la ligne profil si la session est dispo (pas de confirmation email)
    if (data.user) {
      await supabase.from("user").upsert(
        {
          id: data.user.id,
          email: params.email,
          username: params.username,
        },
        { onConflict: "id" },
      );
    }

    return data;
  },

  signOut: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
