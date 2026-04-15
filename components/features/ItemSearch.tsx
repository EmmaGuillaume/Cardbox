import ButtonInterract from "../ui/ButtonInterract";

type Props = {
  type: "film" | "human" | "serie";
  title?: string;
  filmDirector?: string;
  filmImageURL?: string;
  humanRole?: string;
  humanName?: string;
  humanImageURL?: string;
};

const ItemSearch = ({
  type,
  title,
  filmDirector,
  humanName,
  filmImageURL,
  humanRole,
  humanImageURL,
}: Props) => {
  if (type === "film" || type === "serie") {
    return (
      <div className="bg-background  w-full rounded-md flex flex-wrap justify-center md:justify-between items-center p-2 text-primary">
        <div className="flex items-center gap-2">
          <img src={filmImageURL} alt={title} className="w-10 rounded-sm" />
          <div>
            <h2 className="md:text-lg font-krub font-light">{title}</h2>
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
      </div>
    );
  } else if (type === "human") {
    return (
      <div className="bg-background w-full rounded-md flex flex-wrap justify-center md:justify-between items-center p-2 text-primary">
        <div className="flex items-center gap-2">
          <img src={humanImageURL} alt={humanName} className="w-10 h-10 object-cover rounded-full" />
          <div>
            <h2 className="md:text-lg font-krub font-light">{humanName}</h2>
            <div className="flex flex-nowrap gap-2 opacity-80">
              <p>{humanRole}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center mt-2 md:mt-0 bg-text primary mr-4">
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
