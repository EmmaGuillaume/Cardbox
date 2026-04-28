"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import FilmCard from "@/components/features/FilmCard";
import { useDrawer } from "@/components/context/DrawerContext";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { TMDBMovie } from "@/types/tmdb.types";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

type MediaType = "all" | "movie" | "tv" | "person";

type PersonResult = {
  id: number;
  name: string;
  profile_path?: string;
  known_for_department?: string;
};

const FILTERS: { label: string; value: MediaType }[] = [
  { label: "Tout", value: "all" },
  { label: "Films", value: "movie" },
  { label: "Séries", value: "tv" },
  { label: "Personnes", value: "person" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { open } = useDrawer();

  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [people, setPeople] = useState<PersonResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<MediaType>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = useCallback(async (q: string, p: number) => {
    if (!q.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(q)}&page=${p}&include_adult=false`,
      );
      const data = await res.json();
      const all: TMDBMovie[] = data.results ?? [];
      // setResults(all.filter((r) => r.media_type !== "person"));
      // setPeople(
      //   all
      //     .filter((r) => r.media_type === "person")
      //     .map((r) => ({
      //       id: r.id,
      //       name: r.name ?? "",
      //       profile_path: r.profile_path,
      //       known_for_department: undefined,
      //     })),
      // );
      setTotalPages(Math.min(data.total_pages ?? 1, 20));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    fetchResults(query, 1);
  }, [query, fetchResults]);

  useEffect(() => {
    fetchResults(query, page);
  }, [page]);

  const filtered = results.filter((r) =>
    filter === "all" ? true : r.original_title === filter,
  );

  const getYear = (r: TMDBMovie) => {
    const d = r.release_date
    return d ? d.slice(0, 4) : "—";
  };

  return (
    <div
      className={`bg-background min-h-screen flex gap-8 flex-col transition-[padding] duration-300 ease-in-out ${
        open ? "md:px-0 md:pl-12 md:pr-8" : "md:px-32"
      } px-4 text-primary font-krub mb-24`}
    >
      {/* Header */}
      <div className="mt-8">
        <h1 className="text-primary font-merryweather flex gap-2 text-2xl flex-wrap">
          Résultats pour <span className="text-yellow">« {query || "…"} »</span>
        </h1>
        <p className="font-extralight text-sm mt-1">
          {isLoading
            ? "Recherche en cours…"
            : `${filtered.length + people.length} résultat${filtered.length + people.length !== 1 ? "s" : ""} trouvé${filtered.length + people.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap -mt-4">
        <SlidersHorizontal className="w-4 h-4 opacity-40 mr-1" />
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-krub border transition-all duration-150 ${
              filter === f.value
                ? "bg-primary text-background-900 border-primary font-bold"
                : "border-background-700 text-primary/60 hover:border-background-500 hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-background-800 rounded-md h-44 w-full mb-2" />
              <div className="bg-background-800 rounded h-3 w-3/4 mb-1" />
              <div className="bg-background-800 rounded h-3 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Gens */}
      {!isLoading &&
        people.length > 0 &&
        (filter === "all" || filter === "person") && (
          <div className="flex flex-col gap-4">
            <h2 className="text-primary font-merryweather text-xl">
              <span className="text-blue">Personnes</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {people.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 bg-background-800 rounded-full px-3 py-2 cursor-pointer hover:bg-background-700 transition-colors group"
                >
                  <img
                    src={
                      p.profile_path
                        ? `https://image.tmdb.org/t/p/w92${p.profile_path}`
                        : "https://i.pravatar.cc/80"
                    }
                    alt={p.name}
                    className="w-8 h-8 rounded-full object-cover group-hover:brightness-110 transition-all"
                  />
                  <span className="text-sm font-krub">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Films & Séries */}
      {!isLoading && filtered.length > 0 && filter !== "person" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-primary font-merryweather text-xl">
            {filter === "tv" ? (
              <>
                <span className="text-red">Séries</span> trouvées
              </>
            ) : filter === "movie" ? (
              <>
                <span className="text-red">Films</span> trouvés
              </>
            ) : (
              <>
                Films <span className="text-red">&</span> Séries
              </>
            )}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((result, id) => (
              <FilmCard movie={result} />
            ))}
          </div>
        </div>
      )}

      {/* Page vide */}
      {!isLoading && filtered.length === 0 && people.length === 0 && query && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 opacity-40">
          <X className="w-10 h-10" />
          <p className="font-merryweather text-lg">
            Aucun résultat pour « {query} »
          </p>
          <p className="font-extralight text-sm">
            Essaie un autre titre ou nom d'artiste
          </p>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && filter !== "person" && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2 rounded-full border border-background-700 text-sm font-krub disabled:opacity-30 hover:border-background-500 transition-colors"
          >
            ← Précédent
          </button>
          <span className="text-sm opacity-50 font-krub">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-5 py-2 rounded-full border border-background-700 text-sm font-krub disabled:opacity-30 hover:border-background-500 transition-colors"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SearchContent />
    </Suspense>
  );
}
