import ButtonInterract from "@/components/ui/ButtonInterract";
import Link from "next/link";
import StarsNotation from "../ui/StarsNotation";
import { useLikeMovie, useMovieStatus, useWatchlistMovie, useWatchMovie } from "@/hooks/use-movie-status";
import type { TMDBMovie } from "@/types/tmdb.types";

const REVIEW_MAX_LENGTH = 60;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

// Notation aléatoire stable par film
const getFakeRating = (id: number) => ((id % 5) + 1);

type Props = {
  movie: TMDBMovie;
  persona: "user" | "friend";
  review?: string;
  rating?: number;
};

const FilmReview = ({ movie, persona, review, rating }: Props) => {
  const movieApiId = String(movie.id);
  const { data: status } = useMovieStatus(movieApiId);
  const { mutate: like } = useLikeMovie(movieApiId);
  const { mutate: watch } = useWatchMovie(movieApiId);
  const { mutate: watchlist } = useWatchlistMovie(movieApiId);

  const imageURL = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null;
  const displayRating = rating ?? getFakeRating(movie.id);

  const sharedCard = (children: React.ReactNode) => (
    <div className="bg-background-800 rounded-md p-3 flex flex-col gap-1 justify-between text-primary w-44 min-w-44 max-w-44 h-56">
      <article className="flex flex-col justify-between w-full min-w-0 items-start overflow-hidden">
        <div className="w-full h-28 rounded-t-md overflow-hidden">
          {imageURL ? (
            <img src={imageURL} alt={movie.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-background-700" />
          )}
        </div>
        <div className="flex w-full items-start justify-between mt-2 h-10">
          <div className="flex flex-col w-9/12">
            <Link href={`/movie/${movie.id}`}>
              <h3 className="font-krub font-bold text-md truncate w-full cursor-pointer">
                {movie.title}
              </h3>
            </Link>
            <p className="text-xs text-background-400">Il y a 2 jours</p>
          </div>
          <img src="https://i.pravatar.cc/80" alt="" className="size-6 rounded-full object-cover" />
        </div>
        {review && (
          <div className="h-10 overflow-hidden cursor-default">
            <p className="text-primary font-light text-sm leading-tight">
              {review.substring(0, REVIEW_MAX_LENGTH)}
              {review.length > REVIEW_MAX_LENGTH && "..."}
            </p>
          </div>
        )}
      </article>
      {children}
    </div>
  );

  if (persona === "user") {
    return sharedCard(
      <div className="flex justify-between w-full">
        <StarsNotation rating={displayRating} readonly />
        <ButtonInterract
          isAlreadyAdded={status?.liked ?? false}
          type="like"
          onClick={() => like(!status?.liked)}
        />
      </div>
    );
  }

  if (persona === "friend") {
    return sharedCard(
      <div className="flex justify-between w-full">
        <StarsNotation rating={displayRating} readonly />
        <div className="flex gap-1 items-center">
          <ButtonInterract
            type="watchlist"
            isAlreadyAdded={status?.watched ?? false}
            onClick={() => watch(!status?.watched)}
          />
          <ButtonInterract
            type="watchlater"
            isAlreadyAdded={status?.in_watchlist ?? false}
            onClick={() => watchlist(!status?.in_watchlist)}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default FilmReview;