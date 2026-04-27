"use client";
import ReviewPageFilm from "@/components/features/ReviewPageFilm";
import TabDetailsFilm from "@/components/features/TabDetailsFilm";
import ButtonInterract from "@/components/ui/ButtonInterract";
import StarsNotation from "@/components/ui/StarsNotation";
import { useGetCredits, useGetProviders, useMovie } from "@/hooks/use-movies";
import { EyeIcon, HeartIcon, ListIcon } from "lucide-react";
import { useParams } from "next/navigation";

const MoviePage = () => {
  const { movieId } = useParams();

  const id = movieId && typeof movieId === "string" ? parseInt(movieId) : 0;

  const { data: film, isLoading, isError } = useMovie(id);
  const { data: providers, isLoading: providersLoading } = useGetProviders(id);
  const { data: credits, isLoading: creditsLoading } = useGetCredits(id);
  console.log("credits", credits);

  const ProviderFR = providers?.results.FR;

  if (film === undefined || isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-12 flex flex-col gap-4 text-primary font-krub px-4 md:px-32 py-16">
      <section className="flex flex-row flex-wrap gap-6 lg:flex-nowrap w-full">
        <div className="w-full flex flex-col items-center justify-center md:hidden  h-24 overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover"
            src={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                : "/placeholder-poster.png"
            }
            alt=""
          />
        </div>
        <section className="flex gap-4 w-full lg:w-2/3 ">
          <div className="hidden  md:flex md:h-full md:w-1/3 overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover"
              src={
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                  : "/placeholder-poster.png"
              }
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-4 flex-row flex-wrap items-center">
              <h1 className="font-bold text-2xl">{film.title}</h1>
              <StarsNotation rating={film.vote_average} readonly />
            </div>
            <div className="flex flex-wrap gap-2">
              {film.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-background-800 px-2 py-1 rounded-sm text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>
            <p className="font-merryweather">
              {film.runtime} min • {film?.release_date.split("-")[0]}
            </p>

            <div className="relative w-full">
              <div className="w-full h-px bg-primary my-4 absolute top-0" />
            </div>

            <div className="flex mt-8 gap-4 flex-wrap">
              <div className="flex gap-2 items-center">
                <EyeIcon className="size-5" />
                {(
                  Math.floor(Math.random() * (13784595 - 145203 + 1)) + 145203
                ).toLocaleString()}
              </div>
              <div className="flex gap-2 items-center">
                <ListIcon className="size-5" />
                {(
                  Math.floor(Math.random() * (13784595 - 145203 + 1)) + 145203
                ).toLocaleString()}
              </div>
              <div className="flex gap-2 items-center">
                <HeartIcon className="size-5 fill-primary" />
                {(
                  Math.floor(Math.random() * (13784595 - 145203 + 1)) + 145203
                ).toLocaleString()}
              </div>
            </div>
            <div className="w-2/3">
              <p className="text-sm">{film.overview}</p>
            </div>
          </div>
        </section>
        <section className=" lg:pt-24 w-full lg:w-1/3 ">
          <div className="flex flex-col justify-between h-full gap-2">
            <div className="flex flex-col  gap-2">
              <div className="flex justify-between mt-12">
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
          <TabDetailsFilm credit={credits!} providers={ProviderFR}/>
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
