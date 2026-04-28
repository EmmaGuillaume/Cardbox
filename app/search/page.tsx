"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import FilmCard from "@/components/features/FilmCard";
import { useDrawer } from "@/components/context/DrawerContext";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchMovies } from "@/hooks/use-movies";

type MediaType = "all" | "movie" | "tv";

const FILTERS: { label: string; value: MediaType }[] = [
  { label: "Tout", value: "all" },
  { label: "Films", value: "movie" },
  { label: "Séries", value: "tv" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { open } = useDrawer();
  const [filter, setFilter] = useState<MediaType>("all");

  const { data, isLoading } = useSearchMovies(query);

  const results = data?.results ?? [];

  const filtered = results.filter((r) => {
    if (filter === "all") return true;
    return r.media_type === filter;
  });

  return (
    <div
      className={`bg-background min-h-screen flex gap-8 flex-col transition-[padding] duration-300 ease-in-out ${
        open ? "md:px-0 md:pl-12 md:pr-8" : "md:px-32"
      } px-4 text-primary font-krub mb-24`}
    >
      <div className="mt-8">
        <h1 className="text-primary font-merryweather flex gap-2 text-2xl flex-wrap">
          Résultats pour <span className="text-yellow">« {query || "…"} »</span>
        </h1>
        <p className="font-extralight text-sm mt-1">
          {isLoading
            ? "Recherche en cours…"
            : `${filtered.length} résultat${filtered.length !== 1 ? "s" : ""} trouvé${filtered.length !== 1 ? "s" : ""}`}
        </p>
      </div>

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

      {!isLoading && filtered.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-primary font-merryweather text-xl">
            Films <span className="text-red">&</span> Séries
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((result) => (
              <FilmCard key={result.id} movie={result} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && filtered.length === 0 && query && (
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