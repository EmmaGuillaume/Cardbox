import { tmdbFetch } from "@/lib/tmdb/client";
import type {
  TMDBCreditsResponse,
  TMDBMovie,
  TMDBMovieDetail,
  TMDBResponse,
  TMDBWatchProviderResponse,
} from "@/types/tmdb.types";

export const moviesService = {
  getPopular: (page = 1) =>
    tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/movie", {
      page: String(page),
    }),

  getCreditsById: async (id: number) =>{
    
    const res = await tmdbFetch<TMDBCreditsResponse>(`/movie/${id}/credits`);
    return res;
  },

  getTrending: (timeWindow: "day" | "week" = "week") =>
    tmdbFetch<TMDBResponse<TMDBMovie>>(`/trending/movie/${timeWindow}`),

  getProvidersById: async (id: number) => {
    const res = await tmdbFetch<TMDBWatchProviderResponse>(
      `/movie/${id}/watch/providers`,
    );
    return res;
  },

  getById: (id: number) => tmdbFetch<TMDBMovieDetail>(`/movie/${id}`),

  search: (query: string, page = 1) =>
    tmdbFetch<TMDBResponse<TMDBMovie>>("/search/movie", {
      query,
      page: String(page),
    }),
};
