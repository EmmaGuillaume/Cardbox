"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Trophy, List, Telescope } from "lucide-react";
import Link from "next/link";
import Searchbar from "../ui/Searchbar";

const items = [
  { label: "Top films", icon: Trophy, link: "/top-films" },
  { label: "Listes", icon: List, link: "/profile/1/listes" },
  { label: "Découvrir", icon: Telescope, link: "/" },
];

export default function NavBarDesktop() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownOpen, setDiscoverOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDiscoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav
        className="hidden lg:grid grid-cols-[1fr_2fr_1fr] items-center h-16 w-full fixed top-0 z-30 bg-background-900/80 backdrop-blur-lg text-primary font-krub px-6 border-b border-background-800"
        aria-label="Navigation principale"
      >
        {/* LEFT */}
        <div className="flex">
          <Link href="/" className="flex items-center gap-2">
            <svg width="65" height="23" viewBox="0 0 65 23" aria-hidden="true">
              <ellipse cx="12.1078" cy="11.5" rx="12.1078" ry="11.5" fill="#FF7285" />
              <ellipse cx="32.4999" cy="11.5" rx="12.1078" ry="11.5" fill="#F6FF72" />
              <ellipse cx="52.892" cy="11.5" rx="12.1078" ry="11.5" fill="#72BDFF" />
            </svg>
            <span className="text-2xl font-extrabold">Cardbooxd</span>
          </Link>
        </div>


        {/* CENTER (Search) */}
     

        <Searchbar input="" />

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-3 text-md">
          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              ref={buttonRef}
              onClick={() => setDiscoverOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              aria-controls="discover-menu"
              className={`flex items-center gap-2.5 bg-background-800 border rounded-md py-1.5 px-3 ${
                dropdownOpen
                  ? "border-background-600"
                  : "border-transparent hover:border-background-600"
              }`}
            >
              Découvrir
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id="discover-menu"
                role="menu"
                className={`absolute right-0 top-[calc(100%+5px)] w-48 bg-background-900 border border-background-600 rounded-md overflow-hidden z-50 transition-all duration-200 origin-top-right ${
                  dropdownOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
              <div className="p-1.5">
                {items.map(({ label, icon: Icon, link }) => (
                <Link
                  key={label}
                  href={link}
                  role="menuitem"
                  tabIndex={dropdownOpen ? 0 : -1}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-primary/70 hover:bg-background-800 hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {label}
                </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Profile */}
          <button
            onClick={() => setProfileOpen((v) => !v)}
            aria-label="Ouvrir le menu du profil"
            aria-expanded={profileOpen}
            className={`flex items-center gap-2.5 bg-background-800 border rounded-full pl-3.5 pr-1.5 py-1.5 transition-colors cursor-pointer ${
              profileOpen
                ? "border-background-600"
                : "border-transparent hover:border-background-600"
            }`}
          >
            <div className="w-4.5 h-3 flex flex-col justify-between" aria-hidden="true">
              <span
                className={`block h-px rounded-full bg-primary/60 transition-all duration-200 origin-center ${
                  profileOpen ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px rounded-full bg-primary/60 transition-all duration-200 ${
                  profileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-px rounded-full bg-primary/60 transition-all duration-200 origin-center ${
                  profileOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </div>

            <div className="w-7 h-7 rounded-full bg-[#F6FF72] flex items-center justify-center text-[11px] font-bold text-black">
              <span className="sr-only">Profil utilisateur</span>
              CT
            </div>
          </button>
        </div>
      </nav>

      <div className="hidden lg:block h-16" />
    </>
  );
}
