const TMDB_BASE_URL = 'https://api.themoviedb.org/3/'

export const tmdbFetch = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.set('language', 'fr-FR')
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // cache Next.js 1h
  })

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}