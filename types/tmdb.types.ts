export interface TMDBMovie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  softcore: boolean
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBMovieDetail {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
  } | null
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  softcore: boolean
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TMDBProvider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface TMDBCountryProviders {
  link: string
  flatrate?: TMDBProvider[]
  buy?: TMDBProvider[]
  rent?: TMDBProvider[]
}

export interface TMDBWatchProviderResponse {
  id: number
  results: {
    FR?: TMDBCountryProviders
  }
}


export interface TMDBCastMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}



export interface TMDBCrewMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export interface TMDBCreditsResponse {
  id: number
  cast: TMDBCastMember[]
  crew: TMDBCrewMember[]
}