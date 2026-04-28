import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')
  if (!query) return NextResponse.json({ results: [] })

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=fr-FR&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await res.json()
  return NextResponse.json(data)
}