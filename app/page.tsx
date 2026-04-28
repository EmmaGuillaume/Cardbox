"use client";
import { useDrawer } from "@/components/context/DrawerContext";
import FilmCard from "@/components/features/FilmCard";
import FilmReview from "@/components/features/FilmReview";
import ScrollSection from "@/components/features/ScrollSection";

import { useRef, useState } from "react";
import List from "@/components/ui/List";
import { usePopularMovies, useTrendingMovies } from "@/hooks/use-movies";

export default function Home() {
  const [username] = useState("Clémeninou");
  const { open } = useDrawer();

  const { data, isLoading, isError } = usePopularMovies();

  const listFilms = [
    { title: "Titanic", src: "/titanic.png" },
    { title: "Kill Bill", src: "/killbill.png" },
    { title: "Dirty Dancing", src: "/dirtydancing.png" },
    { title: "The Creator", src: "/thecreator.png" },
  ];

  return (
    <div
      className={`bg-background min-h-screen flex gap-8 flex-col transition duration-300 ${open ? "md:px-0 md:pl-12 md:pr-8" : "md:px-32"} px-4 text-primary font-krub mb-24 scrollbar-custom transition-[padding] duration-300 ease-in-out`}
    >
      <div className="mt-8">
        <h1 className="text-primary font-merryweather flex gap-2 text-2xl">
          Bon retour, <p className="text-yellow">{username}</p> !
        </h1>
        <p className="font-extralight text-sm">
          Voici l'activité pendant votre absence… <br />
          Cette page d'accueil s'adaptera à vos goûts!
        </p>
      </div>

      <ScrollSection
        title={
          <>
            Films <span className="text-red">you</span> may like
          </>
        }
      >
        {data?.results.map((film) => (
          <FilmCard
            key={film.id}
            movie={film}
            
            
            
          />
        ))}
      </ScrollSection>

      <ScrollSection
        title={
          <>
            <span className="text-yellow">Friends</span> activities
          </>
        }
      >
        {data?.results.map((film) => (
          <FilmReview
            date={""}
            imageURL={film.poster_path || ""}
            key={film.id}
            persona="friend"
            {...film}
          
          />
        ))}
      </ScrollSection>

      <ScrollSection
        title={
          <>
            Latest <span className="text-blue">releases</span>
          </>
        }
      >
        {data?.results.map((film) => (
          <FilmCard
            key={film.id}
            movie={film}
            
          />
        ))}
      </ScrollSection>
    </div>
  );
}
