"use client";
import AuthGate from "@/components/features/AuthGate";
import FilmCard from "@/components/features/FilmCard";
import { useWatchlist } from "@/hooks/use-watchlist";
import { useMovie } from "@/hooks/use-movies";
import { Loader2 } from "lucide-react";

function WatchlistMovieItem({ movieApiId }: { movieApiId: string }) {
  const { data: movie, isLoading } = useMovie(Number(movieApiId))

  if (isLoading) {
    return <div className="min-w-44 h-72 bg-background-800 rounded-md animate-pulse" />
  }
  if (!movie) return null

  return <FilmCard movie={movie} />
}

function WatchlistContent() {
  const { data: watchlist, isLoading } = useWatchlist()

  return (
    <div className="px-4 md:px-32 py-8 text-primary font-krub flex flex-col gap-6 min-h-screen">
      <div>
        <h1 className="font-merryweather text-2xl">Watchlist</h1>
        <p className="text-primary/60 text-sm mt-2">
          Les films que vous avez prévu de regarder.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
        </div>
      )}

      {!isLoading && watchlist?.length === 0 && (
        <div className="text-primary/50 text-sm bg-background-800 rounded-md p-8 text-center">
          Votre watchlist est vide. Ajoutez des films depuis leur page !
        </div>
      )}

      {!isLoading && watchlist && watchlist.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {watchlist.map((item) => (
            <WatchlistMovieItem key={item.id} movieApiId={item.movie_api_id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function WatchlistPage() {
  return (
    <AuthGate message="Connectez-vous pour accéder à votre watchlist.">
      <WatchlistContent />
    </AuthGate>
  );
}