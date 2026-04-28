"use client";
import { useState, useRef, useEffect } from "react";
import ItemSearch from "../features/ItemSearch";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchMovies } from "@/hooks/use-movies";

type SearchbarProps = {
  input: string;
  setInput?: (input: string) => void;
};

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w92";

const Searchbar = ({ input, setInput }: SearchbarProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedInput(input), 350);
    return () => clearTimeout(t);
  }, [input]);

  const { data, isLoading } = useSearchMovies(debouncedInput);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      setIsSelected(false);
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  const showDropdown = isSelected && input.trim().length > 2;
  const results = data?.results.slice(0, 5) ?? [];

  return (
    <div
      ref={containerRef}
      className="relative transition-all duration-300 rounded-full bg-background-800 flex items-center border border-transparent focus-within:border-background-600 w-full"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 opacity-70 ml-4 animate-spin" />
      ) : (
        <Search className="w-4 h-4 opacity-70 ml-4" aria-hidden="true" />
      )}
      <input
        onChange={(e) => setInput?.(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={() => setIsSelected(true)}
        type="text"
        placeholder="Rechercher un film, un genre, un·e artiste…"
        className="px-4 py-1 bg-transparent w-full focus:outline-none text-primary"
        value={input}
      />
      <div
        className={`backdrop-blur-lg w-full flex flex-col gap-2 absolute z-40 bg-background-800/65 ${
          showDropdown ? "visible opacity-100" : "opacity-0 pointer-events-none"
        } top-12 rounded-b-xl px-4 py-6 text-primary transition-opacity duration-300`}
      >
        {results.length > 0
          ? results.map((film) => (
              <ItemSearch
                key={film.id}
                type="film"
                title={film.title}
                filmDirector={film.release_date?.slice(0, 4)}
                filmImageURL={
                  film.poster_path
                    ? `${TMDB_IMAGE_BASE}${film.poster_path}`
                    : ""
                }
              />
            ))
          : !isLoading && (
              <p className="text-sm opacity-50 text-center">Aucun résultat</p>
            )}
      </div>
    </div>
  );
};

export default Searchbar;
