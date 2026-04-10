"use client";
import FilmCard from "@/components/features/FilmCard";
import ItemSearch from "@/components/features/ItemSearch";
import ButtonInterract from "@/components/ui/ButtonInterract";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <FilmCard
        title="In the mood for love"
        realisateur="Wong Kar-wai"
        date="2000"
        imageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
        isLiked={true}
        isInWatchlist={true}
        isSeen={true}
      ></FilmCard>

      <div className="flex flex-col w-1/2 bg-background-800/85 gap-2 p-2 rounded-md">
        <ItemSearch
          type="film"
          title="In the mood for love"
          filmDirector="Wong Kar-wai"
          filmImageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
        />

        <ItemSearch
          type="human"
          humanRole="Actor"
          humanName="Tony Leung"
          humanImageURL="https://media.gq.com/photos/612be4ed73b9651b2559a70e/master/pass/tony-leung-gq-october-2021-07.jpg"
        />
      </div>
    </div>
  );
}
