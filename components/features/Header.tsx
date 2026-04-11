"use client";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const [input, setInput] = useState("");
  return (
    <div className="border-b text-primary border-b-background-800 w-full z-50 flex justify-between items-center gap-2 bg-background px-16 py-4">
      <Link className="w-2/12" href="/">
        <Image src="/logo-cardbox.png" alt="" width={200} height={100} />
      </Link>
      <div className="flex gap-4 items-center w-9/12 justify-end">
        <Searchbar setInput={setInput} input={input} />
        <button className="px-2 py-1 bg-background-800 rounded-sm">
          Discover
        </button>
        <button className="min-w-10 size-10 rounded-full bg-yellow"></button>
      </div>
    </div>
  );
};

export default Header;
