"use client";
import FilmCard from "@/components/features/FilmCard";
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
    </div>
  );
}
