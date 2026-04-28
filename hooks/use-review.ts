import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/review.service'

export const reviewKeys = {
  all: ['reviews'] as const,
  byMovie: (movieApiId: string) => [...reviewKeys.all, movieApiId] as const,
}

export function useMovieReviews(movieApiId: string) {
  return useQuery({
    queryKey: reviewKeys.byMovie(movieApiId),
    queryFn: () => reviewService.getByMovie(movieApiId),
    enabled: !!movieApiId,
  })
}

export function useUpsertReview(movieApiId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ rating, comment }: { rating: number; comment?: string }) =>
      reviewService.upsert(movieApiId, rating, comment),
    onSuccess: () => qc.invalidateQueries({ queryKey: reviewKeys.byMovie(movieApiId) }),
  })
}