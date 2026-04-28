import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { movieStatusService } from '@/services/movie-status.service'

export const statusKeys = {
  all: ['movie-status'] as const,
  detail: (movieApiId: string) => [...statusKeys.all, movieApiId] as const,
}

export function useMovieStatus(movieApiId: string) {
  return useQuery({
    queryKey: statusKeys.detail(movieApiId),
    queryFn: () => movieStatusService.getStatus(movieApiId),
    enabled: !!movieApiId,
  })
}

export function useLikeMovie(movieApiId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (liked: boolean) =>
      movieStatusService.upsertStatus(movieApiId, { liked }),
    onSuccess: () => qc.invalidateQueries({ queryKey: statusKeys.detail(movieApiId) }),
  })
}

export function useWatchMovie(movieApiId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (watched: boolean) =>
      movieStatusService.upsertStatus(movieApiId, { watched }),
    onSuccess: () => qc.invalidateQueries({ queryKey: statusKeys.detail(movieApiId) }),
  })
}

export function useWatchlistMovie(movieApiId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (in_watchlist: boolean) =>
      movieStatusService.upsertStatus(movieApiId, { in_watchlist }),
    onSuccess: () => qc.invalidateQueries({ queryKey: statusKeys.detail(movieApiId) }),
  })
}