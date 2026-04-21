"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Trophy, List, Telescope } from "lucide-react";
import Link from "next/link";
import { link } from "fs";

const items = [
  { label: "About", link: "/about" },
  { label: "API", link: "/about-api" },
  { label: "Contact", link: "/contact" },
  { label: "Help", link: "/help"},
  { label: "Terms", link: "/terms" },
  { label: "Legacy policy", link: "/policy"},
];

export default function Footer() {

  return (
    <>
      <nav
        className="hidden lg:grid grid-cols-[1fr_4fr_4fr_1fr] items-start h-min w-full z-10 bg-background-900/95 backdrop-blur-lg text-primary font-krub px-6 pt-4 pb-4 border-b border-background-800"
        aria-label="Navigation principale"
      >
        {/* LEFT */}
         <div className="flex flex-col col-start-2 col-span-1 p-4 gap-2 h-38 flex-wrap">
            {items.map((item, index) => <Link key={index} href={item.link}><span className="text-sm hover:font-semibold">{item.label}</span></Link>)}
         </div>

        {/* RIGHT */}
        <div className="flex justify-end col-start-3 col-span-1 p-4">
          <Link href="/" className="flex items-center gap-2 ">
            <svg width="65" height="23" viewBox="0 0 65 23" aria-hidden="true">
              <ellipse cx="12.1078" cy="11.5" rx="12.1078" ry="11.5" fill="#FF7285" />
              <ellipse cx="32.4999" cy="11.5" rx="12.1078" ry="11.5" fill="#F6FF72" />
              <ellipse cx="52.892" cy="11.5" rx="12.1078" ry="11.5" fill="#72BDFF" />
            </svg>
            <span className="text-2xl font-extrabold text-right">Cardbooxd</span>
          </Link>
        </div>


      </nav>
    </>
  );
}
