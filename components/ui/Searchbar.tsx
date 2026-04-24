"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import ItemSearch from "../features/ItemSearch";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type SearchbarProps = {
  input: string;
  setInput?: (input: string) => void;
};

type TMDBResult = {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  first_air_date?: string;
  known_for_department?: string;
  // pour les films/séries : directeur (pas dispo en multi-search, optionnel)
};

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w92";

const Searchbar = ({ input, setInput }: SearchbarProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [results, setResults] = useState<TMDBResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch TMDB avec debounce
  const fetchResults = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}&page=1&include_adult=false`
      );
      const data = await res.json();
      // Max 5 résultats, on exclut les types inconnus
      const filtered: TMDBResult[] = (data.results ?? [])
        .filter((r: TMDBResult) =>
          ["movie", "tv", "person"].includes(r.media_type)
        )
        .slice(0, 5);
      setResults(filtered);
    } catch (err) {
      console.error("TMDB fetch error:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput && setInput(value);
    // Debounce 350ms
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(value), 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      setIsSelected(false);
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  // Helpers pour adapter les données TMDB à ItemSearch
  const getItemSearchProps = (result: TMDBResult) => {
    const imageURL = result.poster_path
      ? `${TMDB_IMAGE_BASE}${result.poster_path}`
      : result.profile_path
      ? `${TMDB_IMAGE_BASE}${result.profile_path}`
      : undefined;

    if (result.media_type === "movie") {
      return {
        type: "film" as const,
        title: result.title ?? "",
        filmDirector: result.release_date?.slice(0,4),
        filmImageURL: imageURL ?? "",
      };
    }
    if (result.media_type === "tv") {
      return {
        type: "serie" as const,
        title: result.name ?? "",
        filmDirector: result.first_air_date?.slice(0,4),
        filmImageURL: imageURL ?? "",
      };
    }
    // person
    return {
      type: "human" as const,
      humanName: result.name ?? "",
      humanRole: result.known_for_department ?? "Artiste",
      humanImageURL: imageURL ?? "",
    };
  };

  const showDropdown = isSelected && input.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-300 rounded-full bg-background-800 flex items-center border border-transparent focus-within:border-background-600 w-full`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 opacity-70 ml-4 animate-spin" />
      ) : (
        <Search className="w-4 h-4 opacity-70 ml-4" aria-hidden="true" />
      )}
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={() => setIsSelected(true)}
        type="text"
        placeholder="Rechercher un film, un genre, un·e artiste…"
        className="px-4 py-1 bg-transparent w-full focus:outline-none text-primary"
        value={input}
      />
      <div
        className={`backdrop-blur-lg w-full flex flex-col gap-2 absolute z-40 bg-background-800/65 ${
          showDropdown
            ? "visible opacity-100"
            : "opacity-0 pointer-events-none"
        } top-12 rounded-b-xl px-4 py-6 text-primary transition-opacity duration-300`}
      >
        {results.length > 0 ? (
          results.map((result) => (
            <ItemSearch key={`${result.media_type}-${result.id}`} {...getItemSearchProps(result)} />
          ))
        ) : (
          !isLoading && (
            <p className="text-sm opacity-50 text-center">Aucun résultat</p>
          )
        )}
      </div>
    </div>
  );
};

export default Searchbar;