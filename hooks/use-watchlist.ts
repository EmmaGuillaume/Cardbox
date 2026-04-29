import { useQuery } from '@tanstack/react-query'
import { watchlistService } from '@/services/watchlist.service'

export const watchlistKeys = {
  all: ['watchlist'] as const,
  list: () => [...watchlistKeys.all, 'list'] as const,
}

export function useWatchlist() {
  return useQuery({
    queryKey: watchlistKeys.list(),
    queryFn: watchlistService.getWatchlist,
  })
}