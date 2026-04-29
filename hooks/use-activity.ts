import { useQuery } from '@tanstack/react-query'
import { activityService } from '@/services/activity.service'

export const activityKeys = {
  all: ['activity'] as const,
  full: () => [...activityKeys.all, 'full'] as const,
}

export function useUserActivity() {
  return useQuery({
    queryKey: activityKeys.full(),
    queryFn: activityService.getUserActivity,
  })
}