import ButtonInterract from "@/components/ui/ButtonInterract";
import Image from "next/image";
import Link from "next/link";
import StarsNotation from "../ui/StarsNotation";
import {
  useLikeMovie,
  useMovieStatus,
  useWatchlistMovie,
  useWatchMovie,
} from "@/hooks/use-movie-status";
const REVIEW_MAX_LENGTH = 60;

type Props = {
  id: number | string;
  title: string;
  date: string;
  imageURL: string | null;
  persona: "user" | "friend";
  review?: string;
  rating?: number;
};
const FilmReview = ({
  id,
  title,
  date,
  imageURL,
  persona,
  review,
  rating,
}: Props) => {
  const movieApiId = String(id);
  const { data: status } = useMovieStatus(movieApiId);
  const { mutate: like } = useLikeMovie(movieApiId);
  const { mutate: watch } = useWatchMovie(movieApiId);
  const { mutate: watchlist } = useWatchlistMovie(movieApiId);
  if (persona === "user") {
    return (
      <div className="bg-background-800 rounded-md p-3 flex flex-col gap-1 justify-between text-primary w-44 min-w-44 max-w-44 h-56">
        {" "}
        <article className="flex flex-col justify-between w-full min-w-0 items-start overflow-hidden ">
          {/* Image - hauteur fixe */}
          <div className="w-full h-28 rounded-t-md overflow-hidden">
            <img
              src={imageURL ? imageURL : ""}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Meta - hauteur fixe pour éviter le décalage */}
          <div className="flex w-full items-start justify-between mt-2 h-10">
            <div className="flex flex-col w-9/12">
              <Link className="" href={`/movie/${id}`}>
                <h3 className="font-krub font-bold text-md truncate w-full cursor-pointer">
                  {title}
                </h3>
              </Link>

              <p className="text-xs text-background-400">Il y a 2 jours</p>
            </div>
            <div>
              <img
                src="https://i.pravatar.cc/80"
                alt=""
                className="size-6 bg-red rounded-full"
              />
            </div>
          </div>

          {/* Review - hauteur fixe si présente */}
          {review && (
            <div className="h-10 overflow-hidden cursor-default">
              <p className="text-primary font-light text-sm leading-tight">
                {review?.substring(0, REVIEW_MAX_LENGTH)}
                {review && review.length > REVIEW_MAX_LENGTH && "..."}
              </p>
            </div>
          )}
        </article>
        <div className="flex justify-between w-full">
          <StarsNotation rating={rating ? rating : 0} />
          <ButtonInterract
            isAlreadyAdded={status?.liked ?? false}
            type="like"
            onClick={() => like(!status?.liked)}
          />
        </div>
      </div>
    );
  }

  if (persona === "friend") {
    return (
      <div className="bg-background-800 rounded-md p-3 flex flex-col gap-1 justify-between text-primary w-44 min-w-44 max-w-44 h-56">
        <article className="flex flex-col justify-between  w-full min-w-0 items-start overflow-hidden cursor-default">
          <div className="w-full h-28 rounded-t-md overflow-hidden">
            <img
              src={imageURL ? imageURL : "/placeholder-poster.png"}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Meta - hauteur fixe pour éviter le décalage */}
          <div className="flex w-full items-start justify-between mt-2 h-10">
            <div className="flex flex-col w-9/12">
              <Link className="" href={`/movie/${id}`}>
                <h3 className="font-krub font-bold text-md truncate w-full cursor-pointer">
                  {title}
                </h3>
              </Link>

              <p className="text-xs text-background-400">Il y a 2 jours</p>
            </div>

            <div>
              <img
                src="https://i.pravatar.cc/80"
                alt=""
                className="size-6 bg-red rounded-full"
              />
            </div>
          </div>

          {/* Review - hauteur fixe si présente */}
          {review && (
            <div className="h-10 overflow-hidden">
              <p className="text-primary font-light text-sm leading-tight cursor-default">
                {review?.substring(0, REVIEW_MAX_LENGTH)}
                {review && review.length > REVIEW_MAX_LENGTH && "..."}
              </p>
            </div>
          )}
        </article>
        <div className="flex justify-between w-full">
          <StarsNotation rating={rating ? rating : 0} readonly />
          <div className="flex gap-1 items-center">
            <ButtonInterract
              type="watchlist"
              onClick={() => {
                watch(!(status?.watched ?? false));
              }}
              isAlreadyAdded={status?.watched ?? false}
            />
            <ButtonInterract
              type="watchlater"
              isAlreadyAdded={status?.in_watchlist ?? false}
              onClick={() => watchlist(!status?.in_watchlist)}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default FilmReview;
