"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { listsService } from "@/services/lists.service";

export const listKeys = {
  all: ["lists"] as const,
  byUser: (userId: string | undefined) =>
    [...listKeys.all, "by-user", userId] as const,
  detail: (listId: string) => [...listKeys.all, "detail", listId] as const,
  movies: (listId: string) => [...listKeys.all, "movies", listId] as const,
};

export function useUserLists(userId: string | undefined) {
  return useQuery({
    queryKey: listKeys.byUser(userId),
    queryFn: () => listsService.getByUser(userId!),
    enabled: !!userId,
  });
}

export function useList(listId: string | undefined) {
  return useQuery({
    queryKey: listKeys.detail(listId ?? ""),
    queryFn: () => listsService.getById(listId!),
    enabled: !!listId,
  });
}

/**
 * Récupère uniquement les ids TMDB des films d'une liste.
 * Les détails des films seront fetchés ensuite via les hooks TMDB existants.
 */
export function useListMovieIds(listId: string | undefined) {
  return useQuery({
    queryKey: listKeys.movies(listId ?? ""),
    queryFn: () => listsService.getMovieIds(listId!),
    enabled: !!listId,
  });
}

export function useCreateList(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: { name: string; type?: string | null }) => {
      if (!userId) throw new Error("Utilisateur non connecté");
      return listsService.create({ userId, ...params });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: listKeys.byUser(userId) });
    },
  });
}

export function useUpdateList(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      listId,
      patch,
    }: {
      listId: string;
      patch: Parameters<typeof listsService.update>[1];
    }) => listsService.update(listId, patch),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: listKeys.byUser(userId) });
      qc.invalidateQueries({ queryKey: listKeys.detail(vars.listId) });
    },
  });
}

export function useDeleteList(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (listId: string) => listsService.remove(listId),
    onSuccess: () => qc.invalidateQueries({ queryKey: listKeys.byUser(userId) }),
  });
}

export function useAddMovieToList() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: { listId: string; movieApiId: string }) =>
      listsService.addMovie(params),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: listKeys.movies(vars.listId) });
    },
  });
}

export function useRemoveMovieFromList() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: { listId: string; movieApiId: string }) =>
      listsService.removeMovie(params),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: listKeys.movies(vars.listId) });
    },
  });
}
