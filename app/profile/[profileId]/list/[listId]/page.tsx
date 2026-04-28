"use client";
import AuthGate from "@/components/features/AuthGate";
import FilmCard from "@/components/features/FilmCard";
import { useList, useListMovieIds } from "@/hooks/use-lists";
import { useMovie } from "@/hooks/use-movies";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

/**
 * Petit composant interne : prend un id TMDB et affiche la FilmCard.
 * On le fait par film pour réutiliser le cache react-query existant
 * (chaque détail de film est mis en cache individuellement).
 */
function ListMovieItem({ movieApiId }: { movieApiId: string }) {
  const id = Number(movieApiId);
  const { data: movie, isLoading } = useMovie(id);

  if (isLoading) {
    return (
      <div className="min-w-44 h-72 bg-background-800 rounded-md animate-pulse" />
    );
  }
  if (!movie) return null;

  // FilmCard attend un TMDBMovie ; useMovie renvoie un TMDBMovieDetail —
  // on cast en passant les champs communs nécessaires à la card.
  return (
    <FilmCard
      movie={movie as unknown as Parameters<typeof FilmCard>[0]["movie"]}
      isLiked={false}
      isInWatchlist={false}
      isSeen={false}
    />
  );
}

function ListDetailContent() {
  const params = useParams<{ listId: string }>();
  const listId = params.listId;

  const { data: list, isLoading: listLoading } = useList(listId);
  const { data: movieIds, isLoading: idsLoading } = useListMovieIds(listId);

  if (listLoading || idsLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="px-4 md:px-32 py-8 text-primary/60">
        Liste introuvable.
      </div>
    );
  }

  return (
    <div className="h-full px-4 md:px-32 py-8 text-primary font-krub flex flex-col gap-6">
      <div>
        <h1 className="font-merryweather text-2xl">{list.name}</h1>
        <p className="text-primary/50 text-sm">
          {movieIds?.length ?? 0} film{(movieIds?.length ?? 0) > 1 ? "s" : ""}
        </p>
      </div>

      {!movieIds || movieIds.length === 0 ? (
        <div className="text-primary/50 text-sm bg-background-900 border border-background-800 rounded-md p-8 text-center">
          Cette liste est vide.
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {movieIds.map((id) => (
            <ListMovieItem key={id} movieApiId={id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ListDetailPage() {
  return (
    <AuthGate message="Connectez-vous pour voir cette liste.">
      <ListDetailContent />
    </AuthGate>
  );
}
