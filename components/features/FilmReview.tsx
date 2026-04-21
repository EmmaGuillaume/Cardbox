import ButtonInterract from "@/components/ui/ButtonInterract";
import Image from "next/image";
import Link from "next/link";
import StarsNotation from "../ui/StarsNotation";
const REVIEW_MAX_LENGTH = 60;
type Props = {
  id: number | string;
  title: string;
  realisateur: string;
  date: string;
  imageURL: string;
  isLiked: boolean;
  isInWatchlist: boolean;
  isSeen: boolean;
  persona: "user" | "friend";
  review?: string;
  rating?: number;
  onLike?: () => void;
  onWatchlist?: () => void;
  onList?: () => void;
};

const FilmReview = ({
  id,
  title,
  realisateur,
  date,
  imageURL,
  isLiked,
  isInWatchlist,
  isSeen,
  persona,
  review,
  rating,
  onLike,
  onWatchlist,
  onList,
}: Props) => {
  console.log("is in Watchlist", isInWatchlist);
  if (persona === "user") {
    return (
      <div className="bg-background-800 rounded-md p-3 flex flex-col gap-1 justify-between text-primary w-44 min-w-44 max-w-44 h-56">
        {" "}
        <article className="flex flex-col justify-between w-full min-w-0 items-start overflow-hidden ">
          {/* Image - hauteur fixe */}
          <div className="w-full h-28 rounded-t-md overflow-hidden">
            <img
              src={imageURL}
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
            type="like"
            small
            isAlreadyAdded={isLiked}
            onClick={() => {
              onLike?.();
            }}
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
              src={imageURL}
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
              small
              type="watchlist"
              isAlreadyAdded={isSeen}
              onClick={() => {
                console.log("Liked");
              }}
            />
            <ButtonInterract
              small
              type="watchlater"
              isAlreadyAdded={isInWatchlist}
              onClick={() => {
                console.log("add to watchlater");
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default FilmReview;
