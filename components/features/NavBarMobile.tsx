"use client";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useDrawer } from "../context/DrawerContext";
import { useAuthModal } from "../context/AuthModalContext";
import { useAuth } from "@/hooks/use-auth";

export default function NavBarMobile() {
  const { open, setOpen } = useDrawer();
  const { openModal } = useAuthModal();
  const { isAuthenticated, profile } = useAuth();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 50;

      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const avatarUrl = profile?.avatar_url || "https://i.pravatar.cc/80";

  return (
    <>
      <nav
        className={`lg:hidden h-16 w-full fixed top-0 z-10 px-4 flex items-center bg-background-900/80 backdrop-blur-lg text-primary font-krub transition-transform duration-300
        ${showNav ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-1.5 rounded-full p-1 border outline-none cursor-pointer
                transition-all duration-150
                ${open
                  ? "border-white/20 bg-white/6 ring-2 ring-white/7 hover:border-white/32 hover:bg-white/9 pr-2.5"
                  : "border-transparent bg-white/4 hover:border-white/18 hover:bg-white/7 hover:ring-2 hover:ring-white/6"
                }`}
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-7 h-7 rounded-full object-cover transition-transform duration-150 hover:scale-105"
              />
              <span className={`flex items-center overflow-hidden transition-all duration-200 ${open ? "w-3 opacity-100" : "w-0 opacity-0 hidden"}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="1" y1="1" x2="11" y2="11" strokeWidth="1.8" strokeLinecap="round"
                    className={`transition-colors duration-150 ${open ? "stroke-white/75" : "stroke-white/55"}`}/>
                  <line x1="11" y1="1" x2="1" y2="11" strokeWidth="1.8" strokeLinecap="round"
                    className={`transition-colors duration-150 ${open ? "stroke-white/75" : "stroke-white/55"}`}/>
                </svg>
              </span>
            </button>
          ) : (
            <button
              onClick={() => openModal("signin")}
              className="flex items-center gap-1.5 bg-primary text-background font-bold rounded-full px-3 py-1.5 text-sm hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </button>
          )}
        </div>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
        >
          <svg width="65" height="23" viewBox="0 0 65 23">
            <ellipse cx="12.1078" cy="11.5" rx="12.1078" ry="11.5" fill="#FF7285" />
            <ellipse cx="32.4999" cy="11.5" rx="12.1078" ry="11.5" fill="#F6FF72" />
            <ellipse cx="52.892" cy="11.5" rx="12.1078" ry="11.5" fill="#72BDFF" />
          </svg>
        </Link>
      </nav>

      <div className="lg:hidden h-16" />
    </>
  );
}
