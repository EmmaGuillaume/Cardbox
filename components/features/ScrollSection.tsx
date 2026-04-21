"use client";
import FilmCard from "@/components/features/FilmCard";
import FilmReview from "@/components/features/FilmReview";
import { useRef, useState, useCallback } from "react";

type ScrollSectionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

const ScrollSection = ({ title, children }: ScrollSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  return (
    <section className="relative">
      <h2 className="font-krub text-lg font-bold flex gap-2">{title}</h2>
      <div className="relative mt-4">
        <button
          onClick={() => scroll("left")}
          disabled={atStart}
          className="absolute md:visible invisible cursor-pointer -left-8 top-1/2 -translate-y-1/2 z-20 bg-background-800 border border-background-700 text-primary rounded-full w-8 h-8 flex items-center justify-center -translate-x-1/2 transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none"
        >
          ‹
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-nowrap overflow-x-scroll gap-2 pb-2 scrollbar-custom"
        >
          {children}
        </div>

        <button
          onClick={() => scroll("right")}
          disabled={atEnd}
          className="absolute cursor-pointer md:visible invisible -right-8 top-1/2 -translate-y-1/2 z-20 bg-background-800 border border-background-700 text-primary rounded-full w-8 h-8 flex items-center justify-center translate-x-1/2 transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none"
        >
          ›
        </button>
      </div>
    </section>
  );
};
export default ScrollSection;
