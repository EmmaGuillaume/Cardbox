"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { authService } from "@/services/auth.service";
import { createClient } from "@/lib/supabase/client";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  profile: (id: string | undefined) =>
    [...authKeys.all, "profile", id] as const,
};

/**
 * Hook principal : retourne l'utilisateur Supabase courant + son profil public.
 * Se synchronise automatiquement avec onAuthStateChange (login/logout dans un autre onglet, etc.).
 */
export function useAuth() {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: authKeys.user(),
    queryFn: authService.getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const profileQuery = useQuery({
    queryKey: authKeys.profile(userQuery.data?.id),
    queryFn: () => authService.getProfile(userQuery.data!.id),
    enabled: !!userQuery.data?.id,
    staleTime: 5 * 60 * 1000,
  });

  // Écoute les changements de session (login, logout, refresh token)
  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    });
    return () => subscription.unsubscribe();
  }, [queryClient]);

  return {
    user: userQuery.data ?? null,
    profile: profileQuery.data ?? null,
    isLoading: userQuery.isLoading,
    isAuthenticated: !!userQuery.data,
  };
}

export function useSignIn() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.signInWithPassword(email, password),
    onSuccess: () => qc.invalidateQueries({ queryKey: authKeys.all }),
  });
}

export function useSignUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      email: string;
      password: string;
      username: string;
    }) => authService.signUpWithPassword(params),
    onSuccess: () => qc.invalidateQueries({ queryKey: authKeys.all }),
  });
}

export function useSignOut() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: authKeys.all });
      // Pour faire propre, on vide tout le cache lié à l'utilisateur
      qc.removeQueries({ queryKey: ["lists"] });
      qc.removeQueries({ queryKey: ["movie-status"] });
      qc.removeQueries({ queryKey: ["follows"] });
    },
  });
}
