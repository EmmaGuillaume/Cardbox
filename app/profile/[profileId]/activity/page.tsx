"use client";
import AuthGate from "@/components/features/AuthGate";
import FilmCard from "@/components/features/FilmCard";
import ButtonInterract from "@/components/ui/ButtonInterract";
import { useUserActivity } from "@/hooks/use-activity";
import { useMovie } from "@/hooks/use-movies";
import { Loader2, MessageSquare, Star } from "lucide-react";

function ActivityMovieItem({
  movieApiId,
  rating,
  comment,
  createdAt,
  isLiked,
}: {
  movieApiId: string;
  rating?: number;
  comment?: string | null;
  createdAt: string;
  isLiked?: boolean;
}) {
  const { data: movie, isLoading } = useMovie(Number(movieApiId));

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "À l'instant";
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
    if (seconds < 2592000) return `Il y a ${Math.floor(seconds / 86400)} jours`;
    return `Il y a ${Math.floor(seconds / 2592000)} mois`;
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 bg-background-800 rounded-md p-4 animate-pulse">
        <div className="w-16 h-24 bg-background-700 rounded-md shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 bg-background-700 rounded w-1/3" />
          <div className="h-3 bg-background-700 rounded w-1/4" />
          <div className="h-3 bg-background-700 rounded w-full mt-2" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="flex gap-4 bg-background-800 rounded-md p-4">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
            : "/placeholder-poster.png"
        }
        alt={movie.title}
        className="w-16 h-24 object-cover rounded-md shrink-0"
      />
      <div className="flex flex-col gap-1 w-full min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold truncate">{movie.title}</h3>
          <p className="text-primary/40 text-xs shrink-0">
            {timeAgo(createdAt)}
          </p>
        </div>

        {isLiked ? (
          <ButtonInterract
            type="like"
            isAlreadyAdded={true}
            onClick={() => {}}
          />
        ) : (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className="size-3 text-yellow"
                fill={i < (rating ?? 0) ? "currentColor" : "none"}
              />
            ))}
          </div>
        )}

        {!isLiked && comment ? (
          <div className="flex gap-2 mt-1">
            <MessageSquare className="size-3 shrink-0 mt-0.5 text-primary/40" />
            <p className="text-sm text-primary/80 font-light">{comment}</p>
          </div>
        ) : !isLiked ? (
          <p className="text-xs text-primary/30 mt-1 italic">
            Pas de commentaire
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ActivityContent() {
  const { data, isLoading } = useUserActivity();
  const reviews = data?.reviews ?? [];
  const liked = data?.liked ?? [];
  console.log(liked);
  console.log(reviews);

  return (
    <div className="px-4 md:px-32 py-8 text-primary font-krub flex flex-col gap-6">
      <div>
        <h1 className="font-merryweather text-2xl">Mon activité</h1>
        <p className="text-primary/60 text-sm mt-2">
          Tous vos films notés et commentés.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
        </div>
      )}

      {!isLoading && reviews?.length === 0 && (
        <div className="text-primary/50 text-sm bg-background-800 rounded-md p-8 text-center">
          Aucune activité pour l'instant. Notez un film pour commencer !
        </div>
      )}

      {!isLoading && reviews && reviews.length > 0 && (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <ActivityMovieItem
              key={review.id}
              movieApiId={review.movie_api_id}
              rating={review.rating}
              comment={review.comment}
              createdAt={review.created_at ?? new Date().toISOString()}
            />
          ))}
        </div>
      )}

      {!isLoading && liked && liked.length > 0 && (
        <div className="flex flex-col gap-3">
          {liked.map((item) => (
            <ActivityMovieItem
              key={item.id}
              movieApiId={item.movie_api_id}
              isLiked={true}
              createdAt={item.updated_at ?? new Date().toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ActivityPage() {
  return (
    <AuthGate message="Connectez-vous pour voir votre activité.">
      <ActivityContent />
    </AuthGate>
  );
}
