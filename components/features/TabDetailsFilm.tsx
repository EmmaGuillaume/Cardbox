import { useState } from "react";

const TabDetailsFilm = () => {
  const [isCastCategorySelected, setIsCastCategorySelected] = useState(true);
  return (
    <section className="w-full flex flex-col">
      <section className="flex gap-6">
        <button
          className={`${isCastCategorySelected ? "bg-background-800" : "bg-background-900"} cursor-pointer px-4 py-1 rounded-t-sm`}
          onClick={() => setIsCastCategorySelected(true)}
        >
          Cast
        </button>
        <button
          className={`${isCastCategorySelected ? "bg-background-900" : "bg-background-800"} cursor-pointer px-4 py-1 rounded-t-sm`}
          onClick={() => setIsCastCategorySelected(false)}
        >
          Where to watch
        </button>
      </section>
      <section>{isCastCategorySelected ? <div></div> : <div></div>}</section>
    </section>
  );
};

export default TabDetailsFilm;
