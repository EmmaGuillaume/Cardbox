"use client";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function NavBarMobile() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 50;

      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`lg:hidden h-16 w-full fixed top-0 z-10 px-4 flex items-center bg-background-900/80 backdrop-blur-lg text-primary font-krub transition-transform duration-300
        ${showNav ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#F6FF72] flex items-center justify-center text-[11px] font-bold text-black">
              CT
            </div>
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