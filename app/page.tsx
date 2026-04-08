"use client";
import ButtonInterract from "@/components/ui/ButtonInterract";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <ButtonInterract
        onClick={() => setIsClicked(!isClicked)}
        type="like"
        isAlreadyAdded={isClicked}
      />
      <ButtonInterract
        onClick={() => setIsClicked(!isClicked)}
        type="watchlist"
        isAlreadyAdded={isClicked}
      />

      <ButtonInterract
        onClick={() => setIsClicked(!isClicked)}
        type="list"
        isAlreadyAdded={isClicked}
      />
    </div>
  );
}
