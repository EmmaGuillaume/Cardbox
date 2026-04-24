"use client";
import ReviewPageFilm from "@/components/features/ReviewPageFilm";
import TabDetailsFilm from "@/components/features/TabDetailsFilm";
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
    <div className="mb-12 flex flex-col gap-4 text-primary font-krub px-4 md:px-32 py-16">
      <section className="flex flex-row flex-wrap gap-6 lg:flex-nowrap w-full">
        <div className="w-full flex flex-col items-center justify-center md:hidden  h-24 overflow-hidden">
          <img
              className="w-full h-full object-cover"
              src="https://imgs.search.brave.com/xxAthMZOQK2oBVrb0AeDn2gE7VsSpPUwevJJbHN6Sn0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zZW5zY3JpdGlx/dWUuY29tL21lZGlh/LzAwMDAyMjgzOTgx/NC8zMDAvbGVfc2Vp/Z25ldXJfZGVzX2Fu/bmVhdXhfbGFfY29t/bXVuYXV0ZV9kZV9s/X2FubmVhdS5wbmc"
              alt=""
            />
        </div>
        <section className="flex gap-4 w-full lg:w-2/3 ">
          <div className="hidden  md:flex md:h-full md:w-1/3 overflow-hidden">
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
        <section className=" lg:pt-24 w-full lg:w-1/3 ">
          <div className="flex flex-col justify-between h-full gap-2">
            <div className="flex flex-col  gap-2">
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
              <textarea
                placeholder="Ajouter un commentaire..."
                className="bg-background-800 mb-6 lg:mb-0 px-4 py-0.5 rounded-lg focus:outline-background-400/50 focus:outline-1 "
              />
            </div>
            <div className="hidden lg:flex gap-2 items-center">
              <p>Trier par </p>
              <select
                className="bg-background-800 px-3 py-2 rounded-sm"
                name=""
                id=""
              >
                <option value="pertinence">Pertinence</option>
              </select>
            </div>
          </div>
        </section>
      </section>

      <section className="flex gap-6 flex-row flex-wrap lg:flex-nowrap ">
        <section className="  w-full lg:w-2/3">
          <TabDetailsFilm />
        </section>
        <div className="h-fit w-full lg:w-1/3 flex flex-col gap-4">
          <ReviewPageFilm
            isLiked={false}
            likeReview={() => {}}
            rating={5}
            reviewContent="Bonjour"
            date={new Date()}
            title="Mid"
            userAvatarUrl="https://i.pravatar.cc/80
"
          />
          <ReviewPageFilm
            isLiked={false}
            likeReview={() => {}}
            rating={5}
            reviewContent="Review très intéressant, j'ai adoré les personnages et l'intrigue. Cependant, j'aurais aimé que le rythme soit un peu plus rapide par moments."
            date={new Date()}
            title="uper !!!"
            userAvatarUrl="https://i.pravatar.cc/80
"
          />
          <ReviewPageFilm
            isLiked={false}
            likeReview={() => {}}
            rating={5}
            reviewContent="Review très intéressant, j'ai adoré les personnages et l'intrigue. Cependant, j'aurais aimé que le rythme soit un peu plus rapide par moments."
            date={new Date()}
            title="Mid"
            userAvatarUrl="https://i.pravatar.cc/80
"
          />
        </div>
      </section>
    </div>
  );
};

export default MoviePage;
