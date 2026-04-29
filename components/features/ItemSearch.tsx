import Link from "next/link";
import ButtonInterract from "../ui/ButtonInterract";
import { ClockFading } from "lucide-react";

type Props = {
  type: "film" | "human" | "serie";
  id: number;
  title?: string;
  filmDirector?: string;
  filmImageURL?: string;
  humanRole?: string;
  humanName?: string;
  humanImageURL?: string;
  isRecent?: boolean;
  onClick?: () => void;
};

const ItemSearch = ({
  type,
  id,
  title,
  filmDirector,
  humanName,
  filmImageURL,
  humanRole,
  humanImageURL,
  isRecent,
  onClick
}: Props) => {
  if (type === "film" || type === "serie") {
    return (
      <Link href={`/movie/${id}`} onClick={onClick} className="bg-background w-full rounded-md flex flex-wrap justify-center md:justify-between items-center p-2 text-primary cursor-pointer hover:bg-background-800 transition-colors duration-150 group">
        <div className="flex items-center gap-2">
          {isRecent ? (
  <div className="w-10 h-14 flex items-center justify-center">
    <ClockFading className="w-6 h-6 opacity-80" />
  </div>
):""}
          <img
            src={filmImageURL || undefined}
            alt={title}
            className="w-10 rounded-sm group-hover:brightness-110 group-hover:font-bold transition-all duration-150"
          />
          <div>
            <h2 className="md:text-lg font-krub font-light group-hover:text-white transition-colors duration-150">
              {title}
            </h2>
            <div className="flex flex-nowrap gap-2 opacity-80">
              <p>{type === "film" ? "Film" : "Série"}</p>
              <p>•</p>
              <p>{filmDirector}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-2 md:mt-0 mr-4">
          <ButtonInterract
            isAlreadyAdded={false}
            type="list"
            onClick={() => console.log("Marked as seen")}
          />
          <ButtonInterract
            isAlreadyAdded={false}
            type="like"
            onClick={() => console.log("Liked")}
          />
          <ButtonInterract
            isAlreadyAdded={false}
            type="watchlist"
            onClick={() => console.log("Added to watchlist")}
          />
        </div>
      </Link>
    );
  } else if (type === "human") {
    return (
      <div className="bg-background w-full rounded-md flex flex-wrap justify-between items-center p-2 text-primary cursor-pointer hover:bg-background-800 transition-colors duration-150 group">
        <div className="flex items-center gap-2">
          <img
            src={humanImageURL || undefined}
            alt={humanName}
            className="w-10 h-10 object-cover rounded-full group-hover:brightness-110 group-hover:font-bold transition-all duration-150"
          />
          <div>
            <h2 className="md:text-lg font-krub font-light group-hover:text-white transition-colors duration-150">
              {humanName}
            </h2>
            <div className="flex flex-nowrap gap-2 opacity-80">
              <p>{humanRole}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-2 md:mt-0 mr-4">
          <ButtonInterract
            isAlreadyAdded={false}
            type="like"
            onClick={() => console.log("Liked")}
          />
        </div>
      </div>
    );
  }
};

export default ItemSearch;
