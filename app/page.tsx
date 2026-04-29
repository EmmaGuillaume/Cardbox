"use client";
import { useDrawer } from "@/components/context/DrawerContext";
import FilmCard from "@/components/features/FilmCard";
import FilmReview from "@/components/features/FilmReview";
import ScrollSection from "@/components/features/ScrollSection";
import { usePopularMovies } from "@/hooks/use-movies";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { open } = useDrawer();
  const { data, isLoading } = usePopularMovies();
  const { profile, isAuthenticated } = useAuth();

  return (
    <div
      className={`bg-background min-h-screen flex gap-8 flex-col transition duration-300 ${open ? "md:px-0 md:pl-12 md:pr-8" : "md:px-32"} px-4 text-primary font-krub mb-24 scrollbar-custom transition-[padding] duration-300 ease-in-out`}
    >
      <div className="mt-8">
        <h1 className="text-primary font-merryweather flex gap-2 text-2xl">
          {isAuthenticated && profile?.username ? (
            <>
              Bon retour,{" "}
              <span className="text-yellow">{profile.username}</span> !
            </>
          ) : (
            <>Bienvenue sur Cardbooxd</>
          )}
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
          <FilmCard key={film.id} movie={film} />
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
          <FilmReview key={film.id} movie={film} persona="friend" />
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
          <FilmCard key={film.id} movie={film} />
        ))}
      </ScrollSection>
    </div>
  );
}
