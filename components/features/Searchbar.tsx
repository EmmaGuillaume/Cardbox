"use client";

import { useState, useRef, useEffect } from "react";
import ItemSearch from "./ItemSearch";

type SearchbarProps = {
  input: string;
  setInput?: (input: string) => void;
};

const Searchbar = ({ input, setInput }: SearchbarProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-300 rounded-full bg-background-800 flex items-center gap-2 ${isSelected ? "w-full" : "w-1/3"}`}
    >
      <input
        onChange={(e) => setInput && setInput(e.target.value)}
        onClick={() => setIsSelected(true)}
        type="text"
        placeholder="Search a film, genre, actor ..."
        className="px-4 py-2 bg-transparent w-full focus:outline-none text-primary"
        value={input}
      />

      <div
        className={`backdrop-blur-xs w-full flex flex-col gap-2 absolute z-40 bg-background-800/65 ${isSelected ? "visible opacity-100" : " opacity-0 "} top-14 rounded-b-md px-4 py-6 text-primary transition-opacity duration-300`}
      >
        <ItemSearch
          type="film"
          title="In the mood for love"
          filmDirector="Wong Kar-wai"
          filmImageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
        />

        <ItemSearch
          type="human"
          humanRole="Réalisateur"
          humanName="Tony Leung"
          humanImageURL="https://media.gq.com/photos/612be4ed73b9651b2559a70e/master/pass/tony-leung-gq-october-2021-07.jpg"
        />

        <ItemSearch
          type="serie"
          title="Breaking Bad"
          filmDirector="Vince Gilligan"
          filmImageURL="https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        />
      </div>
    </div>
  );
};

export default Searchbar;
