import { useQuery } from '@tanstack/react-query'
import { activityService } from '@/services/activity.service'

export const activityKeys = {
  all: ['activity'] as const,
  reviews: () => [...activityKeys.all, 'reviews'] as const,
}

export function useUserActivity() {
  return useQuery({
    queryKey: activityKeys.reviews(),
    queryFn: activityService.getUserReviews,
  })
}