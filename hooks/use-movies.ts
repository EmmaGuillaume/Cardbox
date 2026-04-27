import { useQuery } from "@tanstack/react-query";
import { moviesService } from "@/services/movies.service";

export const movieKeys = {
  all: ["movies"] as const,
  popular: (page: number) => [...movieKeys.all, "popular", page] as const,
  trending: (tw: string) => [...movieKeys.all, "trending", tw] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
  search: (query: string) => [...movieKeys.all, "search", query] as const,
  providers: (id: number) => [...movieKeys.all, "providers", id] as const,
  credits: (id: number) => [...movieKeys.all, "credits", id] as const, // ← ici
};

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => moviesService.getPopular(page),
  });
}

export function useTrendingMovies(timeWindow: "day" | "week" = "week") {
  return useQuery({
    queryKey: movieKeys.trending(timeWindow),
    queryFn: () => moviesService.getTrending(timeWindow),
  });
}

export function useMovie(id: number) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => moviesService.getById(id),
    enabled: !!id,
  });
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => moviesService.search(query),
    enabled: query.length > 2, // ne lance pas la recherche pour moins de 3 chars
  });
}

export function useGetCredits(id: number) {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => moviesService.getCreditsById(id),
    enabled: !!id,
    select: (data) => ({
      ...data,
      cast: data.cast.slice(0, 30),
    }),
  })
};


export function useGetProviders(id: number) {
  return useQuery({
    queryKey: movieKeys.providers(id),
    queryFn: () => moviesService.getProvidersById(id),
    enabled: !!id && id !== 0, // ← vérifie que t'as bien ça
  });
}
