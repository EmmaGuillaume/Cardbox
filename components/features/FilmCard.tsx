import ButtonInterract from "@/components/ui/ButtonInterract";
import { useGetCredits, usePopularMovies } from "@/hooks/use-movies";
import type { TMDBMovie } from "@/types/tmdb.types";
import Link from "next/link";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type Props = {
  movie: TMDBMovie;
  isLiked: boolean;
  isInWatchlist: boolean;
  isSeen: boolean;
};

const FilmCard = ({ movie, isLiked, isInWatchlist, isSeen }: Props) => {
  const imageURL = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : "/placeholder-poster.png";

  const { data : credits, isLoading, isError } = useGetCredits(movie.id);

  const year = movie.release_date?.split("-")[0] ?? "";

  return (
    <div className="bg-background-800 rounded-md p-3 flex flex-col gap-1 items-center text-primary min-w-44 max-w-44 group">
      <div className="w-full h-44 rounded-md overflow-hidden flex flex-col gap-4 relative">
        <img src={imageURL} alt={movie.title} className="w-full" />
        <div className="invisible group-hover:visible bg-background/70 w-full h-full z-20 absolute top-0 left-0 cursor-default flex flex-col justify-center items-center gap-2">
          <ButtonInterract
            isAlreadyAdded={isSeen}
            type="list"
            onClick={() => console.log("Marked as seen")}
          />
          <ButtonInterract
            isAlreadyAdded={isLiked}
            type="like"
            onClick={() => console.log("Liked")}
          />
          <ButtonInterract
            isAlreadyAdded={isInWatchlist}
            type="watchlist"
            onClick={() => console.log("Added to watchlist")}
          />
        </div>
      </div>

      <Link href={`/movie/${movie.id}`} className="flex flex-col w-full min-w-0 items-start overflow-hidden cursor-pointer">
        <h3 className="font-krub font-bold text-md whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
          {movie.title}
        </h3>
        <div className="flex flex-row justify-between gap-2 text-sm w-full flex-nowrap">
          <p className="text-ellipsis truncate">{credits?.crew.find((c) => c.job === "Director")?.name}</p>
          <p>{year}</p>
        </div>
      </Link>
    </div>
  );
};

export default FilmCard;
