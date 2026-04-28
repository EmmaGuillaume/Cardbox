import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { listService } from '@/services/list.service'

export const listKeys = {
  all: ['lists'] as const,
  userLists: () => [...listKeys.all, 'user'] as const,
}

export function useUserLists() {
  return useQuery({
    queryKey: listKeys.userLists(),
    queryFn: listService.getUserLists,
  })
}

export function useAddMovieToList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ listId, movieApiId }: { listId: string; movieApiId: string }) =>
      listService.addMovieToList(listId, movieApiId),
    onSuccess: () => qc.invalidateQueries({ queryKey: listKeys.userLists() }),
  })
}

export function useRemoveMovieFromList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ listId, movieApiId }: { listId: string; movieApiId: string }) =>
      listService.removeMovieFromList(listId, movieApiId),
    onSuccess: () => qc.invalidateQueries({ queryKey: listKeys.userLists() }),
  })
}