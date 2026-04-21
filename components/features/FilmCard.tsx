import ButtonInterract from "@/components/ui/ButtonInterract";
import Image from "next/image";

type Props = {
  title: string;
  realisateur: string;
  date: string;
  imageURL: string;
  isLiked: boolean;
  isInWatchlist: boolean;
  isSeen: boolean;
};

const FilmCard = ({
  title,
  realisateur,
  date,
  imageURL,
  isLiked,
  isInWatchlist,
  isSeen,
}: Props) => {
  return (
    <div className="bg-background-800 rounded-md p-3 flex flex-col gap-1 items-center text-primary  min-w-44 max-w-44 group ">
      <div className=" w-full h-44 rounded-md overflow-hidden flex flex-col gap-4 relative">
        <img src={imageURL} alt={title} className="w-full" /> 
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

      <article className="flex flex-col w-full min-w-0 items-start overflow-hidden cursor-pointer">
        <h3 className="font-krub font-bold text-md whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
          {title}
        </h3>
        <div className="flex flex-wrap flex-row justify-between gap-2 text-sm w-full">
          <p>{realisateur}</p>
          <p>{date}</p>
        </div>
      </article>

    </div>
  );
};

export default FilmCard;
