"use client";
import ButtonInterract from "@/components/ui/ButtonInterract";
import StarsNotation from "@/components/ui/StarsNotation";
import { EyeIcon, HeartIcon, ListIcon } from "lucide-react";
import { resume } from "react-dom/server";

const MoviePage = () => {
  const film = {
    title: "Le Seigneur des Anneaux : La Communauté de l'Anneau",
    type: "Film",
    date: "2001",
    director: "Peter Jackson",
    globalRating: 4.5,
    duration: "2h58",
    watchingNumber: 452789,
    listNumber: 1200000,
    likeNumber: 900000,
    resume:
      "Dans un monde fantastique, un jeune hobbit nommé Frodon Sacquet hérite d'un anneau maléfique qui doit être détruit pour sauver la Terre du Milieu. Accompagné d'une communauté de héros, il entreprend un périlleux voyage pour détruire l'anneau et vaincre les forces du mal.",
  };

  const numberToK = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };
  return (
    <div className="flex flex-col gap-4 text-primary font-krub px-4 md:px-32 py-16">
      <section className="flex flex-row flex-wrap gap-6 lg:flex-nowrap w-full">
        <section className="flex gap-4 w-full md:w-2/3 ">
          <div className="invisible w-0 md:visible md:h-full md:w-1/3 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://imgs.search.brave.com/xxAthMZOQK2oBVrb0AeDn2gE7VsSpPUwevJJbHN6Sn0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zZW5zY3JpdGlx/dWUuY29tL21lZGlh/LzAwMDAyMjgzOTgx/NC8zMDAvbGVfc2Vp/Z25ldXJfZGVzX2Fu/bmVhdXhfbGFfY29t/bXVuYXV0ZV9kZV9s/X2FubmVhdS5wbmc"
                alt=""
              />
            
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h1 className="font-bold text-2xl">{film.title}</h1>
            <p className="font-merryweather">
              {film.type} • {film.date} • {film.duration}
            </p>
            <StarsNotation rating={film.globalRating} readonly />
            <div className="relative w-full">
              <div className="w-full h-px bg-primary my-4 absolute top-0" />
            </div>

            <div className="flex mt-8 gap-4 flex-wrap">
              <div className="flex gap-2 items-center">
                <EyeIcon className="size-5" />
                {numberToK(film.watchingNumber)}
              </div>
              <div className="flex gap-2 items-center">
                <ListIcon className="size-5" />
                {numberToK(film.listNumber)}
              </div>
              <div className="flex gap-2 items-center">
                <HeartIcon className="size-5 fill-primary" />
                {numberToK(film.likeNumber)}
              </div>
            </div>
            <div className="w-2/3">
              <p className="text-sm">{film.resume}</p>
            </div>
          </div>
        </section>
        <section className=" pt-24 w-1/3 ">
          <div className="flex justify-between mt-10">
            <StarsNotation rating={0} readonly={false} big={true} />
            <div className="flex gap-1">
              <ButtonInterract
                type="like"
                onClick={() => {}}
                isAlreadyAdded={false}
              />
              <ButtonInterract
                type="watchlist"
                onClick={() => {}}
                isAlreadyAdded={false}
              />
              <ButtonInterract
                type="watchlater"
                onClick={() => {}}
                isAlreadyAdded={false}
              />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default MoviePage;
