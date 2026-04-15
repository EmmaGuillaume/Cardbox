import ButtonInterract from "@/components/ui/ButtonInterract";
import Image from "next/image";
import Link from "next/link";
import StarsNotation from "../ui/StarsNotation";
const REVIEW_MAX_LENGTH = 60;
type Props = {
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
      <div className="bg-background-800 h-54 rounded-md p-3 flex flex-col gap-1 justify-between text-primary  max-w-44  ">
        <article className="flex flex-col justify-between w-full min-w-0 items-start overflow-hidden cursor-pointer">
          <div
            className={`w-full ${review ? "h-16" : "h-32"} rounded-t-md overflow-hidden flex flex-col gap-4 relative`}
          >
            <img src={imageURL} alt={title} className="w-full" />
          </div>
          <div className="flex w-full items-top justify-between mt-2">
            <div className="flex flex-col w-9/12">
              <Link href={`/films/${title.replace(/\s+/g, "-")}`}>
                <h3 className="font-krub font-bold text-md whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
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
          {review && (
            <p className="text-primary font-light text-sm">
              {review?.substring(0, REVIEW_MAX_LENGTH)}
              {review && review.length > REVIEW_MAX_LENGTH && "..."}
            </p>
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
      <div className="bg-background-800 h-54 rounded-md p-3 flex flex-col gap-1 justify-between text-primary  max-w-44  ">
        <article className="flex flex-col justify-between  w-full min-w-0 items-start overflow-hidden cursor-pointer">
          <div
            className={`w-full ${review ? "h-16" : "h-32"} rounded-t-md overflow-hidden flex flex-col gap-4 relative`}
          >
            <img src={imageURL} alt={title} className="w-full" />
          </div>
          <div className="flex w-full items-top justify-between mt-2">
            <div className="flex flex-col w-9/12">
              <Link href={`/films/${title.replace(/\s+/g, "-")}`}>
                <h3 className="font-krub font-bold text-md whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
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
          {review && (
            <p className="text-primary font-light text-sm">
              {review?.substring(0, REVIEW_MAX_LENGTH)}
              {review && review.length > REVIEW_MAX_LENGTH && "..."}
            </p>
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
